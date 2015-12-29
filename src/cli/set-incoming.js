'use strict';

import commander from 'commander';
import _ from 'underscore';
import moment from 'moment';

import Version from '../version';

import Board from '../trello/board';
import List from '../trello/list';
import Card from '../trello/card';
import PreferenceList from '../preference-list';
import Event from '../google/event';

import EventCard from '../rosie/event-card';
import ListCopy from '../rosie/list-copy';

class SetIncomingTaskCommand {
  constructor(options){
    this.today = options.today || false;
  }

  run(){
    var today = this.today;
    Board.find(this.boardId()).then(function(board){
      console.log('Setting incoming tasks...');
      console.log('- copying daily recurring tasks');
      let weekDayListName = 'Weekday Recurring to Copy';
      let incomingListName = 'Incoming';

      let listCopy = new ListCopy(board,
        weekDayListName,
        incomingListName);
      listCopy.create();

      let incomingList = _.find(board.lists, function(list){
        return list.name === incomingListName;
      });

      let events;
      if(today){
        console.log('- copying todays appointments');
        events = function() { return Event.today() };
      }
      else {
        console.log('- copying tomorrows appointments');
        events = function() { return Event.tomorrow() };
      }

      events().then(function(events){
        let prevPromise = Promise.resolve();
        _.each(events.reverse(), function(event){
          prevPromise = prevPromise.then(function(){
            //omit all day events
            if(event && !event.start.date){
              let eventCard = new EventCard(event, incomingList);
              return eventCard.save();
            }
            else {
              return Promise.resolve();
            }
          });
        });
      }).catch(function(err){
        console.log('something went wrong');
      });
    });
  }

  boardId(){
    return this.prefList().getPref('trelloBoardId');
  }
  prefList(){
    if(!this._prefList){
      this._prefList = new PreferenceList();
    }
    return this._prefList;
  }
}

let program = commander
  .version(Version.get())
  .option('-t, --today', 'Add events from today')
  .parse(process.argv);


let cmd = new SetIncomingTaskCommand({
  today: program.today
});
cmd.run();


