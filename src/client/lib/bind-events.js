import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAgenda } from '../actions/index';
import React, { Component } from 'react';

export default function(key, Klass) {
  const mapDispatchToProps = function(dispatch) {
    return bindActionCreators({ fetchAgenda }, dispatch);
  }

  class AgendaList extends Component {
    fetchAgenda () {
      this.props.fetchAgenda(key,
        this.props.listTtlMinutes, this.props.refreshedAt);
    }

    componentDidMount () {
      this.fetchAgenda()
    }

    componentWillUpdate (nextProps, nextState) {
      this.fetchAgenda()
    }

    render () {
      return (
        <Klass {...this.props} />
      )
    }
  }

  return connect((state) => { return state.events[key] },
    mapDispatchToProps)(AgendaList)
}

