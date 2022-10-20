exports.tobase64 = (word) => {

    return ((new Buffer.from(word)).toString('base64'));

};

exports.frombase64 = (string) => {

    return ((new Buffer.from(string, 'base64')).toString('ascii'));

};