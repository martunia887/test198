import { NodeSpec, MarkSpec } from 'prosemirror-model';
import { NodeView } from 'prosemirror-view';
import { Plugin } from 'prosemirror-state';
import {
  UIComponentFactory,
  ToolbarUIComponentFactory,
  PMPlugin,
} from './editor-plugin';

export interface NodeConfig {
  name: string;
  node: NodeSpec;
}

export interface MarkConfig {
  name: string;
  mark: MarkSpec;
}

export interface NodeViewConfig {
  name: string;
  nodeView: NodeView;
}

export interface PluginGroups {
  reconfigurable: Array<Plugin>;
  static: Array<Plugin>;
}

export interface EditorConfig {
  nodes: NodeConfig[];
  marks: MarkConfig[];
  pmPlugins: Array<PMPlugin>;
  contentComponents: UIComponentFactory[];
  primaryToolbarComponents: ToolbarUIComponentFactory[];
  secondaryToolbarComponents: UIComponentFactory[];
}
