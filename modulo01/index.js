const express = require('express');

const server = express();

server.use(express.json());

const cursos = ['Node JS', 'Javascript', 'Delphi'];

server.get('/cursos', (req, res) =>{
  return res.json(cursos);
})

server.get('/cursos/:index', (req, res) =>{
  
  const { index } = req.params;
  
  return res.json(cursos[index]); 
});

//POST
server.post('/cursos', (req, res) =>{
  const {name} = req.body;
  cursos.push(name);

  return res.json(cursos);
})

//PUT
server.put('/cursos/:index', (req, res) =>{
  const { index } = req.params;
  const { name } = req.body;

  cursos [index] = name;
  return res.json(cursos);
});

//DELETE
server.delete('/cursos/:index', (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);
  return res.json({message: 'Curso deletado com Sucesso'});
})

server.listen(3000);