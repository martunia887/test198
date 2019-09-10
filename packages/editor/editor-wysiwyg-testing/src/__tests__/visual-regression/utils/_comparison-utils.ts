import { toMatchSnapshot } from 'jest-snapshot';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import * as path from 'path';
import { ensureDirSync, emptyDirSync } from 'fs-extra';
import * as fs from 'fs';
import {
  editorContentSelector,
  rendererContentSelector,
} from './_example-utils';
import { dispatchAnalyticsEvent } from './_analytics-utils';
import { AsyncAwaitFunction } from '../_data';

interface ConsistencyReport {
  consistency: string;
  divergence: number;
}

function createCompositeImage(
  editorImage: any,
  rendererImage: any,
  diffImage: any,
) {
  // create a new image containing the images for editor, renderer, and their diff.
  const { width, height } = editorImage;
  const compositeImage = new PNG({
    width: width * 3 + 2,
    height: editorImage.height,
  });

  [editorImage, rendererImage, diffImage].forEach((image, i) => {
    PNG.bitblt(image, compositeImage, 0, 0, width, height, width * i + i, 0);
  });
  return compositeImage;
}

function clampPercentage(value: number): number {
  return parseFloat(((Math.round(value * 10000) / 10000) * 100).toFixed(2));
}

/**
 * Custom Jest matcher for WYSIWYG comparisons
 */
expect.extend({
  toMatchWYSIWYGSnapshot(
    received: ConsistencyReport,
    testName: string,
    onImprovement: (percent: number) => void,
    onRegression: (percent: number) => void,
  ) {
    // @ts-ignore
    const snapshotData = this.snapshotState._snapshotData;
    const customCurrentTestName = `WYSIWYG Comparison: ${testName}`;
    // Check previous results (if they exist)
    const data: string = snapshotData[`${customCurrentTestName} 1`];
    if (data) {
      // Parse the data object by trimming the 'Object ' prefix, and the trailing comma off the last property.
      const trimmed = data
        .substr(7)
        .trim()
        .replace(/,\s*}$/, '}');
      const baseline = JSON.parse(trimmed);

      if (baseline && baseline.divergence) {
        // Measure difference
        const diff = baseline.divergence - received.divergence;
        const regressed = diff < 0;
        const percent = clampPercentage(regressed ? diff * -1 : diff);

        if (percent) {
          // eslint-disable-next-line no-console
          console.warn(
            `${testName} ${regressed ? 'regressed' : 'improved'} ${percent}%`,
          );
        }

        // Consistency improved
        if (received.divergence < baseline.divergence) {
          onImprovement(percent);
        }
        // Consistency worsensed
        if (received.divergence > baseline.divergence) {
          onRegression(percent);
        }
      }
    } else {
      // This is the first time this test scenario has run.
      dispatchAnalyticsEvent(
        testName,
        1 - received.divergence,
        `${received.consistency}%`,
        'N/A',
      );
    }

    // Rename test using alternate 'this' for brevity and simplicity
    return toMatchSnapshot.call(
      { ...this, currentTestName: customCurrentTestName } as any,
      received,
    );
  },
});

/**
 * Compare snapshots of the editor & renderer to validate the WYSIWYG result.
 *
 * For use with tests which render both the editor and renderer instance on a page.
 *
 * Unlike regular VR tests we don't store visual snapshots (these are covered by the VR tests
 * inside `@atlaskit/editor-core` and `@atlaskit/renderer`), instead we store the percentage
 * values in a snapshot file to measure and track the visual consistency (or divergence) between
 * the rendered results of the editor & renderer.
 *
 * Similar to regular VR testing, if changes result in widening the gap, an image based
 * snapshot file is output (git ignored) to show the difference.
 *
 * If the changes result in improved visual consistency then the updated percentage(s)
 * are written to the JSON file to be used as the new baseline.
 *
 * Tests will fail if the visual divergence widens.
 */
export async function snapshotAndCompare(
  page: any,
  testName: string,
  waitFor?: AsyncAwaitFunction[],
) {
  const editor = await page.$(editorContentSelector);
  const renderer = await page.$(rendererContentSelector);

  if (waitFor && waitFor.length) {
    await Promise.all(
      waitFor.map(async (wait: AsyncAwaitFunction) => await wait(page)),
    );
  }

  const diffPath = path.join(
    __dirname,
    '..',
    '__image_snapshots__',
    '__diff_output__',
  );
  ensureDirSync(diffPath);

  // Take screenshots
  const editorImageBuffer = await editor.screenshot();
  const rendererImageBuffer = await renderer.screenshot();
  const editorImage = PNG.sync.read(editorImageBuffer);
  const rendererImage = PNG.sync.read(rendererImageBuffer);
  const { width, height } = editorImage;
  const diffImage = new PNG({ width, height });

  // Measure change
  const diffPixelCount = pixelmatch(
    editorImage.data,
    rendererImage.data,
    diffImage.data,
    width,
    height,
    { includeAA: true },
  );

  const totalPixels = editorImage.width * editorImage.height;
  const divergence = diffPixelCount / totalPixels;
  const consistencyFloat = 1 - divergence;
  const consistency = clampPercentage(consistencyFloat);

  const reportNode = {
    divergence,
    consistency: `${consistency}%`,
  };

  const testFilename = testName.replace(' ', '-');

  // On CI we only output images is there is a change,
  // but for local testing it may be useful to see all image diffs.
  if (!process.env.CI) {
    // Create composite image of result
    const compositeImage = createCompositeImage(
      editorImage,
      rendererImage,
      diffImage,
    );
    const compositeBuffer = PNG.sync.write(compositeImage, { filterType: 4 });

    // Write image to disk (prefixed with an underscore to denote local debugging)
    const debugDiffPath = path.join(diffPath, '__debug__');
    // Remove existing diff files prior to potential regeneration
    emptyDirSync(debugDiffPath);

    const debugImagePath = path.join(
      debugDiffPath,
      `wysiwyg-debug-${testFilename}-erd.png`,
    );
    fs.writeFileSync(debugImagePath, compositeBuffer);
  }

  // To prevent regressions we fail if the visual consistency changes.
  // If the consistency improves please update the snapshot to reflect the change.
  // Otherwise, if it worsens, please investigata the cause and fix it if possible.
  // Or if it's due to downstream changes outside of your control, then you can update
  // the snapshot to reflect the new state. Only do this as a last resort!
  expect(reportNode).toMatchWYSIWYGSnapshot(
    testName,
    // Improvement callback
    (percent: number) => {
      // Update analytics
      dispatchAnalyticsEvent(
        testName,
        consistencyFloat,
        `${consistency}%`,
        `${percent}%`,
      );
    },
    // Regression callback
    (percent: number) => {
      // Update analytics
      dispatchAnalyticsEvent(
        testName,
        consistencyFloat,
        `${consistency}%`,
        `${-percent}%`,
      );

      // Create composite image of result
      const compositeImage = createCompositeImage(
        editorImage,
        rendererImage,
        diffImage,
      );
      const compositeBuffer = PNG.sync.write(compositeImage, { filterType: 4 });

      // Write image to disk for CI artefacts
      const imagePath = path.join(diffPath, `wysiwyg-${testFilename}-erd.png`);
      fs.writeFileSync(imagePath, compositeBuffer);
    },
  );
}
