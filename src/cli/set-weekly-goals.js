'use strict';

import commander from 'commander';
import _ from 'underscore';
import moment from 'moment';

import Version from '../version';

import Board from '../trello/board';
import List from '../trello/list';
import Card from '../trello/card';

import PreferenceList from '../preference-list';

import ListCopy from '../rosie/list-copy';

class SetWeeklyGoalsCommand {
  run(){
    console.log('Copying weekly process goals...')
    const recurringWeeklyGoalsLabel = 'Weekly Process Goals'
    const weeklyGoalsLabel = 'Weekly Goals'
    Board.find(this.boardId()).then(function(board){
      let listCopy = new ListCopy(board,
        recurringWeeklyGoalsLabel,
        weeklyGoalsLabel)
      listCopy.create();
      console.log('Done')
    }).catch(function(err){
      console.log('error finding board')
    })

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
  .parse(process.argv);


let cmd = new SetWeeklyGoalsCommand();
cmd.run();

