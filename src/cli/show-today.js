'use strict';

import Event from '../google/event';
import _ from 'underscore';
import moment from 'moment';
var colors = require('colors');
import EventSerializer from '../console/event-serializer';

export default class ShowTodayCommand {
  run(){
    Event.today().then(function(events){
      _.each(events, function(event){
        var serializer = new EventSerializer(event);
        console.log(serializer.toString());
      });
    });
  }
}

let cmd = new ShowTodayCommand();
cmd.run();
