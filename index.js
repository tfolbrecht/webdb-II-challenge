const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development)
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

const checkNewZoo = (req, res, next) => {
  if(!req.body.name){
    res.status(404).json('Please enter a valid name')
  } else {
    next();
  }
}

server.post('/api/zoos', checkNewZoo, (req, res) => {
  db('zoos').insert(req.body)
    .then(zoo => res.status(201).json(zoo))
    .catch(err => res.status(500).json(err))
})

server.get('/api/zoos', (req, res) => {
  db.select().from('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err))
})

server.get('/api/zoos/:id', (req, res) => {
  const id = req.params.id;

  db.select().where({id}).first().from('zoos')
    .then(zoo => {
      if(zoo) {
        res.status(200).json(zoo)
      } else {
        res.status(404).json({message: 'we cannot find that zoo!'})
      }
    })
    .catch(err => res.status(500).json(err))
})

server.delete('/api/zoos/:id', (req, res) => {
  const id = req.params.id;
  db('zoos').where('id', id).del()
    .then(del => {
      if(del) {
        res.status(204)
      } else {
        res.status(404).json({message: 'we cannot find that zoo'})
      }
    })
    .catch(err => res.status(500).json(err))
})

server.put('/api/zoos/:id', (req, res) => {
  const id = req.params.id;
  db('zoos').where({ id }).update(req.body)
    .then(zoo => {
      if(zoo){
        res.status(201).json({message: 'zoo updated'})
      }
      else {
        res.status(404).json({message: 'we cant find that zooo'})
      }
    })
    .catch(err => console.log(err))
})

const checkNewbear = (req, res, next) => {
  if(!req.body.name){
    res.status(404).json('Please enter a valid name')
  } else {
    next();
  }
}

server.post('/api/bears', checkNewbear, (req, res) => {
  db('bears').insert(req.body)
    .then(bear => res.status(201).json(bear))
    .catch(err => res.status(500).json(err))
})

server.get('/api/bears', (req, res) => {
  db.select().from('bears')
    .then(bears => res.status(200).json(bears))
    .catch(err => res.status(500).json(err))
})

server.get('/api/bears/:id', (req, res) => {
  const id = req.params.id;

  db.select().where({id}).first().from('bears')
    .then(bear => {
      if(bear) {
        res.status(200).json(bear)
      } else {
        res.status(404).json({message: 'we cannot find that bear!'})
      }
    })
    .catch(err => res.status(500).json(err))
})

server.delete('/api/bears/:id', (req, res) => {
  const id = req.params.id;
  db('bears').where('id', id).del()
    .then(del => {
      if(del) {
        res.status(204)
      } else {
        res.status(404).json({message: 'we cannot find that bear'})
      }
    })
    .catch(err => res.status(500).json(err))
})

server.put('/api/bears/:id', (req, res) => {
  const id = req.params.id;
  db('bears').where({ id }).update(req.body)
    .then(bear => {
      if(bear){
        res.status(201).json({message: 'bear updated'})
      }
      else {
        res.status(404).json({message: 'we cant find that bear'})
      }
    })
    .catch(err => console.log(err))
})




const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
