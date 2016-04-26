import React, { Component } from 'react';

export default class SignInPrompt extends Component {

  render(){
    return (
      <div className="row">
        <div className="column align-center">
          <h1>Sign In</h1>
          <a className="button" href="/auth/github">
            <i className="fa fa-github fa-lg"></i> Sign In with GitHub
          </a>
        </div>
      </div>
    );
  }
}
