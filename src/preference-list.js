'use strict';

import fs from 'fs-extra';
import path from 'path';
import jsonfile from 'jsonfile';

import config from '../config';

export default class PreferenceList {
  constructor(prefFilePath){
    this.prefFilePath = prefFilePath || path.join(process.env['HOME'], '.rosie');
    this.loadPrefs();
  }

  path(){
    return this.prefFilePath;
  }

  exists(){
    return fs.existsSync(this.path());
  }

  buildFromTemplate(){
    fs.copySync(this.constructor.templatePath(), this.path());
  }

  getPref(pref){
    return this.prefs[pref];
  }

  setPref(pref, value){
    this.prefs[pref] = value;
  }

  loadPrefs(){
    if(config.use_pref_env_vars){
      console.log('using env vars');
      this.prefs = {
        "trelloAccessToken": process.env.TRELLO_ACCESS_TOKEN,
        "trelloAppKey": process.env.TRELLO_APP_KEY,
        "trelloBoardId": process.env.TRELLO_BOARD_ID,
        "google": {
          "client_id": process.env.GOOGLE_CLIENT_ID,
          "client_secret": process.env.GOOGLE_CLIENT_SECRET,
          "credentials": {
            "access_token": process.env.GOOGLE_ACCESS_TOKEN,
            "token_type": "Bearer",
            "refresh_token": process.env.GOOGLE_REFRESH_TOKEN,
            "expiry_date": process.env.GOOGLE_EXPIRY_DATE
          }
        }
      }
    }
    else {
      if(!this.prefs) {
        if(!this.exists()) {
          this.buildFromTemplate();
          return null;
        }
        this.prefs = jsonfile.readFileSync(this.path());
      }
    }
  }

  save(){
    jsonfile.writeFileSync(this.path(), this.prefs);
  }

  static templatePath(){
    return path.join(path.dirname(module.id), '../static/.rosie');
  }
}
