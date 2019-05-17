const mysql = require('mysql');

class database {
    open() {
        this.connection = mysql.createConnection({
            host: 'tt_telefonica.mysql.dbaas.com.br',
            user: 'tt_telefonica',
            password: 't3st3@v1v0',
            database: 'tt_telefonica'
        });
    }
    query(sql, args) {
        this.open();
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
            this.close();
        });
    }
    close() {
        this.connection.end();
    }
}

module.exports = new database;