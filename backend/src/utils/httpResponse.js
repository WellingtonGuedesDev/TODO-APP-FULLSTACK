const ok =  (body) => {
    return {
        success: true, 
        statusCode: 200, 
        message: body 
    }
}

const badRequest = (body) => {
    return {
        success: false, 
        statusCode: 400, 
        error: body
    }
}

const serverError = (body) => {
    return {
        success: false, 
        statusCode: 500, 
        error: body
    }
}

module.exports = { ok, badRequest, serverError }