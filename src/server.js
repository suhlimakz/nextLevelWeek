const express = require( "express" )  //usa o express para iniciar o servidor
const server = express() // executando a função express no server

//pegar o BD
const db = require("./database/db")

//configurar pasta public
server.use( express.static( "public" ) )

//habilitar o uso do raq.body na aplicação
server.use( express.urlencoded( { extended: true } ) )

//template engine
const nunjucks = require( "nunjucks" )
nunjucks.configure( "src/views", {
  express: server,
  noCache: true
})

// configurar caminhos da minha aplicação
// página inicial 
server.get( "/", ( req, res ) => { // req: requisição res: resposta
  return res.render( "index.html", { title: "Um titulo" } ) // __dirname variavel fixa diretorio q estou
})

//outras páginas associadas

server.get( "/create-point", ( req, res ) => {
  //req.query: query strings da nossa url
  
  return res.render( "create-point.html" )
})

server.post( "/savepoint", ( req, res ) => {
  //req.body: o corpo do formulário

  // inserir dados no BD
  const query = `
    INSERT INTO places (
      name,
      image,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `  
  const values = [
    req.body.name,
    req.body.image,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if(err) {
      console.log(err)
      return res.send( "Erro no cadastro!" ) //resposta para o usuário 
    }

    console.log("Cadastrado com sucesso")
    console.log(this)

    return res.render( "create-point.html", { saved: true } )
  }

  db.run(query, values, afterInsertData)

} )


server.get( "/search", ( req, res ) => {

  const search = req.query.search

  if(search == "") {
    //pesquisa vazia
    return res.render("search-results.html", {total:0})
  }

  // pegar os dados do BD
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if(err) {
      return console.log(err)
    }

    const total = rows.length 

    //mostrar a página html com os dados do BD
    return res.render( "search-results.html", { places: rows, total: total } )
  })
  
})

//ligar o servidor
server.listen(3000)  //faz o servidor ligar ao executar o arquivo
