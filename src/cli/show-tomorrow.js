'use strict';

import Event from '../google/event';
import EventSerializer from '../console/event-serializer';
import _ from 'underscore';

export default class ShowTomorrowCommand {
  run(){
    Event.tomorrow().then(function(events){
      _.each(events, function(event){
        var serializer = new EventSerializer(event);
        console.log(serializer.toString());
      });
    });
  }
}

let cmd = new ShowTomorrowCommand();
cmd.run();
