const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


// user
// router.post('/register', UserController.register);
router.post('users/login', UserController.login);

router.get('/user/list', UserController.get);
router.post('/users/add', UserController.create);
router.post('/user/base64/add', UserController.base64);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);
module.exports = router;