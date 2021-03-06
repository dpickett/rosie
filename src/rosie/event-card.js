'use strict';

import moment from 'moment';
import Card from '../trello/card';

export default class EventCard {
  constructor(event, incomingList){
    this.event = event;
    this.incomingList = incomingList;
  }

  description(){
    return (this.event.location || "") + "\r\n" + (this.event.description || "")
  }

  save(){
    let cardName = '(M) ' + moment(this.event.start.dateTime).format('hh:mm') + '-' +
      moment(this.event.end.dateTime).format('hh:mm') + ' ' +
      this.event.summary;
    let card = new Card({
      'name': cardName,
      'idList': this.incomingList.id,
      'pos': 'top',
      'due': moment(this.event.start.dateTime).toISOString(),
      'desc': this.description()
    });
    return card.save();
  }
}
