'use strict';

import Version from './version';
let commander = require('commander');

commander
  .version(Version.get())
  .command('set-incoming', 'set incoming tasks for tomorrow')
  .command('show-today', 'show todays events and tasks')
  .parse(process.argv);
