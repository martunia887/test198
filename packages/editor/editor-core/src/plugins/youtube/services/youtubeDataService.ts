import * as mockData from './youtubeMockData.json';
import { VideoSearchResult, debounceSearch, VideoSearchFunction } from '../searchUtils'

const key = '<RED4CTED>'
const youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/search'

type YoutubeApiSearchResult = any

const maxResults = 10
const constructVideoUrl = (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`;

const searchResultMapper = (item: YoutubeApiSearchResult): VideoSearchResult => ({
  videoId: item.id.videoId,
  videoUrl: constructVideoUrl(item.id.videoId),
  thumbnail: item.snippet.thumbnails.default,
  title: item.snippet.title,
  description: item.snippet.description,
  videoServiceName: 'YouTube',
})
    
// omit search results which do not have a videoId.
// Probably a better way to do this by changing the YT query     
const resultFilter = (item: any) => item.videoId

const makeYouTubeSearch: VideoSearchFunction = async (q: string): Promise<VideoSearchResult[]>  => {
  if (q === '' || q.length < 3) {
    return []
  }
  const results = await fetch(`${youtubeApiUrl}?q=${q}&part=snippet&maxResults=${maxResults}&key=${key}`)
  const body = await results.json()

  return body.items
    .map(searchResultMapper)
    .filter(resultFilter)
}


export const debouncedYouTubeSearch = debounceSearch((e: any) => makeYouTubeSearch(e), 1000);

// FAKES!
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const mockYouTubeSearch: VideoSearchFunction = async (q: string): Promise<VideoSearchResult[]> => {
  if (q === '' || q.length < 3) {
    return []
  }
  await delay(500)
  return mockData.items
    .map(searchResultMapper)
    .filter(resultFilter)
}

// export const debouncedYouTubeSearch = debounceSearch(mockYouTubeSearch);


