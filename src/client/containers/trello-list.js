import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTrelloColumn, shuffleTrelloColumn } from '../actions/index';

import TrelloCard from '../components/trello-card';

class TrelloList extends Component {
  constructor(){
    super();
  }

  fetchColumn(){
    if(!this.props.cards[this.trelloColumnName()] || this.ttlExceeded()){
      this.props.fetchTrelloColumn(this.trelloColumnName());
    }
  }

  ttlExceeded(){
    let age = (new Date()) - this.props.cards[this.trelloColumnName()].refreshedAt;
    return age > this.props.listTtlMinutes * 60 * 1000;
  }

  componentDidMount(){
    this.fetchColumn();
    this.props.shuffleTrelloColumn(this.trelloColumnName());
  }

  componentWillUpdate(nextProps, nextState){
    this.fetchColumn();
    if(this.props.location && this.props.location.state && this.props.location.state.shuffle){
      if(this.props.cards[this.trelloColumnName()] === nextProps.cards[this.trelloColumnName()]) {
        this.props.shuffleTrelloColumn(this.trelloColumnName());
      }
    }
  }

  trelloColumnName(){
    return this.props.trelloColumnName ||
      this.props.params.trelloColumnName;
  }

  renderCards(){
    if(this.props.cards && this.props.cards[this.trelloColumnName()]){
      return this.props.cards[this.trelloColumnName()].list.map((card) => {
        return (
          <TrelloCard {...card} key={card.id} />
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
    cards: state.cards,
    listTtlMinutes: state.listTimeToLive.ttlMinutes
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchTrelloColumn, shuffleTrelloColumn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrelloList);
