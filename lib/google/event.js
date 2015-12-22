import Client from './client';
import _ from 'underscore';
import moment from 'moment';
var google = require('googleapis');

export default class Event {
  static today(){
    var client = new Client();
    return client.authorize().then(_.bind(this.eventsToday, this));
  }

  static eventsToday(auth){
    var startDate = moment().startOf('day');
    var endDate = moment().endOf('day');

    return this.listEvents({
      auth: auth,
      timeMin: startDate,
      timeMax: endDate
    })
  }

  static listEvents(options){
    var promiseFunc = function(resolve, reject){
      var calendar = google.calendar('v3');

      calendar.events.list({
        auth: options.auth,
        calendarId: 'primary',
        timeMin: options.timeMin.toISOString(),
        timeMax: options.timeMax.toISOString(),
        maxResults: 50,
        singleEvents: true,
        orderBy: 'startTime'
      }, function(err, response) {
        if (err) {
          reject(err);
        }
        else {
          var events = response.items;
          resolve(events);
        }
      });
    }
    promiseFunc = _.bind(promiseFunc, this);
    return new Promise(promiseFunc);
  }

}
