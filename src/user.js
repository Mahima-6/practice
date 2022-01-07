const mysql = require("mysql");
const Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbconfig = {
  host: "localhost",
  user: "root",
  password: "mahima",
  database: "bank_trans",
};

async function addUser(user) {
  const connection = mysql.createConnection(dbconfig);
  await connection.connectAsync();
  let sql = `insert into login (firstname,lastname) values(?,?)`;
  await connection.queryAsync(sql, [user.firstname, user.lastname]);
  await connection.endAsync();
}

let selectUser = async () => {
  const connection = mysql.createConnection(dbconfig);
  await connection.connectAsync();
  let sql = `select * from login`;
  let list = await connection.queryAsync(sql);
  //console.log(list);
  await connection.endAsync();
  return list;
};

//let user = { firstname: "shilpa", lastname: "shetty" };

//addUser(user);

// selectUser();

module.exports = { addUser, selectUser };
