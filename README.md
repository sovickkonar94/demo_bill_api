# API

## Tech
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [Mocha] - testing framework
- [chai] - assertion library
## Steps : RUN API

### 1.Clone the repo
### 2. Add .env file
```sh
PORT = 5000
DATABASE = tnode
```
### 3.Install the dependencies and devDependencies and start the server.
```sh
npm i
npx sequelize-cli db:migrate
npm run dev
```

## UNIT TEST
```sh
npm test
```

## END POINTS

### Users

- ADD USER

| METHOD | end point |
| ------ | ------ |
| POST  | [http://localhost:5000/api/user/create-user] |
```sh
{
    "first_name":"demo",
    "last_name":"user",
    "email":"demo@test.com",
    "phone_number":"8957894568"
}
```

- DISPLAY user

| METHOD | end point |
| ------ | ------ |
| POST | [http://localhost:5000/api/user/list-user] |
```sh
{
    "email":"demo@test.com",
}
```


### Cards

- #### Debit Payment

```sh
{
    "amount": "100.80",
    "currency":"USD",
    "type": "debitcard",
    "card": {
        "number": "4111111111111111",
        "expirationMonth": "10",
        "expirationYear": "2030",
        "cvv": "111"
    }
}
```
| METHOD | end point |
| ------ | ------ |
| PUT  | [http://localhost:5000/api/purchase/item] |

- #### Credit Payment
```sh
{
    "amount": "100.80",
    "currency":"USD",
    "type": "creditcard",
    "card": {
        "number": "5111111111111111",
        "expirationMonth": "10",
        "expirationYear": "2030",
        "cvv": "211"
    }
}
```
| METHOD | end point |
| ------ | ------ |
| PUT  | [http://localhost:5000/api/purchase/item] |

> Note: `create an user first`
