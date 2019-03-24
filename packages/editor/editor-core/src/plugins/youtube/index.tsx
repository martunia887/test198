import * as React from 'react';
import VidPlayIcon from '@atlaskit/icon/glyph/vid-play';
import { YouTubeIcon } from './ui/YouTubeIcon';
import { EditorPlugin } from '../../types';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import keymapPlugin from './pm-plugins/keymap';
import { TypeAheadItem, TypeAheadHandler, GetItemsHandler, TypeAheadSelectItem } from '../type-ahead/types';
import { debouncedYouTubeSearch } from './services/youtubeDataService'
import { debouncedVimeoSearch } from './services/vimeoDataService'
import { VideoSearchResult, VideoSearchFunction } from './searchUtils'
import { VideoSearchResultItem } from './ui/VideoSearchResultItem'
import { PluginKey } from 'prosemirror-state';
import utils from 'prosemirror-utils'


const searchResultMapper = (searchResult: VideoSearchResult): TypeAheadItem | any => ({
  title: searchResult.title,
  render: ({ isSelected, onClick, onMouseMove }: any) => (
    <VideoSearchResultItem
      key={searchResult.videoId}
      searchResult={searchResult}
      selected={isSelected}
      onMouseMove={onMouseMove}
      onSelection={onClick}
    />
  ),
  searchResult,
});

const selectItem: TypeAheadSelectItem = (state, item, insert, selectItemMeta) => {
  const { mode } = selectItemMeta
  const videoUrl = item.searchResult.videoUrl;
  const videoTitle = item.searchResult.title;
  const mark = state.schema.marks.link.create({
    href: encodeURI(videoUrl),
    inlinePreview: true,
  });
  const textNode = state.schema.text(videoTitle, [mark]);  
  const tr = state.tr
  return insert(textNode)
}

const flat = (arr: VideoSearchResult[][]): VideoSearchResult[] => arr.reduce(
  (acc, curr) => acc.concat(curr),
  []
)

const createGetItemsHandler = (videoSearchFunctions: VideoSearchFunction[]): GetItemsHandler => async (
  query,
  state,
  _intl,
  { prevActive, queryChanged },
  tr,
  dispatch,
) => {
  console.log('query:', query)
  const searchResults = !prevActive && queryChanged ? [] : await Promise.all(
    videoSearchFunctions.map(func => func(query))
  );
  return flat(searchResults).map(searchResultMapper);
}


const trigger = 'VideoSearch:';

const youtubePlugin: EditorPlugin = {

  pluginsOptions: {
    typeAhead: {
      trigger,
      // customRegex: `\\(?(${trigger})`,
      getItems: createGetItemsHandler([
        debouncedYouTubeSearch,
        debouncedVimeoSearch
      ]),
      selectItem,
    },

    quickInsert: (quickInsertStuff) => {
      const { formatMessage } = quickInsertStuff
      return [
        {
          title: formatMessage(messages.youtube),
          keywords: ['video', 'youtube', 'vimeo', 'movie'],
          priority: 1200,
          icon: () => (
            // <YouTubeIcon label={formatMessage(messages.youtube)} />
            <VidPlayIcon label={formatMessage(messages.youtube)} />
          ),
          action(insert, state) {
            const mark = state.schema.mark('typeAheadQuery', { trigger });
            // const { selection } = state;
            // const marks = selection.$from.marks();
            const textNode = state.schema.text(trigger, [mark]);  
            const tr = insert(textNode);
            return tr
          },
        },
      ]
    },
  },
};

export default youtubePlugin;

