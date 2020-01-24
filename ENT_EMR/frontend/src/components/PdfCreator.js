import React from 'react';
import Button from 'react-bootstrap/Button';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import "./AttachmentViewer.css";
import letterheadImage from "../assets/img/referralLetterhead.jpg";

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
        <Text>{docProps.pdfData.test}</Text>
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

const PatientReferral = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {docProps.pdfData.patient && (
      <View style={styles.section}>
        <Image src={letterheadImage}></Image>
        <Text>{docProps.pdfData.title}</Text>
        <Text>Dear Dr {docProps.pdfData.patient.referringDoctor.name} </Text>
        <Text>Thank you for referring {docProps.pdfData.patient.name} </Text>
        <Text>who I saw on {docProps.pdfData.visitDate}</Text>
        <Text>My findings are as follows:  </Text>
        <Text>{docProps.pdfData.findings}</Text>
        <Text>Visit Diagnosis:  </Text>
        <Text>title: {docProps.pdfData.visitDiagnosis[0].title}</Text>
        <Text>date: {new Date(docProps.pdfData.visitDiagnosis[0].date.substr(0,10)*1000).toISOString().slice(0,10)}</Text>
        <Text>type: {docProps.pdfData.visitDiagnosis[0].type}</Text>
        <Text>description: {docProps.pdfData.visitDiagnosis[0].description}</Text>
        <Text>For this I recommend the following:  </Text>
        <Text>{docProps.pdfData.recommendation}</Text>
        <Text>Visit Treatment:  </Text>
        <Text>title:{docProps.pdfData.visitTreatment[0].title}</Text>
        <Text>type:{docProps.pdfData.visitTreatment[0].type}</Text>
        <Text>date: {new Date(docProps.pdfData.visitTreatment[0].date.substr(0,10)*1000).toISOString().slice(0,10)}</Text>
        <Text>description:{docProps.pdfData.visitTreatment[0].description}</Text>
        <Text>dose:{docProps.pdfData.visitTreatment[0].dose}</Text>
        <Text>frequency:{docProps.pdfData.visitTreatment[0].frequency}</Text>
        <Text>Referral: {docProps.pdfData.referral}</Text>
      </View>
      )}
    </Page>
  </Document>
);

const OperationReminder = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {docProps.pdfData.patient && (
      <View style={styles.section}>
        <Image src={letterheadImage}></Image>
        <Text>{docProps.pdfData.title}</Text>
        <Text>Here is some sample data</Text>
        <Text>Patient</Text>
        <Text>Name: {docProps.pdfData.patient.name}</Text>
        <Text>Phone: {docProps.pdfData.patient.contact.phone}</Text>
        <Text>Town: {docProps.pdfData.patient.address.town}</Text>
        <Text>Referral: {docProps.pdfData.referral}</Text>
      </View>
      )}
    </Page>
  </Document>
);

const MiscNote = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {docProps.pdfData.patient && (
      <View style={styles.section}>
        <Image src={letterheadImage}></Image>
        <Text>{docProps.pdfData.title}</Text>
        <Text>Here is some sample data</Text>
        <Text>Patient</Text>
        <Text>Name: {docProps.pdfData.patient.name}</Text>
        <Text>Phone: {docProps.pdfData.patient.contact.phone}</Text>
        <Text>Town: {docProps.pdfData.patient.address.town}</Text>
        <Text>Referral: {docProps.pdfData.referral}</Text>
      </View>
      )}
    </Page>
  </Document>
);

const SickNote = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {docProps.pdfData.patient && (
      <View style={styles.section}>
        <Image src={letterheadImage}></Image>
        <Text>{docProps.pdfData.title}</Text>
        <Text>Here is some sample data</Text>
        <Text>Patient</Text>
        <Text>Name: {docProps.pdfData.patient.name}</Text>
        <Text>Phone: {docProps.pdfData.patient.contact.phone}</Text>
        <Text>Town: {docProps.pdfData.patient.address.town}</Text>
        <Text>Referral: {docProps.pdfData.referral}</Text>
      </View>
      )}
    </Page>
  </Document>
);

