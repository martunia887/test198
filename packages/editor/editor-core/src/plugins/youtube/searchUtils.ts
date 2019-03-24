
export type VideoSearchFunction = (searchQuery: string) => Promise<VideoSearchResult[]>

export type VideoServiceName = 'Vimeo' | 'YouTube'

export interface VideoSearchResult {
  title: string
  videoId: string
  videoUrl: string
  videoServiceName: VideoServiceName
  thumbnail: {
    url: string
    width: string
    height: string
  }
  iframeEmbed?: string  // for vimeo quick hack
  description: string
}

export function debounceSearch(actualSearchFunction: VideoSearchFunction, delay: number = 180): VideoSearchFunction {
  let timer: NodeJS.Timer;
  let latestResolver: Function;

  return (searchQuery) => {    
    clearTimeout(timer);

    timer = setTimeout(() => {
      latestResolver(actualSearchFunction(searchQuery))
      latestResolver = () => {};
    }, delay);

    return new Promise(resolve => latestResolver = resolve);
  };
}
