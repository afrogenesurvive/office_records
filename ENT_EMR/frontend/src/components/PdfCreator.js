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
  },
  text:{
    color: "red"
  }
});

let docProps = null;

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>This is a test document</Text>
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
    <View style={styles.section}>

        <Image src={letterheadImage}></Image>
        <Text>{docProps.pdfData.title}</Text>
        <Text>Dear Dr {docProps.pdfData.patient.referringDoctor.name} </Text>
        <Text>Thank you for referring {docProps.pdfData.patient.name} </Text>
        <Text>who I saw on {docProps.pdfData.visitDate}</Text>
        <Text>My findings are as follows:  </Text>
        <Text>{docProps.pdfData.findings}</Text>
        <Text>For this I recommend the following:  </Text>
        <Text>{docProps.pdfData.recommendation}</Text>
        <Text>Referral: {docProps.pdfData.referral}</Text>

        <Text>Visit Diagnosis:  </Text>
        <Text>title: {docProps.pdfData.visitDiagnosis[0].title}</Text>
        <Text>date: {new Date(docProps.pdfData.visitDiagnosis[0].date.substr(0,10)*1000).toISOString().slice(0,10)}</Text>
        <Text>type: {docProps.pdfData.visitDiagnosis[0].type}</Text>
        <Text>description: {docProps.pdfData.visitDiagnosis[0].description}</Text>

        <Text>Visit Treatment:  </Text>
        <Text>title:{docProps.pdfData.visitTreatment[0].title}</Text>
        <Text>type:{docProps.pdfData.visitTreatment[0].type}</Text>
        <Text>date: {new Date(docProps.pdfData.visitTreatment[0].date.substr(0,10)*1000).toISOString().slice(0,10)}</Text>
        <Text>description:{docProps.pdfData.visitTreatment[0].description}</Text>
        <Text>dose:{docProps.pdfData.visitTreatment[0].dose}</Text>
        <Text>frequency:{docProps.pdfData.visitTreatment[0].frequency}</Text>

      </View>
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
        <Text>Name: {docProps.pdfData.patient.name}</Text>
        <Text>Age: {docProps.pdfData.patient.age}</Text>
        <Text>Address: {docProps.pdfData.patient.address.number}, {docProps.pdfData.patient.address.street}</Text>
        <Text>{docProps.pdfData.patient.address.town}, {docProps.pdfData.patient.address.parish}</Text>
        <Text>Operation Name: {docProps.pdfData.name}</Text>
        <Text>Hospital Name: {docProps.pdfData.hospitalName}</Text>
        <Text>Address: {docProps.pdfData.hospitalAddress}</Text>
        <Text>Date of Operation: {docProps.pdfData.date}</Text>
        <Text>Time: {docProps.pdfData.time}</Text>

        <Text>You must attend ... {docProps.pdfData.hospitalName} Hospital</Text>
        <Text>At... {docProps.pdfData.time} ... on ... {docProps.pdfData.date} </Text>
        <Text>You should have NOTHING to Eat or Drink after ... {docProps.pdfData.fastTime} ... on ... {docProps.pdfData.fastDate}</Text>
        <Text>Please take night clothes, toilet articles and hospital fee with you!</Text>

        <Text>Estimated Cost: {docProps.pdfData.estimateCost}</Text>
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
        <Text style={styles.text}>{docProps.pdfData.title}</Text>
        <Text>Name: {docProps.pdfData.patient.name}</Text>
        <Text>note #1: {docProps.pdfData.note1}</Text>
        <Text>note #2: {docProps.pdfData.note2}</Text>
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
        <Text>To Whom It May Concern</Text>
        <Text>Date: {docProps.pdfData.date}</Text>
        <Text>{docProps.pdfData.receiverAddress}</Text>
        <Text>Dear Sir/Madam,</Text>
        <Text>This is to certify that I have seen and examined</Text>
        <Text>Mr. /Mrs. /Miss: {docProps.pdfData.patient.name}</Text>
        <Text>and recommended that she /he should refrain from active duty </Text>
        <Text>for at least ... {docProps.pdfData.duration} days</Text>
        <Text>commencing ... {docProps.pdfData.startDate}</Text>
        <Text>Yours Truly</Text>
      </View>
      )}
    </Page>
  </Document>
);

