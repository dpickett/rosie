'use strict';

import Board from '../../lib/trello/board.js'
import Client from '../../lib/trello/client.js'

let sinon = require('sinon');
require('sinon-as-promised');

describe('board', function(){
  describe('construction', function(){
    it('assigns an array of lists', function(){
      var board = new Board({
        lists: [
          {
            "name": 'something'
          }
        ]
      });

      expect(board.lists).toBeDefined();
    });
  });

  describe('finding', function(){
    it('finds and instantiates an existing board', function(done){
      var stub = sinon.stub(Board, 'client').returns(
        {
          request: function() {
            var req = sinon.stub()
            req.resolves({'foo': 'bar'});
            return req().then(function(item){
              return item;
            });
          }
        }
      );
      Board.find('341241').then(function(board){
        expect(board).toBeDefined();
        done();
      });

      Board.client.restore();
    });

    it('returns null for a nonexisting board', function(done){
      var stub = sinon.stub(Board, 'client').returns(
        {
          request: function() {
            var req = sinon.stub()
            req.rejects('something went wrong');
            return req().then(function(item){
              return item;
            });
          }
        }
      );
      Board.find('341241').then(function(board){
        expect(board).toBeNull();
        done();
      });

      Board.client.restore();

    });
  });
});
