var https = require('https');

module.exports = {
  post: function(job, session) {
    session.get('sockettest', '.sockethub/.facebook').then(function(cred) {
      var req = https.request({
        host: 'graph.facebook.com',
        path: '/me/feed',
        method: 'POST'
      }, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          session.send('got chunk '+chunk);
        });
        res.on('end', function() {
          session.send('response end with status '+res.status);
        });
      });
      req.end('message='+encodeURIComponent(job.object.text)
        +'&access_token='+encodeURIComponent(cred.token));
      session.send('sent');
    });
  }
};