import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import AuthContext from '../../context/auth-context';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const UpdatePatientVigilanceForm = (props) => {

  const [vigilanceDate, setVigilanceDate] = useState(new Date());

  const handleChangeVigilanceDate = date => {
    setVigilanceDate(date);
    console.log(`vigilanceDate ${vigilanceDate}`);
   }

const {...patient} = props.patient;


return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>

  {!props.visit && (
  <Form.Group as={Col} controlId="formGridVigilanceDate">
    <Form.Label>Date</Form.Label>
    <Form.Control type="date" placeholder="VigilanceDate"/>
  </Form.Group>
  )}

  {!props.visit && (
  <Form.Group as={Col} controlId="formGridVigilanceDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
  </Form.Group>
  )}

  {props.visit && (
  <Form.Group as={Col} controlId="formGridVigilanceDateTodayCheckbox">
    <Form.Label>Today ?</Form.Label>
    <Form.Control type="checkbox" defaultChecked={true}/>
  </Form.Group>
  )}

  </Form.Row>

  {!props.visit && (
  <Form.Row>
  <Form.Group as={Col} controlId="">
    <Form.Label>Fancy Date</Form.Label>
    <DatePicker className="" id="patientVigilanceCalendarDate"
      selected={vigilanceDate}
      onChange={handleChangeVigilanceDate}
    />
  </Form.Group>
  </Form.Row>
  )}

  <Form.Row>
  <h6>Chronic Illness </h6>
  <h6>Diabetes : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceChronicIllnessDiabetesMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceChronicIllnessDiabetesTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceChronicIllnessDiabetesComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>High Blood Pressure : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceChronicIllnessHbpMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceChronicIllnessHbpTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceChronicIllnessHbpComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Dyslipidemia : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceChronicIllnessDyslipidemiaMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceChronicIllnessDyslipidemiaTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceChronicIllnessDyslipidemiaComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Cad : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceChronicIllnessCadMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceChronicIllnessCadTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceChronicIllnessCadComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>
  <h6>Lifestyle : </h6>
  <h6>Weight : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceLifestyleWeightMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceLifestyleWeightTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceLifestyleWeightComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Diet : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceLifestyleDietMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceLifestyleDietTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceLifestyleDietComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Smoking : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceLifestyleSmokingMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceLifestyleSmokingTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceLifestyleSmokingComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Substance Abuse : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceLifestyleSubstanceAbuseMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceLifestyleSubstanceAbuseTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceLifestyleSubstanceAbuseComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Exercise : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceLifestyleExerciseMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceLifestyleExerciseTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceLifestyleExerciseComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Allergies : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceLifestyleAllergiesMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceLifestyleAllergiesTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceLifestyleAllergiesComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Asthma : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceLifestyleAsthmaMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceLifestyleAsthmaTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceLifestyleAsthmaComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>
  <h6>Screening : </h6>
  <h6>Breast : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceScreeningBreastMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceScreeningBreastTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceScreeningBreastComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Prostate : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceScreeningProstateMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceScreeningProstateTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceScreeningProstateComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Cervix : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceScreeningCervixMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceScreeningCervixTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceScreeningCervixComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Colon : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceScreeningColonMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceScreeningColonTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceScreeningColonComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Dental : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceScreeningDentalMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceScreeningDentalTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceScreeningDentalComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>
  <h6>Vaccines : </h6>
  <h6>Influenza : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceVaccinesInfluenzaMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesInfluenzaTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesInfluenzaComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Varicella : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceVaccinesVaricellaMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesVaricellaTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesVaricellaComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>HPV : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceVaccinesHpvMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesHpvTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesHpvComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>MMR : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceVaccinesMmrMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesMmrTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesMmrComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Tetanus : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceVaccinesTetanusMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesTetanusTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesTetanusComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Pneumovax : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceVaccinesPneumovaxMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesPneumovaxTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesPneumovaxComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <h6>Other : </h6>
  <Form.Group as={Col} controlId="formGridVigilanceVaccinesOtherName">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesOtherMedication">
    <Form.Label>Medication: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesOtherTesting">
    <Form.Label>Testing: Yes/No (check for 'Yes')</Form.Label>
    <Form.Control type="checkbox"/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridVigilanceVaccinesOtherComment">
    <Form.Label>Comment</Form.Label>
    <Form.Control type="text" placeholder="Vigilance"/>
  </Form.Group>

  </Form.Row>

  <Form.Row>
  {props.canCancel && (
    <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
  )}

  {props.canConfirm && (
    <Button variant="primary" className="formButton" type="submit">
    Submit
    </Button>
  )}

  {props.visit && (
    <Button variant="success" className="formButton" onClick={props.onCreateVisitChecklistUpdate.bind(this, "vigilance")}>
    Done adding Billing
    </Button>
  )}
  </Form.Row>

</Form>
</div>

)};

export default UpdatePatientVigilanceForm;
