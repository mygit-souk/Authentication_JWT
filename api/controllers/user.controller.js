const { getUserId, getUser, updateUser, creteUser, deleteUser, getUserEmail } = require('../models/user.model');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    create: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        creteUser(body, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }
            return res.status(200).send({
                statusCode: 200,
                success: 'user created',
                data: result
            });
        });
    },
    getAllUsers: (req, res) => {
        getUser((err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: 'OK',
                data: result
            });
        });
    },

    getUserById: (req, res) => {
        const id = req.params.id;
        getUserId(id, (err, result) => {
            if (err) {
                console.log(err)
                return;
            }
            if (!result) {
                return res.status(404).send({
                    statusCode: 404,
                    message: 'Not Found!'
                });
            }
            return res.status(200).send({
                statusCode: 200,
                message: 'Ok',
                data: result
            });
        });
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            if (!result) {
                return res.status(404).send({
                    statusCode: 404,
                    success: 0,
                    message: 'Not Found!'
                })
            }
            return res.status(201).send({
                statusCode: 201,
                message: 'user updated'
                    // data: result
            })
        })
    },

    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser(id, (err, result) => {
            if (err) throw err;
            return res.status(200).send({
                statusCode: 200,
                message: 'user deleted',
                resultId: result
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserEmail(body.email, (err, result) => {
            if (err) throw err;
            if (!result) {
                return res.status(404).send({
                    statusCode: 404,
                    message: 'Invalid email or password'
                });
            }
            const data = compareSync(body.password, result.password);
            if (data) {
                result.password = undefined;
                const jsontoken = sign({ data: result }, 'qwe1234', {
                    expiresIn: "1d"
                });
                return res.status(200).send({
                    statusCode: 200,
                    message: 'login successfully',
                    token: jsontoken
                });
            } else {
                return res.status(404).send({
                    statusCode: 404,
                    message: 'Invalid email or password'
                });
            }
        });
    }
}