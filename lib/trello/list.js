'use strict';

import Client from './client';

export default class List {
  static build(options){
    return this.client().request('POST',
     '/lists', {}, options
    ).then(function(body){
      return body;
    }).catch(function(err){
      return err;
    });
  }

  static client(){
    return new Client();
  }
}
