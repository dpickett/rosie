import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTrelloColumn } from '../actions/index';

import TrelloCard from '../components/trello-card';

class TrelloList extends Component {
  fetchColumn(){
    if(!this.props.cards[this.trelloColumnName()]){
      this.props.fetchTrelloColumn(this.trelloColumnName());
    }
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
      return this.props.cards[this.trelloColumnName()].map((card) => {
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
