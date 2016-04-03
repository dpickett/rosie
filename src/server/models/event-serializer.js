import moment from 'moment';

export default class EventSerializer {
  constructor(googleEvent){
    this.event = googleEvent;
    if(this.event.start && this.event.start.dateTime){
      this.event.startTime = moment(this.event.start.dateTime).format('hh:mm');
      this.event.endTime = moment(this.event.end.dateTime).format('hh:mm');
    }
    else {
      this.event.startTime = 'All Day';
      this.event.endTime = null
    }
  }

  serialize(){
    return this.event;
  }
}
