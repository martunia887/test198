import { ReactNode } from 'react';
import { ADNode, ExtensionParams } from '@atlaskit/editor-common';

export type Mode = 'editor' | 'renderer';

export type UnwrappedMacroParams = {
  [key: string]: any;
};

export type LegacyMacroBase = {
  defaultParameterValue?: string;
  name: string;
  params?: UnwrappedMacroParams;
  schemaVersion?: string;
};

export type LegacyMacro = LegacyMacroBase & {
  body?: string;
};

export type QueryNode = ADNode & {
  parameters: any;
};

export type ExtensionHandlerProps = {
  node: ADNode | QueryNode | undefined | null;
  contentId: string;
  showTemplateVariablesInPreview?: boolean;
  showTemplateInputInPreview?: boolean;
  spaceKey: string;
  context: {
    insertCss: (styles) => void;
  };
  mode: Mode;
};

export type MacroName = string;

export type MacroMetadata = {
  macroName: MacroName;
  title: string;
  [key: string]: any;
  description?: string;
};

/**
 * Macro metadata parameters.
 *
 * @see https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence/browse/confluence-plugins/confluence-editor-plugins/confluence-macro-browser/src/main/resources/js/macro-browser-editor.js#299
 */
export type MetadataParameter = {
  type?: {
    name?: string;
  };
  name: string;
  shared: boolean;
  defaultValue?: string;
};

/**
 * Various metadata relating to the macro
 */
export type Metadata = {
  /**
   * @see https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence/browse/confluence-plugins/confluence-editor-plugins/confluence-macro-browser/src/main/resources/js/macro-browser-editor.js#403
   */
  macroName: string;
  /**
   * @see https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence/browse/confluence-plugins/confluence-editor-plugins/confluence-macro-browser/src/main/resources/js/macro-browser-editor.js#402
   */
  pluginKey: string;
  /**
   * @see https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence/browse/confluence-plugins/confluence-editor-plugins/confluence-macro-browser/src/main/resources/js/macro-browser-editor.js#299
   */
  formDetails?: {
    parameters: MetadataParameter[];
  };
  /**
   * @see https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence/browse/confluence-plugins/confluence-editor-plugins/confluence-macro-browser/src/main/resources/js/macro-browser-editor.js#61
   */
  description?: any;
  /**
   * @see https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence/browse/confluence-plugins/confluence-editor-plugins/confluence-macro-browser/src/main/resources/js/macro-browser-editor.js#61
   */
  extendedDescription?: any;
};

/**
 * The macro definition returned from the macro browser.
 *
 * @see https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence/browse/confluence-plugins/confluence-editor-plugins/confluence-macro-browser/src/main/resources/js/macro-browser-editor.js#225
 *
 */
export type MacroDefinition = {
  name?: string;
  params?: {
    [param: string]: string;
  };
  defaultParameterValue?: string;
  body?: string;
  schemaVersion?: string;
};

/**
 * Settings to be passed into the macro browser on open.
 *
 * @see https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence/browse/confluence-plugins/confluence-editor-plugins/confluence-macro-browser/src/main/resources/js/macro-browser.js#266
 */
export type MacroBrowserSettings = {
  autoClose: boolean;
  /**
   * Callback for when the macro browser saves a macro.
   *
   * NOTE: The typings for `macroDefinition` and `metadata` are best guess for
   * what's returned. They are based off their usage in Confluence core JS
   * files. Look at their type definitions for more info.
   */
  onComplete: (macroDefinition: MacroDefinition, metadata: Metadata) => void;
  onCancel: () => void;
  selectedMacro?: LegacyMacro;
};

export type MacroBrowser = {
  UI: {
    showBrowserSpinner: (b: boolean) => void;
  };
  close: () => void;
  open: (settings: MacroBrowserSettings) => void;
};

export type WebResources = {
  contexts?: string[];
  keys?: string[];
};

export type MacroConfig = {
  contentId: string | undefined;
  setActiveModal?: (component: ReactNode, props: any) => void;
  closeActiveModal?: () => void;
};

export interface MacroRendererProps {
  extension: ExtensionParams<any>;
  macroWhitelist: object;
}

export interface MacroRendererState {
  content?: string | null;
  contentId?: number | null;
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
  macroWhitelist: object | null;
  retryCount: number;
}

export type MacroCardType = {
  macroName: string;
  title: string;
  iconUrl?: any;
  action: any;
  errorMessage?: string;
};

export type CreateMacro = {
  isDisabled: boolean;
  action: any;
  onClick?: ((...args: any[]) => void) | null;
  errorMessage?: string;
};
export type ActionProps = {
  callToAction?: boolean;
};
