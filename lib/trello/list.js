'use strict';

import Client from './client';

export default class List {
  constructor(attrs = {}){
    this.id = attrs.id;
    this.idBoard = attrs.idBoard;
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

  static client(){
    return new Client();
  }
}
