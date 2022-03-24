# VEHICLE MANAGEMENT SYSTEM
>mobility and goods transport platform

## API DETAILS

### USER SIGNUP
> [http://localhost:8000/users/create](http://localhost:8000/users/create)

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
```
 ***
