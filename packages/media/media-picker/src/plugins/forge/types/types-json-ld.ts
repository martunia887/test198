// Overall JSON-LD interface.
export interface JsonLd {
  meta: JsonLdMeta;
  data: JsonLdData;
}
export interface JsonLdCollection {
  meta: JsonLdMeta;
  data: JsonLdData[];
}

// ========================
// JSONLD.meta & friends.
// ========================
export interface JsonLdMeta {
  visibility: 'public' | 'restricted' | 'other' | 'not_found';
  access: 'granted' | 'forbidden' | 'unauthorized' | 'not_found';
  auth: JsonLdMetaAuth[];
  definitionId?: string;
}

export interface JsonLdMetaAuth {
  key: string;
  displayName: string;
  url: string;
}

// ========================
// JSONLD.data & friends.
// ========================
export interface JsonLdData {
  '@context': JsonLdContext;
  '@type': JsonLdType;
  '@id'?: string;
  generator?: JsonLdGenerator;
  url: string;
  preview?: JsonLdPreview;
  image: JsonLdImage;
  fileFormat?: string;
  fileType?: string;
  fileSize?: number;
  icon: JsonLdIcon;
  attributedTo?: JsonLdAuthor;
  updated?: string;
  updatedBy?: JsonLdAuthor;
  duration?: number;
  isDeleted?: boolean;
  dateCreated?: string;
  name?: string;
  summary?: string;
}

export type JsonLdType = string | string[];
export interface JsonLdContext {
  '@vocab': 'https://www.w3.org/ns/activitystreams#';
  atlassian: 'https://schema.atlassian.com/ns/vocabulary#';
  schema: 'http://schema.org/';
}

export interface JsonLdGenerator {
  name: string;
  icon?: JsonLdIcon;
}

export interface JsonLdAuthor {
  '@type': 'Profile';
  name: string;
  url?: string;
}

export interface JsonLdIcon {
  '@type': 'Image';
  url: string;
  width?: number;
  height?: number;
  mediaType?: string;
}

export interface JsonLdImage {
  '@type': 'Image';
  url: string;
  width: number;
  height: number;
  mediaType?: string;
}

export interface JsonLdPreview {
  '@type': 'Audio' | 'Video' | 'Note';
  duration?: number;
  width?: number;
  'atlassian:aspectRatio'?: number;
  content: string;
}

export const JsonLdCollectionEmpty: JsonLdCollection = {
  meta: {
    visibility: 'other',
    access: 'not_found',
    auth: [],
  },
  data: [],
};
