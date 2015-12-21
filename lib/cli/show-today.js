'use strict';

import Client from '../google/client';
import _ from 'underscore';
import moment from 'moment';

export default class ShowTodayCommand {
  run(){
    let client = new Client();
    client.today().then(function(events){
      _.each(events, function(event){
        console.log(
          moment(event.start.dateTime).format('h:mm') + '-' +
          moment(event.end.dateTime).format('h:mm') + ' ' +
          event.summary
        );
      });
    });

  }
}

let cmd = new ShowTodayCommand();
cmd.run();
