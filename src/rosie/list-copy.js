import _ from 'underscore';

import List from '../trello/list';


export default class ListCopy {
  constructor(board, sourceListName, destListName){
    this.board = board;
    this.sourceListName = sourceListName;
    this.destListName = destListName;
    _.bindAll(this, 'sourceList', 'destList');
  }

  create(){
    return List.create({
      "name": this.sourceListName + ' Copy',
      "idBoard": this.sourceList().idBoard,
      "idListSource": this.sourceList().id,
      "pos": 'bottom'
    })
    .then(function(list){
      list.moveAllCardsTo(this.destList().id).then(function(){
        list.destroy();
      });
    }.bind(this));
  }

  sourceList(){
    return _.find(this.board.lists, function(list){
      return list.name === this.sourceListName;
    }.bind(this));
  }

  destList(){
    return _.find(this.board.lists, function(list){
      return list.name === this.destListName;
    }.bind(this));
  }
}
