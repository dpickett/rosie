'use strict';

import PreferenceList from '../preference-list';

let req = require('request');
let qs = require('querystring');
let _ = require('underscore');

export default class Client {
  constructor(){
  }

  request(method, path, params = {}, formData = {}, callback){
    var defaultParams = this.defaultParams();
    var promiseFunc = function(resolve, reject){
      req({
        uri: 'https://api.trello.com/1' + path + '?' + qs.stringify(_.extend(params, defaultParams)),
        method: method,
        formData: formData
      }, function(err, httpResp, body){
        if(!err){
          if(httpResp.statusCode === 200){
            resolve(JSON.parse(body));
          }
          else{
            reject(httpResp.body);
          }
        }
        else{
          reject(err);
        }
      });
    }
    _.bind(promiseFunc, this);
    var promise = new Promise(promiseFunc);

    return promise;
  }

  defaultParams(){
    return {
      "key": this.appKey(),
      "token": this.accessToken()
    }
  }

  accessToken(){
    return this.prefList().getPref('trelloAccessToken');
  }

  appKey(){
    return this.prefList().getPref('trelloAppKey');
  }

  prefList(){
    if(!this._prefList){
      this._prefList = new PreferenceList();
    }
    return this._prefList;
  }

  static get(){
    return new Client();
  }
}
