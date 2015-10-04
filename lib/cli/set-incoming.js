'use strict';

class SetIncomingTaskCommand {
  run(){
    console.log('Setting incoming tasks...');

    console.log('Done');
  }
}

let cmd = new SetIncomingTaskCommand();
cmd.run();


