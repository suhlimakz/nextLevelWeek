const express = require( "express" )  //usa o express para iniciar o servidor
const server = express() // executando a função express no server

//configurar pasta public
server.use( express.static( "public" ) )

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

server.get( "/create-point", ( req, res ) => { // req: requisição res: resposta
  return res.render( "create-point.html" ) // __dirname variavel fixa diretorio q estou
})

server.get( "/search", ( req, res ) => { // req: requisição res: resposta
  return res.render( "search-results.html" ) // __dirname variavel fixa diretorio q estou
})

//ligar o servidor
server.listen(3000)  //faz o servidor ligar ao executar o arquivo
