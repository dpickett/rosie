import React, { Component } from 'react';
import AgendaListItem from './agenda-list-item';

export default class EventList extends Component {
  renderEvents() {
    if(this.props.events){
      return this.props.events.map((event) => {
        return (
          <AgendaListItem event={event} key={event.id} />
        );
      });
    }
    else {
      return '';
    }
  }

  render () {
    return (
      <ol className="events">
        { this.renderEvents() }
      </ol>
    )
  }
}
