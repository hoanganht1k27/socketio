function checkNull(x) {
    return (x != null && x != undefined && x != '')
}

function getFullPath(req) {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    return fullUrl
}

module.exports = {checkNull, getFullPath}