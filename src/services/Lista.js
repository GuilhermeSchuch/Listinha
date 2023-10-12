import { DatabaseConnection } from '../database/conn';

const db = DatabaseConnection.getConnection()

export default class ListaService {

  static addData(list) {
    if (db) {
      return new Promise((resolve, reject) =>
        db.transaction(
          tx => {
            // Insert the list first
            tx.executeSql(
              `insert into list (name) values (?)`,
              [list?.title],
              (_, { insertId }) => {
                console.log("id insert: " + insertId);
                // Now, insert the items within the same transaction
                for (let i = 0; i < list?.items?.length; i++) {
                  const item = list.items[i];
                  console.log(item.name);
                  tx.executeSql(
                    `insert into item (name, qty) values (?, ?)`,
                    [item.name, item.qty],
                    (_, { insertId: itemInsertId }) => {
                      // Insert into list_has_item using the last insert IDs
                      tx.executeSql(
                        `insert into list_has_item (list_id, item_id) values (?, ?)`,
                        [insertId, itemInsertId],
                        (_, { rowsAffected }) => {
                          console.log(`Inserted ${rowsAffected} rows into list_has_item`);
                        },
                        sqlError => {
                          console.log(sqlError);
                          reject(sqlError);
                        }
                      );
                    },
                    sqlError => {
                      console.log(sqlError);
                      reject(sqlError);
                    }
                  );
                }
                resolve(insertId);
              },
              sqlError => {
                console.log(sqlError);
                reject(sqlError);
              }
            );
          },
          sqlError => {
            console.log(sqlError);
            reject(sqlError);
          }
        )
      );
    }
  }
  

	static deleteData(id) {
		if (db) {
      return new Promise((resolve, reject) =>
        db.transaction(
          tx => {
            // Delete items associated with the list
            tx.executeSql(
              `DELETE FROM item WHERE id IN (SELECT item_id FROM list_has_item WHERE list_id = ?)`,
              [id],
              (_, { rowsAffected }) => {
                console.log(`Deleted ${rowsAffected} items`);
                
                // Delete the list
                tx.executeSql(
                  `DELETE FROM list WHERE id = ?`,
                  [id],
                  (_, { rowsAffected }) => {
                    console.log(`Deleted ${rowsAffected} list`);
                    resolve(rowsAffected);
                  },
                  sqlError => {
                    console.log(sqlError);
                    reject(sqlError);
                  }
                );
              },
              sqlError => {
                console.log(sqlError);
                reject(sqlError);
              }
            );
          },
          txError => {
            console.log(txError);
            reject(txError);
          }
        )
      );
		}
	}

  static updateById(Animal) {
    return new Promise((resolve, reject) =>db.transaction(tx => {
            tx.executeSql(`update ${table} set nome = ? where id = ?;`, [param.nome,param.id], () => {
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);

        }));
  }

  static findById(id) {
    if (db) {
      return new Promise((resolve, reject) =>
        db.transaction(
          (tx) => {
            tx.executeSql(
              `
              SELECT l.name AS list, i.id, i.name AS item, i.qty FROM list l 
              JOIN list_has_item lhi ON lhi.list_id = l.id 
              JOIN item i ON i.id = lhi.item_id WHERE l.id = ?;
              `,
              [id],
              (_, { rows }) => {
                const results = rows._array;
                console.log(`results:`);
                console.log(results);
                resolve(results);
              },
              (sqlError) => {
                console.log(sqlError);
                reject(sqlError);
              }
            );
          },
          (txError) => {
            console.log(txError);
            reject(txError);
          }
        )
      );
    }
  }

  static findList() {
    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(`select * from list`, [], (_, { rows }) => {
            resolve(rows)
        }), (sqlError) => {
            console.log(sqlError);
        }}, (txError) => {
        console.log(txError);
    }))


  }


}