'use strict';

import Client from './client';

let request = require('request');

export default class Board {
  constructor(attrs){
    this.attrs = attrs
    if(this.attrs.lists){
      this.lists = this.attrs.lists || [];
    }
  }

  static find(boardId, options = {}){
    return this.client().request('GET',
      '/boards/' + boardId,
      {
        "lists": "open"
      },
      {}
    ).then(function(body){
      return new Board(body);
    }).catch(function(err){
      return null;
    });
  }

  static client(){
    return new Client();
  }
}
