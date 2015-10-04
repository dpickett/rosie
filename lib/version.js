'use strict';

let fs = require('fs-extra');
let path = require('path');

module.exports = Version;

export default class Version {
  static get(){
    let pkgPath = path.join(process.cwd(), 'package.json');
    return JSON.parse(fs.readFileSync(pkgPath)).version;
  }
}

