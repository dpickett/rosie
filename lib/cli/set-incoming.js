'use strict';

let _ = require('underscore');
import Board from '../trello/board'
import List from '../trello/list'

class SetIncomingTaskCommand {
  run(){
    this.boardId = 'eyW8Tvqn';
    Board.find(this.boardId).then(function(board){
      console.log('Setting incoming tasks...');
      let weekDayListName = 'Weekday Recurring to Copy';
      let weekDayList = _.find(board.lists, function(list){
        return list.name === weekDayListName;
      });

      console.log(weekDayList);
      let copy = List.build({
        "name": 'Weekly Recurring to Copy Copy',
        "idBoard": weekDayList.idBoard,
        "idListSource": weekDayList.id,
        "pos": 'bottom'
      })
      .then(function(body){
        console.log(body);
      })
      .catch(function(){
        console.log('so lost');
      });;
    });
  }
}

let cmd = new SetIncomingTaskCommand();
cmd.run();


