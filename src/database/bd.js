import { DatabaseConnection } from './conn'

var db = null
export default class DatabaseInit {

    constructor() {
        db = DatabaseConnection.getConnection()
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
        console.log('Foreign keys turned on')
    );
        this.InitDb()
    }
    InitDb() {
        var sql = [
					// `DROP TABLE IF EXISTS list;`,
					// `DROP TABLE IF EXISTS item;`,
					// `DROP TABLE IF EXISTS list_has_item;`,
					
					`CREATE TABLE IF NOT EXISTS list (
						id INTEGER PRIMARY KEY AUTOINCREMENT,
						name TEXT
					);`,
					
					`CREATE TABLE IF NOT EXISTS item (
							id INTEGER PRIMARY KEY AUTOINCREMENT,
							name TEXT,
							qty INTEGER
					);`,
					
					`CREATE TABLE IF NOT EXISTS list_has_item (
							list_id INTEGER,
							item_id INTEGER,
							FOREIGN KEY (list_id) REFERENCES list(id),
							FOREIGN KEY (item_id) REFERENCES item(id)
					);`
        ];

        db.transaction(
            tx => {
                for (var i = 0; i < sql.length; i++) {
                    console.log("execute sql : " + sql[i]);
                    tx.executeSql(sql[i]);
                }
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("transaction complete call back ");
            }
        );
    }

}