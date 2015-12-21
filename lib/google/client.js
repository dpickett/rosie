import PreferenceList from '../preference-list';
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var readline = require('readline');
var moment = require('moment');
var _ = require('underscore');

export default class Client {
  constructor() {
    this.SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
    _.bindAll(this, 'getNewToken', 'credentials', 'authorize');
  }

  credentials() {
    return this.prefList().getPref('google');
  }

  prefList() {
    if(!this._prefList){
      this._prefList = new PreferenceList();
    }
    return this._prefList;
  }

  today(){
    return this.authorize().then(this.eventsToday);
  }

  eventsToday(auth){
    var calendar = google.calendar('v3');

    var startDate = moment().startOf('day');
    var endDate = moment().endOf('day');

    var promiseFunc = function(resolve, reject){
      calendar.events.list({
        auth: auth,
        calendarId: 'primary',
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
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
    return new Promise(promiseFunc);
  }

  token() {
    return this.prefList().prefs.google.credentials.access_token;
  }

  authorize() {
    var promiseFunc = function(resolve, reject){
      var clientId = this.prefList().prefs.google.client_id;
      var clientSecret = this.prefList().prefs.google.client_secret;
      var redirectUrl = "urn:ietf:wg:oauth:2.0:oob";
      var auth = new googleAuth();
      var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

      // Check if we have previously stored a token.
      if(!this.token()){
        this.getNewToken(oauth2Client, resolve, reject);
      }
      else {
        oauth2Client.credentials = this.credentials().credentials;
        resolve(oauth2Client);
      }
    };
    promiseFunc = _.bind(promiseFunc, this);

    return new Promise(promiseFunc);
  }

  persistCreds(client){
    this.prefList().prefs.google.credentials = client.credentials;
    this.prefList().save();
  }

  getNewToken(oauth2Client, resolve, reject) {
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    var tokenHandler = function(err, token) {
      if (err) {
        reject('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      this.persistCreds(oauth2Client);
      resolve(oauth2Client);
    }
    tokenHandler = _.bind(tokenHandler, this);

    rl.question('Enter the code from that page here: ', function(code) {
      rl.close();
      oauth2Client.getToken(code, tokenHandler);
    });
  }
}