const DiagTest = () => (
  <Document>
      <Page size="A4" style={styles.page}>
        {docProps.pdfData.patient && (
      <View style={styles.section}>
        <Image src={letterheadImage}></Image>
        <Text>{docProps.pdfData.title}</Text>
        <Text>Date: {docProps.pdfData.date}</Text>
        <Text>To: {docProps.pdfData.receiverAddress}</Text>
        <Text>Name: {docProps.pdfData.patient.name}</Text>
        <Text>Address:</Text>
        <Text>{docProps.pdfData.patient.address.number}</Text>
        <Text>{docProps.pdfData.patient.address.street}</Text>
        <Text>{docProps.pdfData.patient.address.parish}</Text>
        <Text>Test(s) Required: </Text>
        <Text>{docProps.pdfData.requiredTests}</Text>
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
        <Text>Insurance</Text>
        <Text>Patient's Name: {docProps.pdfData.patient.name}</Text>
        <Text>Age: {docProps.pdfData.patient.age}</Text>
        <Text>Address: {docProps.pdfData.patient.address.number}, {docProps.pdfData.patient.address.street}</Text>
        <Text>{docProps.pdfData.patient.address.town}, {docProps.pdfData.patient.address.parish}</Text>
        <Text>Subscriber: {docProps.pdfData.patientInsurance[0].company}</Text>
        <Text>Policy No: {docProps.pdfData.patientInsurance[0].number}</Text>
        <Text>Plan: {docProps.pdfData.patientInsurance[0].description}</Text>
        <Text>Employer: {docProps.pdfData.patient.occupation.employer}</Text>
        <Text>Proposed Operation: {docProps.pdfData.operation}</Text>
        <Text>Date of Operation: {docProps.pdfData.operationDate}</Text>
        <Text>Surgeon's Fee: ${docProps.pdfData.surgeonFee}</Text>
        <Text>Assistant Surgeon's Fee: ${docProps.pdfData.assistantSurgeonFee}</Text>
        <Text>Anesthetist's Fee: ${docProps.pdfData.anesthetistsFee}</Text>
        <Text>Please review for approval for Surgery and Insurance payment.</Text>
        <Text>Thanks.</Text>
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
        <Text>Date: {docProps.pdfData.date}</Text>
        <Text>Name: {docProps.pdfData.patient.name}</Text>
        <Text>Age: {docProps.pdfData.patient.age}</Text>
        <Text>Address:</Text>
        <Text>{docProps.pdfData.patient.address.number}, {docProps.pdfData.patient.address.street}</Text>
        <Text>{docProps.pdfData.patient.address.town}, {docProps.pdfData.patient.address.parish}</Text>
        <Text>Prescription: {docProps.pdfData.prescription}</Text>
        <Text>Generic? {docProps.pdfData.generic}</Text>
        <Text>Repeat: {docProps.pdfData.repeat}</Text>
        <Text>Doctor: {docProps.pdfData.consultantName}</Text>
        <Text>Signature: _______</Text>
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
        <Text>Date: {docProps.pdfData.date}</Text>
        <Text>Patient's Name: {docProps.pdfData.patient.name}</Text>
        <Text>Patient's Age: {docProps.pdfData.patient.age}</Text>
        <Text>I    {docProps.pdfData.consentGiver}    do hereby give consent to have </Text>
        <Text>   {docProps.pdfData.procedure}    performed upon</Text>
        <Text> {docProps.pdfData.consentGiverRelation} </Text>
        <Text> The procedure, its risks and possible complications have been fully explained to me. </Text>
        <Text> This procedure will be done uder local anesthetic and/or sedation. </Text>
        <Text> I understand and am in agreement with proceeding with same. </Text>
        <Text> Signed: </Text>
        <Text> Name: </Text>
        <Text> Signed: </Text>
        <Text> Witness: </Text>
        <Text> Doctor/Surgeon Signature: </Text>
        <Text> Name: </Text>
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
        <Text>Date: {docProps.pdfData.date}</Text>
        <Text>Patient's Name: {docProps.pdfData.patient.name}</Text>
        <Text>Patient's D.O.B: {docProps.pdfData.patient.dob}</Text>
        <Text>Patient's Age: {docProps.pdfData.patient.age}</Text>
        <Text>Patient's Sex: {docProps.pdfData.patient.gender}</Text>
        <Text>Clinical Features:</Text>
        <Text>{docProps.pdfData.clinicalFeatures}</Text>
        <Text>Provisional Investigation:</Text>
        <Text>{docProps.pdfData.provisionalInvestigation}</Text>
        <Text>Conclusion:</Text>
        <Text>{docProps.pdfData.conclusion}</Text>
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
        <Text>Date: {docProps.pdfData.date}</Text>
        <Text>Patient</Text>
        <Text>Name: {docProps.pdfData.patient.name}</Text>
        <Text>Instructions: {docProps.pdfData.treatmentInstruction}</Text>
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
      {docProps.pdfType === "diagTest" && (
        <DiagTest/>
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
