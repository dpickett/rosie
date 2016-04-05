import React, { Component } from 'react';
import moment from 'moment';

export default class AgendaListItem extends Component {
  render(){
    let timeLabel;
    let eventClass;
    let event = this.props.event;

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
  }
}
