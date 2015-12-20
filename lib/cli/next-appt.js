'use strict';

import Client from '../google/client';

export default class NextApptCommand {
  run(){
    let client = new Client();
    client.today();
  }
}

let cmd = new NextApptCommand();
cmd.run();
