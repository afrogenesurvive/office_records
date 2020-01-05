import React from 'react';
import Button from 'react-bootstrap/Button';
import FileViewer from 'react-file-viewer';

import "./AttachmentViewer.css"

const PdfCreator = (props) =>{
  console.log(`
    props: ${props},
    `);


return (
  <div className="attachmentViewerBg">
    <div className="attachmentViewer">
    <h1> Document Generator </h1>
    <Button variant="danger" onClick={props.onClosePdfCreator}>
      close
    </Button>
    <p>{props.pdfData.title}</p>
    <p>{props.pdfData.body}</p>
    </div>
  </div>
)

}


export default PdfCreator;
