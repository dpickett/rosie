import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AgendaListItem from '../components/agenda-list-item';

import { fetchTodaysAgenda } from '../actions/index';

class TodaysAgenda extends Component {
  componentWillMount(){
    this.props.fetchTodaysAgenda();
  }

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
