'use strict';

import Version from './version';
import commander from 'commander';

commander
  .version(Version.get())
  .command('set-incoming', 'set incoming tasks for tomorrow')
  .command('show-today', 'show todays events and tasks')
  .command('show-tomorrow', 'show tomorrows events')
  .parse(process.argv);
