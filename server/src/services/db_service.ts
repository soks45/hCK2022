import * as mysql from 'mysql';
import { ConnectionConfig, QueryOptions } from 'mysql';

class DbService {
    private connection!: mysql.Connection;
    private inited = false;

    init(): void {
        if (this.inited) {
            return;
        }

        this.initConnection();
        this.inited = true;
    }

    format(sql: string, values: any[], stringifyObjects?: boolean, timeZone?: string): any {
        return mysql.format(sql, values, stringifyObjects, timeZone);
    }

    queryRaw(sql: string | QueryOptions, args?: any): Promise<any> {
        return this.query(sql, false, args);
    }

    queryJson(sql: string | QueryOptions, args?: any): Promise<any> {
        return this.query(sql, true, args);
    }

    queryTransaction(callback: ((_: any) => Promise<any>), sql: string | QueryOptions, args?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.beginTransaction((err) => {
                if (err) {
                    reject(err);
                }

                this.queryJson(sql, args)
                    .then((value) => {
                        callback(value)
                            .then((value) => {
                                this.connection.commit();
                                resolve(value);
                            })
                            .catch((err) => {
                                this.connection.rollback();
                                reject(err);
                            });
                    })
                    .catch((err) => {
                        this.connection.rollback();
                        reject(err);
                    });
            });
        });
    }

    private query(sql: string | QueryOptions, jsonResult: boolean, args?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const callback = (err: any, rows: any) => {
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

    private initConnection(): void {
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

    private getDbConfig(): ConnectionConfig {
        return <ConnectionConfig> {
            host: "localhost",
            port: 3306,
            user: "root",
            password: "root",
            database: "udb"
        };
    }
}

const instance = new DbService();

export { instance as DbService };
