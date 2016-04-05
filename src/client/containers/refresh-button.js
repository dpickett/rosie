import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTodaysAgenda } from '../actions/index';

class RefreshButton extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.fetchTodaysAgenda();
  }

  render(){
    return (
      <button type="submit" onClick={this.handleClick}>Refresh</button>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchTodaysAgenda }, dispatch);
}

export default connect(null, mapDispatchToProps)(RefreshButton);
