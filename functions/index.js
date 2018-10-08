const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.versionCheck = functions.https.onRequest((request, response) => {
    cors(request, response, () => {});
    var userAppVersion = request.query.appVersion;
    var latestAppVersion = '0.0.4';
    response.send({ 
        userAppVersion: userAppVersion,
        latestAppVersion: latestAppVersion,
        forceUpdate: false,
        message: "This App version is still supported"
    });
});
