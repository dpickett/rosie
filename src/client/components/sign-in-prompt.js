import React, { Component } from 'react';

export default class SignInPrompt extends Component {

  render(){
    return (
      <div>
        <a className="button" href="/auth/github">Sign In with GitHub</a>
      </div>
    );
  }
}
