import { DatabaseConnection } from '../database/conn';

const db = DatabaseConnection.getConnection()

export default class ListaService {

  static addData(list) {
    if (db) {
      console.log("chegou ne");
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

  static updateById(listData) {
    if (db) {
      return new Promise((resolve, reject) =>
        db.transaction(
          tx => {
            // Update the list name in the 'list' table
            console.log("primeiro:");
            console.log(listData);
            tx.executeSql(
              `UPDATE list SET name = ? WHERE id = ?`,
              [listData[0]?.title, listData[0]?.id],
              (_, { rowsAffected }) => {
                console.log(`Updated ${rowsAffected} list name`);
              },
              sqlError => {
                console.log(sqlError);
                reject(sqlError);
              }
            );
            // console.log("segundo:")
            // console.log(listData);
            // Iterate through the listData array to update items
            listData[0]?.items?.forEach(itemData => {
              // Update item name and quantity in the 'item' table
              console.log("segundo:");
              console.log(itemData);
              tx.executeSql(
                `UPDATE item SET name = ?, qty = ? WHERE id = ?`,
                [itemData?.name, itemData?.qty, itemData?.id],
                (_, { rowsAffected }) => {
                  console.log(`Updated ${rowsAffected} item(s)`);
                },
                sqlError => {
                  console.log(sqlError);
                  reject(sqlError);
                }
              );
            });
          },
          txError => {
            console.log(txError);
            reject(txError);
          },
          () => {
            resolve("List and items updated successfully");
          }
        )
      );
    }
  }

  static findById(id) {
    if (db) {
      return new Promise((resolve, reject) =>
        db.transaction(
          (tx) => {
            tx.executeSql(
              `
              SELECT l.id AS listId, l.name AS list, i.id, i.name AS item, i.qty FROM list l 
              JOIN list_has_item lhi ON lhi.list_id = l.id 
              JOIN item i ON i.id = lhi.item_id WHERE l.id = ?;
              `,
              [id],
              (_, { rows }) => {
                const results = rows._array;
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
          // console.log(rows);
          resolve(rows);
        }), (sqlError) => {
            console.log(sqlError);
        }}, (txError) => {
        console.log(txError);
    }))
  }

}