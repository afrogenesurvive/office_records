import React from 'react';
import Button from 'react-bootstrap/Button';

import "./AttachmentViewer.css"



const LoadingOveray = (props) =>{

  console.log(`
    Loading overlay.props: ${JSON.stringify(props)}
    loading status: ${props.status}
    `);


return (
  <div className="attachmentViewerBg">
    <div className="loadingOverlay">
      {props.status}
    </div>
  </div>
)

}


export default LoadingOveray;
