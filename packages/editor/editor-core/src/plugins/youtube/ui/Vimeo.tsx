import * as React from 'react'


interface VimeoEmbedProps {

  className: any;  // isnt in React.Props<any> ?

  onReady: any;  // () => {}

  videoId? : any;

  opts: any;

  // unsafeHtml: any;

  video: any;
}



const extractIframeSoruce = (html: string) : string => {
  
  const regex = new RegExp('src\s*=\s*\\"(.+?)"')
  const matches = regex.exec(html)
  const append = '&autoplay=1'
  return matches ? matches[1] + append : ''
}



export class Vimeo extends React.Component<VimeoEmbedProps & React.Props<any>, any> {

  render() {

    // todo: call this when the video has actually loaded:
    setTimeout(() => this.props.onReady(), 1000)

    return (
      // <div
      //    dangerouslySetInnerHTML={{__html: this.props.video.iframeEmbed || ''}}
      //  />

       <div> 
        <iframe 
          src={extractIframeSoruce(this.props.video.iframeEmbed)} 
          width={this.props.opts.width}
          height={this.props.opts.height}
          frameborder="0" 
          title={this.props.video.title} 
          allow="autoplay" 
          autoplay={1}
          allowautoplay={true}
        />
       </div>
    )
  }

}