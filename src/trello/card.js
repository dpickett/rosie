'use strict';

import Client from './client';
import PreferenceList from '../preference-list';
import _ from 'underscore';

export default class Card {

  constructor(attrs){
    this.id = attrs.id;
    this.idList = attrs.idList;
    this.name = attrs.name;
    this.desc = attrs.desc;
    this.due = attrs.due;
    this.pos = attrs.pos !== null ? attrs.pos : 'bottom';
    _.bindAll(this, 'save');
  }

  save(){
    if(this.id){
      throw('not implemented');
    }
    else {
      return this.constructor.client().request('POST', '/cards', {}, {
        'idList': this.idList,
        'name': this.name,
        'due': this.due,
        'pos': this.pos
      }).then(_.bind(function(json){
        this.id = json.id;
        return this;
      }, this)).catch(function(err){ console.log(err) });
    }
  }

  boardId(){
    return this.prefList().getPref('trelloBoardId');
  }

  prefList(){
    if(!this._prefList){
      this._prefList = new PreferenceList();
    }
    return this._prefList;
  }

  static client(){
    return new Client();
  }
}
