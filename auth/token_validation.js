const e = require('express');
const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, netx) => {
        let token = req.get('authorization');
        if (token) {
            token = token.slice(7);
            verify(token, 'mysecret1234', (err, decoded) => {
                if (err) {
                    res.status(404).send({
                        statusCode: 404,
                        message: 'Invalid token'
                    });
                } else {
                    netx();
                }
            });
        } else {
            res.status(200).send({
                statusCode: 200,
                message: 'Access denied unauthorized user'
            });
        }
    }
}