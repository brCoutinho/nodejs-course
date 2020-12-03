const express = require('express');

const server = express();

server.use(express.json());

const cursos = ['Node JS', 'Javascript', 'Delphi'];

//MIDDLEWARE GLOBAL -- PASSARÁ SEMPRE AQUI INDEPENDENTE DA ROTA CHAMADA
server.use((req, res, next) => { //FUNÇÃO ANÔNIMA
  console.log(`URL Chamada: ${req.url}`);

  return next();
})

function checkCurso(req, res, next) {
  if(!req.body.name){
    return res.status(400).json({ error:"Nome do curso é obrigatório!"});
  }

  return next();
}

function checkIndexCurso(req, res, next){
  const curso = cursos[req.params.index];

  if(!curso){
    return res.status(400).json({ error:"Curso não existe!"})
  }

  req.curso = curso;

  return next();
}

server.get('/cursos', (req, res) =>{
  return res.json(cursos);
})

server.get('/cursos/:index',checkIndexCurso, (req, res) =>{  
  return res.json(req.curso); 
});

//POST
server.post('/cursos', checkCurso, (req, res) =>{
  const {name} = req.body;
  cursos.push(name);

  return res.json(cursos);
})

//PUT
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) =>{
  const { index } = req.params;
  const { name } = req.body;

  cursos [index] = name;
  return res.json(cursos);
});

//DELETE
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);
  return res.json({message: 'Curso deletado com Sucesso'});
})

server.listen(3000);