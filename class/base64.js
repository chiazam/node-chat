exports.tobase64 = (word => {

    return ((Buffer.from(word, 'utf8')).toString('base64'));

});

exports.frombase64 = (str => {

    return ((Buffer.from(str, 'base64')).toString('utf8'));

});