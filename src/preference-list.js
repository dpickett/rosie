'use strict';

let fs = require('fs-extra');
let path = require('path');
let jsonfile = require('jsonfile');

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
    if(!this.prefs) {
      if(!this.exists()) {
        this.buildFromTemplate();
        return null;
      }
      this.prefs = jsonfile.readFileSync(this.path());
    }
  }

  save(){
    jsonfile.writeFileSync(this.path(), this.prefs);
  }

  static templatePath(){
    return path.join(path.dirname(module.id), '../static/.rosie');
  }
}
