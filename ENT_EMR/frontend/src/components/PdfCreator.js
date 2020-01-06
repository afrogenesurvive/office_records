import React from 'react';
import Button from 'react-bootstrap/Button';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import "./AttachmentViewer.css"

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });
//
// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Section #1</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//   </Document>
// );

const PdfCreator = (props) =>{
  console.log(`
    props: ${props},
    `);

return (
  <div className="attachmentViewerBg">
    <div className="attachmentViewer">
    <h5> Document Generator </h5>
    <Button variant="danger" onClick={props.onClosePdfCreator}>
      close
    </Button>
    <p>{props.pdfData.title}</p>
    <p>{props.pdfData.body}</p>
    </div>
    {
      // <PDFViewer>
      //   <MyDocument />
      // </PDFViewer>
    }
  </div>
)

}


export default PdfCreator;
