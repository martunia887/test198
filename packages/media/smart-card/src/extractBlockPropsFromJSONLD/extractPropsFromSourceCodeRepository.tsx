import * as React from 'react';
import { FormattedRelative } from 'react-intl';

import { BlockCardResolvedViewProps } from '@atlaskit/media-ui';
import { extractPropsFromObject } from './extractPropsFromObject';

export type ExtractorSetter<T> = (props: T, json: any) => T;
export type ExtractorBuilder<T> = (json: any) => Partial<T>;

export type ExtractorSetterRepository = ExtractorSetter<
  BlockCardResolvedViewProps
>;
export type ExtractorBuilderRepository = ExtractorBuilder<
  BlockCardResolvedViewProps
>;

export const buildRepositoryLink: ExtractorBuilderRepository = json => {
  const link = json['@url'] && json['@url'].trim();
  return link ? { link } : {};
};

export const buildRepositoryTitle: ExtractorBuilderRepository = json => {
  const text = json.name && json.name.trim();
  return text ? { title: { text } } : {};
};

export const buildRepositoryDescription: ExtractorBuilderRepository = json => {
  const text = typeof json.summary === 'string' ? json.summary : undefined;
  return text ? { description: { text } } : {};
};

export const buildRepositoryByline: ExtractorBuilderRepository = json => {
  const attributedTo =
    json.attributedTo && json.attributedTo.name ? json.attributedTo.name : '';
  const dateCreated = json['schema:dateCreated'];
  const dateUpdated = json['updated'];
  const updatedBy =
    json['atlassian:updatedBy'] && json['atlassian:updatedBy'].name;
  if (dateCreated || dateUpdated) {
    return {
      byline: updatedBy ? (
        <span>
          Updated by {updatedBy} <FormattedRelative value={dateUpdated} />
        </span>
      ) : (
        <span>
          Created by {attributedTo} <FormattedRelative value={dateCreated} />
        </span>
      ),
    };
  }

  return {};
};

export const setRepositoryContext: ExtractorSetterRepository = (
  props,
  json,
) => {
  const nextProps = { ...props };
  if (nextProps.context && json.generator && json.context) {
    nextProps.context.text = `${json.generator.name} / ${json.context.name}`;
  }
  return nextProps;
};

export const setRepositoryDetails: ExtractorSetterRepository = (
  props,
  json,
) => {
  const nextProps = { ...props };
  if (json['schema:programmingLanguage']) {
    nextProps.details = nextProps.details || [];
    nextProps.details.push({
      title: 'Language',
      text: json['schema:programmingLanguage'],
    });
  }
  if (json['atlassian:subscriberCount']) {
    nextProps.details = nextProps.details || [];
    nextProps.details.push({
      title: 'Subscribers',
      text: json['atlassian:subscriberCount'],
    });
  }
  return nextProps;
};

export function extractPropsFromSourceCodeRepository(
  json: any,
): BlockCardResolvedViewProps {
  let props = extractPropsFromObject(json);

  props = setRepositoryContext(props, json);
  props = setRepositoryDetails(props, json);

  return {
    ...buildRepositoryLink(json),
    ...buildRepositoryTitle(json),
    ...buildRepositoryDescription(json),
    ...buildRepositoryByline(json),
    ...props,
  };
}
