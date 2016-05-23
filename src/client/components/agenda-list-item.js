import React, { Component } from 'react';
import moment from 'moment';

export default class AgendaListItem extends Component {
  render(){
    let timeLabel;
    let eventClass;
    let event = this.props.event;

    if(event.start.dateTime){
      timeLabel = `${event.startTime} - ${event.endTime}`;
      let now = moment()
      let start = moment(event.start.dateTime);
      let end = moment(event.end.dateTime);
      if(start < now && end < now){
        eventClass = 'past';
      }
      else if(start < now && end > now) {
        eventClass = 'current';
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
