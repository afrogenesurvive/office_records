import React from 'react';
import Button from 'react-bootstrap/Button';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import "./AttachmentViewer.css"

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    width: 80,
  }
});

let docProps = null;

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>This is a test document</Text>
        <Text>I could be a prescription, referral or the like.</Text>
        <Text>{docProps.pdfData.title}</Text>
      </View>

      {docProps.pdfData.user && (
      <View style={styles.section}>
        <Text>Here is some sample data</Text>
        <Text>Staff:</Text>
        <Text>Name: {docProps.pdfData.user.name}</Text>
        <Text>Phone: {docProps.pdfData.user.phone}</Text>
        <Text>Town: {docProps.pdfData.user.address.town}</Text>
      </View>
      )}
      {docProps.pdfData.patient && (
      <View style={styles.section}>
        <Text>Here is some sample data</Text>
        <Text>Patient</Text>
        <Text>Name: {docProps.pdfData.patient.name}</Text>
        <Text>Phone: {docProps.pdfData.patient.contact.phone}</Text>
        <Text>Town: {docProps.pdfData.patient.address.town}</Text>
      </View>
      )}
      {docProps.pdfData.appointment && (
      <View style={styles.section}>
        <Text>Here is some sample data</Text>
        <Text>Appointment</Text>
        <Text>Name: {docProps.pdfData.appointment.title}</Text>
        <Text>Patient: {docProps.pdfData.appointment.patient.name}</Text>
        <Text>Time: {docProps.pdfData.appointment.time}</Text>
      </View>
      )}
    </Page>
  </Document>
);

const PdfCreator = (props) =>{
  console.log(`
    PdfCreator.props: ${JSON.stringify(props)},
    `);
    docProps = props;

    console.log('My Document Component...', {MyDocument});

return (
  <div className="attachmentViewerBg">
    <div className="attachmentViewer">
    <h5> Document Generator </h5>

    <PDFViewer>
      <MyDocument/>
    </PDFViewer>

    <Button variant="danger" onClick={props.onClosePdfCreator}>
      close
    </Button>

    {

    //   <PDFViewer>
    //   <MyDocument/>
    // </PDFViewer>
  }
    </div>

  </div>
)

}


export default PdfCreator;
