
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

module.exports.showSuccessMessage = showSuccessMessage;
module.exports.showErrorMessage = showErrorMessage;