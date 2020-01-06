import React from 'react';
import Button from 'react-bootstrap/Button';
import FileViewer from 'react-file-viewer';

import "./AttachmentViewer.css"

const AttachmentViewer = (props) =>{
  const fileType = props.attachmentType.substr(1,4)

  console.log(`
    fileType: ${props.attachmentType},
    also fileType: ${fileType},
    `);


return (
  <div className="attachmentViewerBg">
    <div className="attachmentViewer">
    <h5 className="attachmentViewerTitle">AttachmentViewer</h5>
    <Button variant="danger" className="attachmentViewerCloseButton" onClick={props.onCloseAttachmentView}>
      close
    </Button>
    {props.attachmentFile && (
      <FileViewer
          fileType={props.attachmentType}
          filePath={props.attachmentFile}
      />
    )}


    </div>
  </div>
)

}


export default AttachmentViewer;
