import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion'
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const SearchUserLeaveDateRangeForm = (props) => {
// const {...search} = props.search;

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>

<Form.Group controlId="formBasicStartDate">
<Form.Label>Start Date</Form.Label>
<Form.Control type="date" placeholder="StartDate"/>
</Form.Group>

<Form.Group controlId="formBasicEndDate">
<Form.Label>End Date</Form.Label>
<Form.Control type="date" placeholder="EndDate"/>
</Form.Group>

{props.canCancel && (
  <Accordion.Toggle as={Button} variant="danger" eventKey="3" className="btn" onClick={props.onCancel}>
  Cancel
  </Accordion.Toggle>
)}

{props.canConfirm && (
  <Accordion.Toggle as={Button} variant="success" eventKey="3" className="btn" type="submit">
  Search
  </Accordion.Toggle>
)}

{
// <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</Form>
</div>


)};

export default SearchUserLeaveDateRangeForm;
