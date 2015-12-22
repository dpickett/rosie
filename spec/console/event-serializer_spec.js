'use strict';

import Event from '../../lib/google/event';
import EventSerializer from '../../lib/console/event-serializer';
import moment from 'moment';

describe('event serializer', function(){
  beforeEach(function(){
    this.event = {
      'summary': 'Some appointment',
      'start': { 'dateTime': '2015-12-22T21:30:00-05:00' },
      'end': { 'dateTime': '2015-12-22T22:30:00-05:00' }
    }
    this.serializedEvent = new EventSerializer(this.event);
  });

  it('includes the summary', function(){
    expect(this.serializedEvent.toString()).toMatch(new RegExp(this.event.summary));
  });

  it('includes the start time', function(){
    var startTarget = new RegExp(moment(this.event.start.dateTime).format('hh:mm'));
    expect(this.serializedEvent.toString()).toMatch(startTarget);
  });

  it('includes the end time', function(){
    var endTarget = new RegExp(moment(this.event.end.dateTime).format('hh:mm'));
    expect(this.serializedEvent.toString()).toMatch(endTarget)
  });

  it('designates All Day if the event is all day', function(){
    this.event.start = {'date': '2015-12-22'};
    expect(this.serializedEvent.toString()).toMatch(/All Day/);
  });
})

