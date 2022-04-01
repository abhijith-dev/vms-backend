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
        case 1011:
            status =404
            errors.exception =`wallet not found for this user`
            errors.statuscode = 404
            errors.message = `Not Found`
            errors.errorcode = code
            return res.status(status).send(errors) 
        case 1012:
            status =400
            errors.exception =`old password is invalid`
            errors.statuscode = 400
            errors.message = `Bad Request`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1013:
            status =406
            errors.exception =`invalid verification code or expired`
            errors.statuscode = 406
            errors.message = `Not Acceptable`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1014:
            status =503
            errors.exception =`email templete issue`
            errors.statuscode = 503
            errors.message = `Service Unavailable`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1015:
            status =503
            errors.exception =`unable to send email`
            errors.statuscode = 503
            errors.message = `Service Unavailable`
            errors.errorcode = code
            return res.status(status).send(errors)     
        case 1016:
            status =401
            errors.exception =`admin-token missing in header`
            errors.statuscode = 401
            errors.message = `Unauthorized Request`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1017:
            status =401
            errors.exception =`this role don't have priviladge`
            errors.statuscode = 503
            errors.message = `Unauthorized Request`
            errors.errorcode = code
            return res.status(status).send(errors) 
        case 1018:
            status =401
            errors.exception =`invalid admin token or expired`
            errors.statuscode = 401
            errors.message = `Unauthorized Request`
            errors.errorcode = code
            return res.status(status).send(errors) 
        case 1019:
            status =404
            errors.exception =`no vehicle found for this id`
            errors.statuscode = 404
            errors.message = `Not Found`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1020:
            status =404
            errors.exception =`no driver found for this id`
            errors.statuscode = 404
            errors.message = `Not Found`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1021:
            status =400
            errors.exception =`error while uploading image`
            errors.statuscode = 400
            errors.message = `Bad Request`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1022:
            status =400
            errors.exception =`error while uploading image`
            errors.statuscode = 400
            errors.message = `Bad Request`
            errors.errorcode = code
            return res.status(status).send(errors)
        case 1023:
            status =400
            errors.exception =`error while updating image URL`
            errors.statuscode = 400
            errors.message = `Bad Request`
            errors.errorcode = code
            return res.status(status).send(errors)   
        case 1024:
            status =400
            errors.exception =`driver or vehicle already mapped`
            errors.statuscode = 400
            errors.message = `Bad Request`
            errors.errorcode = code
            return res.status(status).send(errors)  
        case 1025:
            status =400
            errors.exception =`driver or vehicle not yet mapped`
            errors.statuscode = 400
            errors.message = `Bad Request`
            errors.errorcode = code
            return res.status(status).send(errors)   
        case 1026:
            status =400
            errors.exception =`fuel limit exceeded`
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