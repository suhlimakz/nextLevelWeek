//importação da dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que irá fazer operações no BD
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto de BD nas operações
//.serialize - sequencia de codigo

db.serialize(() => {
//   //criar tabela com comandos SQL
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       image TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//     );
//   `)

//   //inserir dados na tabela com comandos SQL
//   const query = `
//     INSERT INTO places (
//       name,
//       image,
//       address,
//       address2,
//       state,
//       city,
//       items
//     ) VALUES (?,?,?,?,?,?,?);
//   `  
//   const values = [
//     "Papersider",
//     "http://localhost:3000/img/2.jpg",
//     "Guilherme Gemballa,Jardim América",
//     "Nº 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Papéis e papelão"
//   ]

//   function afterInsertData(err) {
//     if(err) {
//       return console.log(err)
//     }

//     console.log("Cadastrado com sucesso")
//     console.log(this)
//   }

//   db.run(query, values, afterInsertData)
  
//   //consultar dados da tabela com comandos SQL
  db.all(`SELECT * FROM places`, function(err, rows) {
    if(err) {
      return console.log(err)
    }

    console.log("Aqui estão seus registros")
    console.log(rows)
  } )
  
//   //deletar um dado da tabela com comandos SQL
  // db.run(`DELETE FROM places WHERE id = ?`, [9], function(err, rows) {
  //   if(err) {
  //     return console.log(err)
  //   }

  //   console.log("Registro deletado com sucesso")
  //   console.log(rows)
  // } )

}) 