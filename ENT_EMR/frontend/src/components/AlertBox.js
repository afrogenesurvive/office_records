
import React from 'react';
import Alert from 'react-bootstrap/Alert'

import './alertBox.css'

const AlertBox = (props) => {

  let alert = "<alerts>";
  if (props.alert !== null) {
    console.log("alert incoming!!");
    alert = '"'+props.alert+'"';
  }

  console.log(`
      alert: ${alert},
    `);

return (
  <div className="alertBox">
  <Alert variant="danger">
  {alert}
  </Alert>
  </div>
)

}

export default AlertBox;
