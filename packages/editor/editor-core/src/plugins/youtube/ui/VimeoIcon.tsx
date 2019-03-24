import * as React from 'react';

export class VimeoIcon extends React.Component {
  render() {
    // I thought webpack would bundle this for me, but apparently it does not:
    // return (<img src="./YouTubeIcon.svg" />)
    
    return (
      <img 
        style={{
          width:'16px',
          height:'16px',
        }}  
        // src="https://www.iconfinder.com/icons/341112/download/svg/256"
        src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Vimeo.svg"
      />
    )
  }
}

