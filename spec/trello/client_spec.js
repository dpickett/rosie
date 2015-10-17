'use strict';

import Client from '../../lib/trello/client';

describe('trello client', function(){
  beforeEach(function(){
    this.client = new Client();
  });

  it('has default params that include an app key', function(){
    expect(this.client).toBeDefined();
    expect(this.client.defaultParams()).toBeDefined();
    expect(this.client.defaultParams().key).toBeDefined();
  });

  it('has default params that include an token', function(){
    expect(this.client.defaultParams().token).toBeDefined();
  });
});
