'use strict';

import commander from 'commander';
import _ from 'underscore';
import moment from 'moment';

import Version from '../version';

import Event from '../google/event';
import Client from '../google/client';

export default class GetGoogleTokenCommand {
  run(){
    let client = new Client();
    client.authorize(true);
  }
}

let cmd = new GetGoogleTokenCommand({});
cmd.run();
