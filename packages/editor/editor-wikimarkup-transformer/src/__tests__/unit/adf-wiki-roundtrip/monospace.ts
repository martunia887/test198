import { defaultSchema } from '@atlaskit/adf-schema';
import { adf2wikiRoundtrip, wiki2adfRoundtrip } from '../_test-helpers';

import { code, doc, p } from '@atlaskit/editor-test-helpers';

describe('ADF => WikiMarkup => ADF - Monospace', () => {
  test('should convert monospace node with attachment link', () => {
    adf2wikiRoundtrip(doc(p(code('[^link.txt]')))(defaultSchema));
  });

  test('should convert monospace node with bold', () => {
    adf2wikiRoundtrip(doc(p(code('*formatting*')))(defaultSchema));
  });

  test('should convert monospace node with italic', () => {
    adf2wikiRoundtrip(doc(p(code('_formatting_')))(defaultSchema));
  });

  test('should convert monospace node with underline', () => {
    adf2wikiRoundtrip(doc(p(code('+formatting+')))(defaultSchema));
  });

  test('should convert monospace node with ruler', () => {
    adf2wikiRoundtrip(doc(p(code('-----')))(defaultSchema));
  });

  test('should convert monospace node with bullet list', () => {
    adf2wikiRoundtrip(doc(p(code('* abc')))(defaultSchema));
  });

  test('should convert monospace node with attachment link', () => {
    wiki2adfRoundtrip('{{[^link.txt]}}');
  });

  test('should convert monospace node with bold', () => {
    wiki2adfRoundtrip('{{*formatting*}}');
  });

  test('should convert monospace node with italic', () => {
    wiki2adfRoundtrip('{{_formatting_}}');
  });

  test('should convert monospace node with underline', () => {
    wiki2adfRoundtrip('{{+formatting+}}');
  });

  test('should convert monospace node with ruler', () => {
    wiki2adfRoundtrip('{{-----}}');
  });

  test('should convert monospace node with bullet list', () => {
    wiki2adfRoundtrip('{{* abc}}');
  });
});
