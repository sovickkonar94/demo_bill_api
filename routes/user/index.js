const router = require('express').Router();
const { checkRegister } = require('../../middlewares/request_validation/user')
const UserController = require('../../controllers/users');


// validate the request body
router.post('/create-user',checkRegister,UserController.addUser);
router.post('/list-user',UserController.viewUser);



module.exports = router;