import moment from 'moment';
let colors = require('colors');

export default class EventSerializer {
  constructor(googleEvent){
    this.event = googleEvent;
  }

  toString(){
    if(this.event.start.date){
      return 'All Day     '.gray +  this.event.summary;
    }
    else {
      var times = moment(this.event.start.dateTime).format('hh:mm') + '-' +
        moment(this.event.end.dateTime).format('hh:mm');
      if(moment(this.event.start.dateTime) < moment()){
        times = times.gray;
      }
      else {
        times = times.green;
      }
      return times + ' ' + this.event.summary;
    }
  }
}
