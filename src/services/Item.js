import { DatabaseConnection } from '../database/conn';

const db = DatabaseConnection.getConnection()

export default class ItemService {
  
	// static deleteData(itemId) {
	// 	if (db) {
  //     return new Promise((resolve, reject) =>
  //       db.transaction(
  //         tx => {
  //           tx.executeSql(
  //             `DELETE FROM item WHERE id  = ?;`,
  //             [itemId],
  //             (_, { rowsAffected }) => {
  //               console.log(`Deleted ${rowsAffected} items`);
  //             },
  //             sqlError => {
  //               console.log(sqlError);
  //               reject(sqlError);
  //             }
  //           );
  //         },
  //         txError => {
  //           console.log(txError);
  //           reject(txError);
  //         }
  //       )
  //     );
	// 	}
	// }

  static deleteData(itemId) {
		if (db) {
      return new Promise((resolve, reject) =>
        db.transaction(
          tx => {
            tx.executeSql(
              `DELETE FROM item WHERE id  = ?;`,
              [itemId],
              (_, { rowsAffected }) => {
                console.log(`Deleted ${rowsAffected} items`);
                resolve(rowsAffected);
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

}