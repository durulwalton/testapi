const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    var appStatus,
        appMessage;
    const token = req.header('x-auth-token');
    console.log("AuthBackendToken",token);
    if (!token) {
        appStatus = false;
        appMessage = 'Unauthorized User!';
         res.send(JSON.stringify({
            'appStatus': appStatus,
            'appMessage': appMessage
        }));
    }
    try {
        const decoded = jwt.verify(token, "sumiya");
        req.user = decoded;
        next();
    }
    catch (ex) {
        appStatus = false;
        appMessage = 'Invalid token.!';
        return res.send(JSON.stringify({
            'appStatus': appStatus,
            'appMessage': appMessage
        }));
    }
}