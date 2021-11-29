const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const checkToken = require('../../auth/token_validation');
const token = checkToken.checkToken;

router.post('/', token, userController.create);
router.get('/', token, userController.getAllUsers);
router.get('/:id', token, userController.getUserById);
router.put('/', token, userController.updateUser);
router.delete('/:id', token, userController.deleteUser);
router.post('/login', userController.login);

module.exports = router;