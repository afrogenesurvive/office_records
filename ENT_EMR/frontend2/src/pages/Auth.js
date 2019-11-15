import React, { Component } from 'react';

import './Auth.css';
import AuthContext from '../context/auth-context';
// import ThisUserContext from '../context/thisUser-context';

class AuthPage extends Component {
  // state = {
  //   isLogin: true
  // };

  static contextType = AuthContext;
  // static contextType = ThisUserContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  // switchModeHandler = () => {
  //   this.setState(prevState => {
  //     return { isLogin: !prevState.isLogin };
  //   });
  // };

  createAction(token,creatorId,type,body) {

    console.log("'create actions function' context object... " + JSON.stringify(this.context));
    console.log("args.creatorId..." + creatorId, "action type..." + type, "action body..." + body);
    const userId = creatorId;
    // const token = this.context.token;

    const requestBody = {
      query: `
          mutation createAction($userId: ID!, $type: String!, $body: String!) {
            createAction(userId: $userId, actionInput: {type: $type, body: $body}) {
              _id
              creator
              {_id,username}
              body
            }
          }
        `,
        variables: {
          userId: userId,
          type: type,
          body: body
        }
    };

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {

        console.log("response data... " + JSON.stringify(resData));
        this.context.action1 = null;

          })
      .catch(err => {
        console.log(err);
      });

  }


  submitHandler = event => {
    console.log("login function...");
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };


    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log("your data... " + JSON.stringify(resData));
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );

          sessionStorage.setItem('login info', JSON.stringify({token: resData.data.login.token, userId: resData.data.login.userId, tokenExpiration: resData.data.login.tokenExpiration}) )

          this.context.action1 = JSON.stringify(requestBody);
          console.log("this context object..." + JSON.stringify(this.context));
          console.log("this context action1..." + this.context.action1);

          this.createAction(resData.data.login.token,resData.data.login.userId,"query",this.context.action1);

        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
