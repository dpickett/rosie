'use strict';

import _ from 'underscore';
import moment from 'moment';

import Board from '../trello/board';
import List from '../trello/list';
import Card from '../trello/card';
import PreferenceList from '../preference-list';
import Event from '../google/event';

import EventCard from '../rosie/event-card';

class SetIncomingTaskCommand {
  run(){
    Board.find(this.boardId()).then(function(board){
      console.log('Setting incoming tasks...');
      console.log('- copying daily recurring tasks');
      let weekDayListName = 'Weekday Recurring to Copy';
      let weekDayList = _.find(board.lists, function(list){
        return list.name === weekDayListName;
      });

      let incomingListName = 'Incoming';
      let incomingList = _.find(board.lists, function(list){
        return list.name === incomingListName;
      });

      let copy = List.create({
        "name": 'Weekly Recurring to Copy Copy',
        "idBoard": weekDayList.idBoard,
        "idListSource": weekDayList.id,
        "pos": 'bottom'
      })
      .then(function(list){
        list.moveAllCardsTo(incomingList.id).then(function(){
          list.destroy();
        });
      })
      .catch(function(){
        console.log('something went wrong');
      });;

      console.log('- copying tomorrows appointments');
      Event.tomorrow().then(function(events){
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

let cmd = new SetIncomingTaskCommand();
cmd.run();


