import * as React from 'react';

export class YouTubeIcon extends React.Component {
  render() {
    // I thought webpack would bundle this for me, but apparently it does not:
    // return (<img src="./YouTubeIcon.svg" />)
    
    return (
      <img 
        style={{
          width:'16px',
          height:'16px',
        }}  
        src="https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_%282017%29.svg"  
      />
    )
  }
}

