# VEHICLE MANAGEMENT SYSTEM
>mobility and goods transport platform

## API DETAILS

### USER SIGNUP
> URL :  [http://localhost:8000/users/create](http://localhost:8000/users/create)

Request Body
```js
{
    name:"",
    passoword:"",
    email:"",
    city:"",
    phone:""
}
```
Description
| field | description | required |
|---- | ---- | ---- |
| name | user name | yes |
| passsword | user password | yes |
| email | user email address | yes |
| city | user city | no |
| phone | user phone number | yes |

Response 

```js
{
    "access_token":"",
    "timestamp":"",
    "expiredAt":""
}


PORT = 8000
DB_URL = 'mongodb://localhost:27017/'
DB_NAME= 'vms'
TOKEN_SECRET = 'B?E(H+MbQeThWmZq4t7w!z$C&F)J@NcRfUjXn2r5u8x/A?D*G-KaPdSgVkYp3s6v9y$B&E)H+MbQeThWmZq4t7w!z%C*F-JaNcRfUjXn2r5u8x/A?D(G+KbPeSgVkYp3'
TOKEN_SECRET_ADMIN = 'NcRfUjXn2r5u8x/A?D*G-KaPdSgVkYp3s6v9y$B&E)H+MbQeThWmZ'

TWILIO_EMAIL_API_KEY = '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'
TEMPLATE_DIR = 'E:/VMS-BACKEND/public/templetes/emailtemp.hbs'
EMAIL_SUBJECT = 'Reset password -VMS',

STATIC_IMAGE_PATH = 'http://127.0.0.1:8000/static/images/drivers/'
STATIC_DESTINATION = './public/images/drivers'
```
 ***
