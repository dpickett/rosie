'use strict';

import Client from './client';
import querystring from 'querystring';
import PreferenceList from '../preference-list';

import _ from 'underscore';

export default class List {
  constructor(attrs = {}){
    this.id = attrs.id;
    this.idBoard = attrs.idBoard;
    this.attrs = attrs;
  }

  moveAllCardsTo(listId){
    return this.constructor.client().request('POST',
      `/lists/${this.id}/moveAllCards`,
      {},
      {
        "idBoard": this.idBoard,
        "idList": listId
      }).then(function(){
        return {};
      });
  }

  destroy(){
    return this.constructor.client().request('PUT',
      `/lists/${this.id}/closed`,
      {
        "value": 1
      },
      {}
    ).then(function(){
    });
  }

  static create(options){
    return this.client().request('POST',
     '/lists', {}, options
    ).then(function(body){
      return new List(body);
    }).catch(function(err){
      return err;
    });
  }

  static find(trelloSlug){
    return this.all().then((lists) => {
      return _.find(lists, (list) => {
        return list.attrs.name === trelloSlug;
      });
    });
  }

  static all(){
    const prefList = new PreferenceList();
    const boardId = prefList.getPref('trelloBoardId');
    return this.client().request('GET',
      `/boards/${boardId}/lists`, {cards: 'open'}
    ).then(function(body){
      return body.map(function(list){
        return new List(list);
      });
    }).catch(function(err){
      return err;
    });
  }

  static client(){
    return new Client();
  }
}
