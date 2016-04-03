import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { fetchTodaysAgenda } from '../actions/index';

class TodaysAgenda extends Component {
  componentWillMount(){
    this.props.fetchTodaysAgenda();
  }

  renderEvents() {
    if(this.props.events){
      return this.props.events.map((event) => {
        let timeLabel;
        let eventClass;
        if(event.start.dateTime){
          timeLabel = `${event.startTime} - ${event.endTime}`;
          if(moment(event.start.dateTime) < moment()){
            eventClass = 'past';
          }
          else {
            eventClass = 'future';
          }
        }
        else {
          timeLabel = 'All Day';
          eventClass = 'future';
        }
        return (
          <li key={event.id} className={eventClass}>
            <strong>
            {timeLabel}
            </strong>&nbsp;-&nbsp;
            {event.summary}
          </li>
        )
      });
    }
    else {
      return '';
    }
  }

  render() {
    return (
      <div>
        <h1>Today</h1>
        <ol className="events">
          { this.renderEvents() }
        </ol>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    events: state.todaysEvents
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchTodaysAgenda }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodaysAgenda);
