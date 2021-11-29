const pool = require('../../config/database');

module.exports = {
    creteUser: (data, callback) => {
        pool.query(
            `INSERT INTO register(firstname, lastname, gender, email, password, phone)VALUES(?,?,?,?,?,?)`, [
                data.firstname,
                data.lastname,
                data.gender,
                data.email,
                data.password,
                data.phone
            ], (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results)
            }
        )
    },

    getUser: function(callBack) {
        pool.query(
            `SELECT * FROM register`, [], (err, results, fields) => {
                if (err) throw err;
                return callBack(null, results);
            }
        );
    },

    getUserId: (id, callback) => {
        pool.query(
            `SELECT id, firstname, lastname, gender, email, phone FROM register WHERE id= ?`, [id], (err, results, fields) => {
                if (err) throw err;
                return callback(null, results[0]);
            }
        )
    },

    updateUser: (data, callback) => {
        pool.query(
            `UPDATE register SET firstname=?, lastname=?, gender=?, email=?, password=?, phone=? WHERE id=?`, [
                data.firstname,
                data.lastname,
                data.gender,
                data.email,
                data.password,
                data.phone,
                data.id
            ], (err, results, fields) => {
                if (err) callback(err);
                return callback(null, results);
            }
        )
    },

    deleteUser: (id, callback) => {
        pool.query(
            `DELETE FROM register WHERE id =?`, [id],
            (err, results, fields) => {
                if (err) return callback(err);
                return callback(null, results[0]);
            }
        )
    },

    getUserEmail: (email, callback) => {
        pool.query(
            `SELECT * FROM register WHERE email =?`, [email],
            (err, results, fields) => {
                if (err) callback(err);
                return callback(null, results[0]);
            }
        )
    }

}