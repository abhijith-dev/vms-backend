module.exports = function genarateError(code,res){
    let status = 500
    let errors = {}
    switch(code){
        case 1000:
            status =401
            errors.exception = `browser-id missing in header`
            errors.statuscode = 401
            errors.message = `Unauthorized Request`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1001:
            status =401
            errors.exception = `user-agent missing in header`
            errors.statuscode = 401
            errors.message = `Unauthorized Request`
            return res.status(status).send(errors)
        case 1002:
            status =401
            errors.exception = `access-token missing in header`
            errors.statuscode = 401
            errors.message = `Unauthorized Request`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1003:
            status =401
            errors.exception = `invalid access-token`
            errors.statuscode = 401
            errors.message = `Unauthorized Request`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1004:
            status =400
            errors.exception = `email address already exist`
            errors.statuscode = 400
            errors.message = `Bad Request`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1005:
            status =400
            errors.exception = `phone number already exist`
            errors.statuscode = 400
            errors.message = `Bad Request`
            errors.errorcode = code
            return res.status(status).send(errors) 
        case 1006:
            status =400
            errors.exception =`wallet details missing in header`
            errors.statuscode = 400
            errors.message = `Bad Request`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1007:
            status =400
            errors.exception =`no account found for this phone number/email`
            errors.statuscode = 400
            errors.message = `Bad Request`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1008:
            status =401
            errors.exception =`invalid password`
            errors.statuscode = 401
            errors.message = `Unauthorized Request`
            errors.errorcode = code
            return res.status(status).send(errors) 
        case 1009:
            status =404
            errors.exception =`user not found`
            errors.statuscode = 404
            errors.message = `Not Found`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1010:
            status =400
            errors.exception =`invalid field for update`
            errors.statuscode = 400
            errors.message = `Bad Request`
            errors.errorcode = code
            return res.status(status).send(errors)     

        default:
            status =500
            errors.exception = `internal server issue`
            errors.statuscode = 500
            errors.message = `Internal Server`
            errors.errorcode = code
            return res.status(status).send(errors)            
    }
}