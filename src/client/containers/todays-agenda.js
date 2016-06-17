import React, { Component, PropTypes } from 'react'

import EventList from '../components/event-list';

import bindEventsToComponent from '../lib/bind-events';

class TodaysAgenda extends Component {
  render() {
    return (
      <div>
        <h1>Today</h1>
        <EventList events={ this.props.events } />
      </div>
    );
  }
}

export default bindEventsToComponent('today', TodaysAgenda)
