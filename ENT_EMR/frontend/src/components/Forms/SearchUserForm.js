import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import AuthContext from '../../context/auth-context';
import './CreateUserForm.css';

const SearchUserForm = (props) => {
// const {...search} = props.search;

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>
<Form.Group controlId="formBasicField">
<Form.Label>Field</Form.Label>
<Form.Control as="select">
  <option>name</option>
  <option>email</option>
  <option>role</option>
</Form.Control>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group controlId="formBasicQuery">
<Form.Label>Query</Form.Label>
<Form.Control type="textarea" placeholder="Query" />
</Form.Group>

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

{
// <AuthContext.Consumer>
// </AuthContext.Consumer>


// populate feilds with user object fields
}
</Form>
</div>


)};

export default SearchUserForm;
