'use strict';

import Event from '../google/event';
import _ from 'underscore';
import moment from 'moment';
var colors = require('colors');

export default class ShowTodayCommand {
  run(){
    Event.today().then(function(events){
      _.each(events, function(event){
        var times = moment(event.start.dateTime).format('hh:mm') + '-' +
          moment(event.end.dateTime).format('hh:mm');
        if(moment(event.start.dateTime) < moment()){
          times = times.gray;
        }
        else {
          times = times.green;
        }
        console.log(times + ' ' + event.summary);
      });
    });
  }
}

let cmd = new ShowTodayCommand();
cmd.run();
