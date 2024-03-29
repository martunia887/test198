import { inputRules, InputRule } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';
import { Plugin, EditorState } from 'prosemirror-state';
import { analyticsService } from '../../../analytics';
import { createInputRule } from '../../../utils/input-rules';
import { Match, LinkMatcher, normalizeUrl } from '../utils';
import { queueCards } from '../../card/pm-plugins/actions';
import {
  addAnalytics,
  ACTION,
  ACTION_SUBJECT,
  INPUT_METHOD,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
  AnalyticsEventPayload,
} from '../../analytics';

export function createLinkInputRule(
  regexp: RegExp,
  formatUrl: (url: string[]) => string,
): InputRule {
  // Plain typed text (eg, typing 'www.google.com') should convert to a hyperlink
  return createInputRule(
    regexp,
    (state: EditorState, match, start: number, end: number) => {
      const { schema } = state;
      if (state.doc.rangeHasMark(start, end, schema.marks.link)) {
        return null;
      }
      const [link] = (match as any) as Match[];

      const url = normalizeUrl(link.url);
      const markType = schema.mark('link', { href: url });

      analyticsService.trackEvent(
        'atlassian.editor.format.hyperlink.autoformatting',
      );

      const payload: AnalyticsEventPayload = {
        action: ACTION.INSERTED,
        actionSubject: ACTION_SUBJECT.DOCUMENT,
        actionSubjectId: ACTION_SUBJECT_ID.LINK,
        attributes: { inputMethod: INPUT_METHOD.AUTO_DETECT },
        eventType: EVENT_TYPE.TRACK,
      };

      const tr = queueCards([
        {
          url: link.url,
          pos: start - (link.input!.length - link.lastIndex),
          appearance: 'inline',
          compareLinkText: true,
        },
      ])(
        state.tr
          .addMark(
            start - (link.input!.length - link.lastIndex),
            end - (link.input!.length - link.lastIndex),
            markType,
          )
          .insertText(' '),
      );
      return addAnalytics(tr, payload);
    },
  );
}

export function createInputRulePlugin(schema: Schema): Plugin | undefined {
  if (!schema.marks.link) {
    return;
  }

  const urlWithASpaceRule = createLinkInputRule(
    new LinkMatcher() as RegExp,
    match => (match[3] ? match[1] : `https?://${match[1]}`),
  );

  // [something](link) should convert to a hyperlink
  const markdownLinkRule = createInputRule(
    /(^|[^!])\[(.*?)\]\((\S+)\)$/,
    (state, match, start, end) => {
      const { schema } = state;
      const [, prefix, linkText, linkUrl] = match;
      const url = normalizeUrl(linkUrl);
      const markType = schema.mark('link', { href: url });

      analyticsService.trackEvent(
        'atlassian.editor.format.hyperlink.autoformatting',
      );

      const payload: AnalyticsEventPayload = {
        action: ACTION.INSERTED,
        actionSubject: ACTION_SUBJECT.DOCUMENT,
        actionSubjectId: ACTION_SUBJECT_ID.LINK,
        attributes: { inputMethod: INPUT_METHOD.FORMATTING },
        eventType: EVENT_TYPE.TRACK,
      };
      const tr = state.tr.replaceWith(
        start + prefix.length,
        end,
        schema.text(linkText, [markType]),
      );
      return addAnalytics(tr, payload);
    },
  );

  return inputRules({
    rules: [urlWithASpaceRule, markdownLinkRule],
  });
}

export default createInputRulePlugin;
