import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RefreshButton from './refresh-button';

import { fetchAgenda } from '../actions/index';

import EventList from '../components/event-list';

class TodaysAgenda extends Component {
  componentDidMount(){
    this.fetchAgenda();
  }

  componentWillUpdate(nextProps, nextState){
    this.fetchAgenda();
  }

  render() {
    return (
      <div>
        <h1>Today</h1>
        <EventList events={ this.props.events } />
      </div>
    );
  }

  fetchAgenda(){
    this.props.fetchAgenda('today',
      this.props.listTtlMinutes, this.props.refreshedAt);
  }
}

function mapStateToProps(state){
  return state.events.today;
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchAgenda }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodaysAgenda);
