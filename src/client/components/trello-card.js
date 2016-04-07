import React, { Component } from 'react';

export default class TrelloCard {
  render(){
    return (
    <li key={this.props.id} className="trello-card">
      {this.props.name}
    </li>
    );
  }
}
