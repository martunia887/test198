const puppeteer = require('puppeteer');
const credentials = require('./credentials.json');
const { loginHello } = require('./tasks/helpers/tasks');

const {
  descriptionTask,
  prosAndConsTask,
  mouseMoverTask,
  initTask,
} = require('./tasks');

const ChromeVersion = {
  '72': '612451',
  '73': '625897',
  '74': '638880',
};

async function startChrome(revision) {
  const browserFetcher = puppeteer.createBrowserFetcher();
  const localRevision = await browserFetcher.localRevisions();
  let revisionInfo;

  if (localRevision.indexOf(revision) !== -1) {
    revisionInfo = browserFetcher.revisionInfo(revision);
  } else {
    console.log(`Downloading chrome revision: ${revision}`);
    revisionInfo = await browserFetcher.download(revision);
    console.log(`Finish download.`);
  }

  console.log('Launching browser');
  return revisionInfo;
}

const { Cluster } = require('puppeteer-cluster');

(async () => {
  const revisionInfo = await startChrome(ChromeVersion[74]);

  const cluster = await Cluster.launch({
    timeout: 100000000,
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 4,
    puppeteerOptions: {
      executablePath: revisionInfo.executablePath,
      headless: false,
    },
  });

  cluster.on('taskerror', (err, data) => {
    console.log(`Error crawling ${JSON.stringify(data)}: ${err.message}`);
  });

  await cluster.task(async ({ page, data }) => {
    await page.setViewport({
      width: 1620,
      height: 1024,
    });
    await page.goto(
      'https://hello.atlassian.net/wiki/spaces/~439134412/pages/edit-v2/453697346',
    );

    await loginHello(page, credentials.username, credentials.password);

    await page.waitForSelector('.ProseMirror');
    await page.click('.ProseMirror');

    await page.waitFor(1000);

    switch (data.type) {
      case 'INIT': {
        return initTask(page);
      }
      case 'PROS_CONS': {
        const { table, row, colStart, colEnd } = data.payload;
        return prosAndConsTask(row, colStart, colEnd, table)(page);
      }
      case 'MOUSE_MOVER': {
        return mouseMoverTask(data.payload.table)(page);
      }
      default: {
        const { table, row, colStart, colEnd } = data.payload;
        return descriptionTask(row, colStart, colEnd, table)(page);
      }
    }
    // Store screenshot, do something else
  });

  // cluster.queue({
  //   type: 'PROS_CONS',
  //   payload: {
  //     table: 1,
  //     row: 2,
  //     colStart: 1,
  //     colEnd: 1,
  //   }
  // });

  // cluster.queue({
  //   type: 'DESCRIPTION',
  //   payload: {
  //     table: 1,
  //     row: 2,
  //     colStart: 2,
  //     colEnd: 2,
  //   }
  // })

  // cluster.queue({
  //   type: 'PROS_CONS',
  //   payload: {
  //     table: 1,
  //     row: 2,
  //     colStart: 3,
  //     colEnd: 3,
  //   }
  // });

  cluster.queue({
    type: 'DESCRIPTION',
    payload: {
      table: 1,
      row: 2,
      colStart: 4,
      colEnd: 4,
    },
  });

  await cluster.idle();
  await cluster.close();
})();
