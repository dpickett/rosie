import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AgendaListItem from '../components/agenda-list-item';
import RefreshButton from './refresh-button';

import { fetchAgenda } from '../actions/index';

class TodaysAgenda extends Component {
  componentDidMount(){
    this.fetchAgenda('today');
  }

  componentWillUpdate(nextProps, nextState){
    this.fetchAgenda('today');
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

  ttlExceeded(){
    let age = (new Date()) - this.props.refreshedAt;
    return age > this.props.listTtlMinutes * 60 * 1000;
  }

  fetchAgenda(key){
    if(!this.props.events || this.ttlExceeded()){
      this.props.fetchAgenda(key);
    }
  }
}

function mapStateToProps(state){
  return {
    events: state.events.today.events,
    refreshedAt: state.events.today.refreshedAt,
    listTtlMinutes: state.events.today.ttlMinutes
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchAgenda }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodaysAgenda);
