import PreferenceList from '../preference-list';
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var readline = require('readline');

export default class Client {
  constructor() {
    this.SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
  }

  credentials() {
    return {
      client_id: this.clientId(),
      client_secret: this.clientSecret(),
    }
  }

  prefList() {
    if(!this._prefList){
      this._prefList = new PreferenceList();
    }
    return this._prefList;
  }

  clientId() {
    return this.prefList().getPref('googleClientId');
  }

  clientSecret() {
    return this.prefList().getPref('googleSecretKey');
  }

  today(){
    this.authorize(this.listToday);
  }

  appCredentials(){
    return {
      "access_token": this.token(),
      "token_type":"Bearer"
    }
  }

  listToday(auth){
    var calendar = google.calendar('v3');

    var endDate = new Date();
    endDate.setHours(23,59,59,999);
    calendar.events.list({
      auth: auth,
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      timeMax: endDate.toISOString(),
      maxResults: 50,
      singleEvents: true,
      orderBy: 'startTime'
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var events = response.items;
      if (events.length == 0) {
        console.log('No upcoming events found.');
      } else {
        console.log('Today\'s Events:');
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          var start = event.start.dateTime || event.start.date;
          console.log('%s - %s', start, event.summary);
        }
      }
    });
  }

  token() {
    return this.prefList().getPref('googleAccessToken');
  }

  authorize(callback) {
    var clientSecret = this.clientSecret();
    var clientId = this.clientId();
    var redirectUrl = "urn:ietf:wg:oauth:2.0:oob";
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    if(!this.token()){
      this.getNewToken(oauth2Client, callback);
    }
    else {
      oauth2Client.credentials = this.appCredentials();
      callback(oauth2Client);
    }
  }

  getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
      rl.close();
      oauth2Client.getToken(code, function(err, token) {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        callback(oauth2Client);
      });
    });
  }
}
