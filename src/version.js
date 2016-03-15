'use strict';

let fs = require('fs-extra');
let path = require('path');

export default class Version {
  static get(){
    let pkgPath = path.join(path.dirname(module.id), '../package.json');
    return JSON.parse(fs.readFileSync(pkgPath)).version;
  }
}
