import { DatabaseConnection } from '../database/conn';

const db = DatabaseConnection.getConnection()

export default class ListaService {

	static addData(list) {
		if(db){
			return new Promise((resolve, reject) =>
				db.transaction(
						tx => {
								tx.executeSql(
										`insert into list (name) values (?)`,
										[list?.title],
										(_, { insertId }) => {
												console.log("id insert: " + insertId);
												resolve(insertId);
										},
										sqlError => {
												console.log(sqlError);
												reject(sqlError);
										}
								);
						},
						tx => {
								// Insert list items and create associations in a single transaction
								for (var i = 0; i < list?.items?.length; i++) {
									console.log(list?.items[i]?.name);
										tx.executeSql(
												`insert into item (name, qty) values (?, ?)`,
												[list?.items[i]?.name, list?.items[i]?.qty],
												(_, { insertId }) => {
														// Insert into list_has_item using the last insert IDs
														tx.executeSql(
																`insert into list_has_item (list_id, item_id) values (?, ?)`,
																[insertId, insertId],
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
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where id=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);

        }));
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