import { DatabaseConnection } from '../database/conn';

const db = DatabaseConnection.getConnection()

export default class UserService {
  
  static updateById(userData) {
    if (db) {
      console.log("userData:");
      console.log(userData.language);
      return new Promise((resolve, reject) =>
        db.transaction(
          tx => {
            tx.executeSql(
              `UPDATE user SET language = ? WHERE id = ?`,
              [userData?.language, userData?.id],
              (_, { rowsAffected }) => {
                console.log(`Updated ${rowsAffected} user language`);
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
          },
          () => {
            resolve("user updated successfully");
          }
        )
      );
    }
  }

  static findUser() {
    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(`select * from user`, [], (_, { rows }) => {
          // console.log(rows);
          resolve(rows._array);
        }), (sqlError) => {
            console.log(sqlError);
        }}, (txError) => {
        console.log(txError);
    }))
  }

}