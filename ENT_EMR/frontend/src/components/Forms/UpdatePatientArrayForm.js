import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormCheck from 'react-bootstrap/FormCheck'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const UpdatePatientArrayForm = (props) => {

console.log("UpdatePatientForm.props:  ", {...props});
const {...patient} = props.patient;
console.log("UpdatePatientForm.props.patient:  ", {...patient});


return (
  <div className="UpdateArrayFormContainer">
  <Form onSubmit={props.onConfirm}>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridNextOfKinName">
    {
      // <Form.Label>formGridNextOfKinName</Form.Label>
      <Form.Control type="text" placeholder="formGridNextOfKinName"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridNextOfKinPhone">
    {
      // <Form.Label>formGridNextOfKinPhone</Form.Label>
      <Form.Control type="number" placeholder="formGridNextOfKinPhone"/>
    }
    </Form.Group>

  <Form.Group as={Col} controlId="formGridNextOfKinEmail">
    {
    // <Form.Label>formGridNextOfKinEmail</Form.Label>
    <Form.Control type="email" placeholder="formGridNextOfKinEmail" />
  }
  </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridComplaintDate">
    {
      // <Form.Label>formGridComplaintDate</Form.Label>
      <Form.Control type="date" placeholder="formGridComplaintDate"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridComplaintTitle">
    {
      // <Form.Label>formGridComplaintTitle</Form.Label>
      <Form.Control type="text" placeholder="formGridComplaintTitle"/>
    }
    </Form.Group>

  <Form.Group as={Col} controlId="formGridComplaintDescription">
    {
    // <Form.Label>formGridComplaintDescription</Form.Label>
    <Form.Control type="textarea" placeholder="formGridComplaintDescription" />
  }
  </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridHistoryTitle">
    {
      // <Form.Label>formGridHistoryTitle</Form.Label>
      <Form.Control type="text" placeholder="formGridHistoryTitle"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridHistoryType">
    {
      // <Form.Label>formGridHistoryType</Form.Label>
      <Form.Control type="text" placeholder="formGridHistoryType"/>
    }
    </Form.Group>

  <Form.Group as={Col} controlId="formGridHistoryDate">
    {
    // <Form.Label>formGridHistoryDate</Form.Label>
    <Form.Control type="date" placeholder="formGridHistoryDate" />
  }
  </Form.Group>

  <Form.Group as={Col} controlId="formGridHistoryDescription">
    {
    // <Form.Label>formGridHistoryDescription</Form.Label>
    <Form.Control type="textarea" placeholder="formGridHistoryDescription" />
  }
  </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridAllergiesTitle">
    {
      // <Form.Label>formGridAllergiesTitle</Form.Label>
      <Form.Control type="text" placeholder="formGridAllergiesTitle"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridAllergiesDescription">
    {
      // <Form.Label>formGridAllergiesDescription</Form.Label>
      <Form.Control type="textarea" placeholder="formGridAllergiesDescription"/>
    }
    </Form.Group>

  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridMedicationTitle">
    {
      // <Form.Label>formGridMedicationTitle</Form.Label>
      <Form.Control type="text" placeholder="formGridMedicationTitle"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridMedicationDescription">
    {
      // <Form.Label>formGridMedicationDescription</Form.Label>
      <Form.Control type="textarea" placeholder="formGridMedicationDescription"/>
    }
    </Form.Group>

  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridInvestigationDate">
    {
      // <Form.Label>formGridInvestigationDate</Form.Label>
      <Form.Control type="date" placeholder="formGridInvestigationDate"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridInvestigationTitle">
    {
      // <Form.Label>formGridInvestigationTitle</Form.Label>
      <Form.Control type="text" placeholder="formGridInvestigationTitle"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridInvestigationDescription">
    {
      // <Form.Label>formGridInvestigationDescription</Form.Label>
      <Form.Control type="textarea" placeholder="formGridInvestigationDescription"/>
    }
    </Form.Group>

  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridDiagnosisDate">
    {
      // <Form.Label>formGridDiagnosisDate</Form.Label>
      <Form.Control type="date" placeholder="formGridDiagnosisDate"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridDiagnosisTitle">
    {
      // <Form.Label>formGridDiagnosisTitle</Form.Label>
      <Form.Control type="text" placeholder="formGridDiagnosisTitle"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridDiagnosisDescription">
    {
      // <Form.Label>formGridDiagnosisDescription</Form.Label>
      <Form.Control type="textarea" placeholder="formGridDiagnosisDescription"/>
    }
    </Form.Group>

  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridTreatmentDate">
    {
      // <Form.Label>formGridTreatmentDate</Form.Label>
      <Form.Control type="date" placeholder="formGridTreatmentDate"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridTreatmentTitle">
    {
      // <Form.Label>formGridTreatmentTitle</Form.Label>
      <Form.Control type="text" placeholder="formGridTreatmentTitle"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridTreatmentType">
    {
      // <Form.Label>formGridTreatmentType</Form.Label>
      <Form.Control type="text" placeholder="formGridTreatmentType"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridTreatmentDescription">
    {
      // <Form.Label>formGridTreatmentDescription</Form.Label>
      <Form.Control type="textarea" placeholder="formGridTreatmentDescription"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridTreatmentFrequency">
    {
      // <Form.Label>formGridTreatmentFrequency</Form.Label>
      <Form.Control type="text" placeholder="formGridTreatmentFrequency"/>
    }
    </Form.Group>

  </Form.Row>


  <Form.Row>
    <Form.Group as={Col} controlId="formGridBillingDate">
    {
      // <Form.Label>formGridBillingDate</Form.Label>
      <Form.Control type="date" placeholder="formGridBillingDate"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridBillingTitle">
    {
      // <Form.Label>formGridBillingTitle</Form.Label>
      <Form.Control type="text" placeholder="formGridBillingTitle"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridBillingType">
    {
      // <Form.Label>formGridBillingType</Form.Label>
      <Form.Control type="text" placeholder="formGridBillingType"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridBillingDescription">
    {
      // <Form.Label>formGridBillingDescription</Form.Label>
      <Form.Control type="textarea" placeholder="formGridBillingDescription"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridBillingAmount">
    {
      // <Form.Label>formGridBillingAmount</Form.Label>
      <Form.Control type="number" placeholder="formGridBillingAmount"/>
    }
    </Form.Group>

    <Form.Group as={Col} controlId="formGridBillingPaid">
          {
            // <Form.Label>Important</Form.Label>
          }
          <Form.Control as="select">
            <option>true</option>
            <option>false</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridBillingNotes">
        {
          // <Form.Label>formGridBillingNotes</Form.Label>
          <Form.Control type="textarea" placeholder="formGridBillingNotes"/>
        }
        </Form.Group>

  </Form.Row>


  {props.canCancel && (
    <Button variant="primary" onClick={props.onCancel}>
    Cancel
    </Button>
  )}

  {props.canConfirm && (
    <Button variant="secondary" type="submit" >
    Submit
    </Button>
  )}

  </Form>
  {
    // <AuthContext.Consumer>
  // </AuthContext.Consumer>
  }
  </div>
)};

export default UpdatePatientArrayForm;
