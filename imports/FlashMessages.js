
function showSuccessMessage(req, ptitle, pmsg){
    return req.flash({
        type: 'success',
        success: {title:ptitle ,msg:pmsg},
        redirect: null
    })
}

function showErrorMessage(req, ptitle, pmsg){
    return req.flash({
        type: 'error',
        error: {title:ptitle ,msg:pmsg},
        redirect: null
    })
}

function showTimeMessage(req, ptitle, pmsg, ptime){
    return req.flash({
        type: 'time',
        time: {title:ptitle ,msg:pmsg, time:ptime},
        redirect: null
    })
}
module.exports.showSuccessMessage = showSuccessMessage;
module.exports.showErrorMessage = showErrorMessage;
module.exports.showTimeMessage = showTimeMessage;