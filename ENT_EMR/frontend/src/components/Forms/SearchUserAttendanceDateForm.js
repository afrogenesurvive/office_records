import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const SearchUserAttendanceDateForm = (props) => {
// const {...search} = props.search;

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>

<Form.Group controlId="formBasicDate">
<Form.Label>Attendance Date</Form.Label>
<Form.Control type="date" placeholder="Date"/>
</Form.Group>

<Form.Group controlId="formBasicDateTodayCheckbox">
  <Form.Label>Today's Date?</Form.Label>
  <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
</Form.Group>

{props.canCancel && (
  <Button variant="danger" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
  <Button variant="primary" type="submit">
  Submit
  </Button>
)}

{
// <AuthContext.Consumer>
// </AuthContext.Consumer>
}
</Form>
</div>


)};

export default SearchUserAttendanceDateForm;
