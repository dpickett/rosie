import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTrelloColumn } from '../actions/index';

import TrelloCard from '../components/trello-card';

class TrelloList extends Component {
  constructor(){
    super();
    this.ttlMinutes = 20;
    this.ttl = this.ttlMinutes * 60 * 1000;
  }

  fetchColumn(){
    if(!this.props.cards[this.trelloColumnName()] || this.ttlExceeded()){
      this.props.fetchTrelloColumn(this.trelloColumnName());
    }
  }

  ttlExceeded(){
    let age = (new Date()) - this.props.cards[this.trelloColumnName()].refreshedAt;
    return age > this.ttl;
  }

  componentWillMount(){
    this.fetchColumn();
  }
  componentDidUpdate(){
    this.fetchColumn();
  }

  trelloColumnName(){
    return this.props.trelloColumnName ||
      this.props.params.trelloColumnName;
  }

  renderCards(){
    if(this.props.cards && this.props.cards[this.trelloColumnName()]){
      return this.props.cards[this.trelloColumnName()].list.map((card) => {
        return (
          <TrelloCard {...card} />
        );
      });
    }
  }

  render(){
    return (
      <div>
        <h1>{ this.trelloColumnName() }</h1>

        <ol className="trello-list">
          { this.renderCards() }
        </ol>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    cards: state.cards
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchTrelloColumn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrelloList);
