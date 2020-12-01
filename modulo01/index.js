const express = require('express');

const server = express();

server.get('/curso', (req, res) =>{
  
  const nome = req.query.nome;
  
  return res.json({curso : 'Node JS'}); 
});

server.listen(3000);