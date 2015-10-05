'use strict';

let fs = require('fs-extra');
let path = require('path');

export default class PreferenceList {
  constructor(prefFilePath){
    this.prefFilePath = prefFilePath || path.join(process.env['HOME'], '.rosie');
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
    if(!this.prefs) {
      if(!this.exists()) {
        this.buildFromTemplate();
        return null;
      }
      this.prefs = JSON.parse(fs.readFileSync(this.path()));
    }


    return this.prefs[pref];
  }

  static templatePath(){
    return path.join(path.dirname(module.id), '../static/.rosie');
  }
}