const InsuranceNote = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {docProps.pdfData.patient && (
      <View style={styles.section}>
        <Image src={letterheadImage}></Image>
        <Text>{docProps.pdfData.title}</Text>
        <Text>Here is some sample data</Text>
        <Text>Patient</Text>
        <Text>Name: {docProps.pdfData.patient.name}</Text>
        <Text>Phone: {docProps.pdfData.patient.contact.phone}</Text>
        <Text>Town: {docProps.pdfData.patient.address.town}</Text>
        <Text>Referral: {docProps.pdfData.referral}</Text>
      </View>
      )}
    </Page>
  </Document>
);

const Prescription = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {docProps.pdfData.patient && (
      <View style={styles.section}>
        <Image src={letterheadImage}></Image>
        <Text>{docProps.pdfData.title}</Text>
        <Text>Here is some sample data</Text>
        <Text>Patient</Text>
        <Text>Name: {docProps.pdfData.patient.name}</Text>
        <Text>Phone: {docProps.pdfData.patient.contact.phone}</Text>
        <Text>Town: {docProps.pdfData.patient.address.town}</Text>
        <Text>Referral: {docProps.pdfData.referral}</Text>
      </View>
      )}
    </Page>
  </Document>
);

const ProcedureConsent = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {docProps.pdfData.patient && (
      <View style={styles.section}>
        <Image src={letterheadImage}></Image>
        <Text>{docProps.pdfData.title}</Text>
        <Text>Here is some sample data</Text>
        <Text>Patient</Text>
        <Text>Name: {docProps.pdfData.patient.name}</Text>
        <Text>Phone: {docProps.pdfData.patient.contact.phone}</Text>
        <Text>Town: {docProps.pdfData.patient.address.town}</Text>
        <Text>Referral: {docProps.pdfData.referral}</Text>
      </View>
      )}
    </Page>
  </Document>
);

const FitToFly = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {docProps.pdfData.patient && (
      <View style={styles.section}>
        <Image src={letterheadImage}></Image>
        <Text>{docProps.pdfData.title}</Text>
        <Text>Here is some sample data</Text>
        <Text>Patient</Text>
        <Text>Name: {docProps.pdfData.patient.name}</Text>
        <Text>Phone: {docProps.pdfData.patient.contact.phone}</Text>
        <Text>Town: {docProps.pdfData.patient.address.town}</Text>
        <Text>Referral: {docProps.pdfData.referral}</Text>
      </View>
      )}
    </Page>
  </Document>
);

const TreatmentInstruction = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {docProps.pdfData.patient && (
      <View style={styles.section}>
        <Image src={letterheadImage}></Image>
        <Text>{docProps.pdfData.title}</Text>
        <Text>Here is some sample data</Text>
        <Text>Patient</Text>
        <Text>Name: {docProps.pdfData.patient.name}</Text>
        <Text>Phone: {docProps.pdfData.patient.contact.phone}</Text>
        <Text>Town: {docProps.pdfData.patient.address.town}</Text>
        <Text>Referral: {docProps.pdfData.referral}</Text>
      </View>
      )}
    </Page>
  </Document>
);

const PdfCreator = (props) =>{
    docProps = props;

return (
  <div className="attachmentViewerBg">
    <div className="attachmentViewer">
    <h5> Document Generator: {docProps.pdfType}</h5>

    <PDFViewer>
      {docProps.pdfType === "test" && (
        <MyDocument/>
      )}
      {docProps.pdfType === "patientReferral" && (
        <PatientReferral/>
      )}
      {docProps.pdfType === "operationReminder" && (
        <OperationReminder/>
      )}
      {docProps.pdfType === "miscNote" && (
        <MiscNote/>
      )}
      {docProps.pdfType === "sickNote" && (
        <SickNote/>
      )}
      {docProps.pdfType === "insuranceNote" && (
        <InsuranceNote/>
      )}
      {docProps.pdfType === "prescription" && (
        <Prescription/>
      )}
      {docProps.pdfType === "procedureConsent" && (
        <ProcedureConsent/>
      )}
      {docProps.pdfType === "fitToFlyAuthorization" && (
        <FitToFly/>
      )}
      {docProps.pdfType === "treatmentInstruction" && (
        <TreatmentInstruction/>
      )}
    </PDFViewer>

    <Button variant="danger" onClick={props.onClosePdfCreator}>
      close
    </Button>
    </div>

  </div>
)

}


export default PdfCreator;
