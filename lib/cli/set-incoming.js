'use strict';

let _ = require('underscore');
import Board from '../trello/board'
import List from '../trello/list'
import PreferenceList from '../preference-list';

class SetIncomingTaskCommand {
  run(){
    Board.find(this.boardId()).then(function(board){
      console.log('Setting incoming tasks...');
      let weekDayListName = 'Weekday Recurring to Copy';
      let weekDayList = _.find(board.lists, function(list){
        return list.name === weekDayListName;
      });

      let incomingListName = 'Incoming';
      let incomingList = _.find(board.lists, function(list){
        return list.name = incomingListName;
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


