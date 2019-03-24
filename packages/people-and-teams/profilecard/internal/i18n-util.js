import _objectSpread from "@babel/runtime/helpers/objectSpread";
import * as locales from '../i18n';

var localesMessagesMap = _objectSpread({}, locales, {
  'pt-BR': locales.pt_BR,
  // should resolve pt-BR and pt_BR
  'pt-PT': locales.pt_PT
});
/**
 * Tries to get the most specific messages bundle for a given locale.
 *
 * Strategy:
 * 1. Try to find messages with the exact string (i.e. 'fr_FR')
 * 2. If that doesn't work, try to find messages for the country locale (i.e. 'fr')
 * 3. If that doesn't work, return english messages as a fallback.
 *
 * @param locale string specifying the locale like 'en_GB', or 'fr'.
 */


export var getMessagesForLocale = function getMessagesForLocale(locale) {
  var messages = localesMessagesMap[locale];

  if (!messages) {
    var parentLocale = locale.split(/[-_]/)[0];
    messages = localesMessagesMap[parentLocale];
  }

  if (!messages) {
    messages = locales.en;
  }

  return messages;
};