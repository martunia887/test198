import * as mockData from './vimeoMockData.json';
import { VideoSearchResult, debounceSearch, VideoSearchFunction } from '../searchUtils'

const key = '<RED4CTED>'
const vimeoApiUrl = 'https://api.vimeo.com/videos'

type VimeoApiSearchResult = any

const maxResults = 8

// todo: thing
const extractVideoId = (link: string) => link;
const thumnailSelector = (pictures: any) => {
  const size = 0
  return {
    url: pictures.sizes[size].link,
    width: pictures.sizes[size].width,
    height: pictures.sizes[size].height,
  }
}

const searchResultMapper = (item: VimeoApiSearchResult): VideoSearchResult => {
  return ({
    videoId: extractVideoId(item.link),
    videoUrl: item.link,
    thumbnail: thumnailSelector(item.pictures),
    title: item.name,
    description: item.description || '',
    videoServiceName: 'Vimeo',
    iframeEmbed: item.embed.html,
  })
}
    
const makeVimeoSearch: VideoSearchFunction = async (q: string): Promise<VideoSearchResult[]>  => {
  if (q === '' || q.length < 3) {
    return []
  }
  const results = await fetch(`${vimeoApiUrl}?query=${q}&per_page=${maxResults}&access_token=${key}`, {
    // headers: new Headers([
    //   ['Authorization', `bearer ${key}`]
    // ])
  })
  const body = await results.json()
  return body.data
    .map(searchResultMapper)
}

export const debouncedVimeoSearch = debounceSearch((e: any) => makeVimeoSearch(e), 1000);

// FAKES!
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const mockVimeoSearch: VideoSearchFunction = async (q: string): Promise<VideoSearchResult[]> => {
  if (q === '' || q.length < 3) {
    return []
  }
  await delay(500)
  return mockData.data
    .map(searchResultMapper)
}

// export const debouncedVimeoSearch = debounceSearch(mockVimeoSearch);
