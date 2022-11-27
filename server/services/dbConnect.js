const mysql = require('mysql');


class DbService {
    connection;
    inited = false;

    init() {
        if (this.inited) {
            return;
        }

        this.initConnection();
        this.inited = true;
    }

    format(sql, values, stringifyObjects, timeZone) {
        return mysql.format(sql, values, stringifyObjects, timeZone);
    }

    query(sql, jsonResult, args) {
        return new Promise((resolve, reject) => {
            const callback = (err, rows) => {
                if (err) {
                    return reject(err);
                }
                const result = jsonResult ? JSON.parse(JSON.stringify(rows)) : rows;
                resolve(result);
            };
            if (typeof sql === 'string') {
                this.connection.query(sql, args, callback);
            } else {
                this.connection.query(sql, callback);
            }

        });
    }

    queryRaw (sql, args){
        console.log(sql)
        return this.query(sql,false,args)
    }

    initConnection() {
        const config = this.getDbConfig();
        this.connection = mysql.createConnection({
            ...config,
            multipleStatements: true
        });

        this.connection.connect((err) => {
            if (err) {
                console.error(`[DbService]: Failed to connect to database`);
                console.error(`${err.stack}`);
                throw err;
            }

            console.info(`[DbService]: Connected to database mysql://${config.host}:${config.port}/${config.database}`);
        });

        this.connection.on('error', (err) => {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                console.error(`[DbService]: connection to database lost`);
                this.initConnection();                         // lost due to either server restart, or a
            } else {                                      // connnection idle timeout (the wait_timeout
                console.error(`[DbService]: unexpected error\n ${err}`);
                throw err;                                  // server variable configures this)
            }
        });
    }

    getDbConfig() {
        return {
            host: "localhost",
            port: 3306,
            user: "root",
            password: "root",
            database: "udb"
        };
    }
}

module.exports = new DbService()