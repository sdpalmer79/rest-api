
exports.buildErr = (err, domain) => {

    const {message} = err;

    if(message == null){
        message = 'Unknown error';
    }

    return {domain: domain, message: message};
}