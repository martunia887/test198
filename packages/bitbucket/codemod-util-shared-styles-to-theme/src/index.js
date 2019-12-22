// @flow
import borderRadiusTransform from './transforms/borderRadius';
import codeFontTransform from './transforms/codeFont';
import colorTransform from './transforms/color';
import fixRedundantRenamesTransform from './transforms/fixRedundantRenames';
import fontFamily from './transforms/fontFamily';
import fontSize from './transforms/fontSize';
import gridSizeTransform from './transforms/gridSize';
import gridSizeUnitlessTransform from './transforms/gridSizeUnitless';
import layers from './transforms/layers';
import typographyTransform from './transforms/typography';

// This function gets called by jscodeshift.
// It gets passed the file info and a reference to the jscodeshift API.
export default function utilSharedStylesToThemeCodeshift(
  fileInfo: any,
  api: any,
) {
  const { jscodeshift: j } = api;
  const root = j(fileInfo.source);

  const transforms = [
    fontFamily,
    gridSizeTransform,
    gridSizeUnitlessTransform,
    colorTransform,
    borderRadiusTransform,
    typographyTransform,
    codeFontTransform,
    fontSize,
    layers,
    fixRedundantRenamesTransform,
  ];

  let transformed = root;
  transforms.forEach(transform => {
    transformed = transform(transformed, j);
  });

  return transformed.toSource({ quote: 'double' });
}
