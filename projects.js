const projects = require('./data/helpers/projectModel')
const projectRouter = require('express').Router()

//CRUD
// get
projectRouter.get('/', (req,res) => {
    projects.get()
    .then(response => res.send(response))
    .error(err => res.send(err))
})

projectRouter.get('/actions/:id', (req,res) => {
    projects.getProjectActions(req.params.id)
    .then(response => res.send(response))
    .error(err => res.send(err))
})

//get by id
projectRouter.get('/:id', (req,res) => {
    projects.get(req.params.id)
    .then(response => res.send(response))
    .error(err => res.send(err))
})

// post
projectRouter.post('/',(req,res) => {
    projects.insert(req.body)
    .then(response => res.send(response))
    .error(err => res.send(err))
})

// update
projectRouter.put('/:id', (req,res) => {
    projects.update(req.params.id,req.body)
    .then(response => res.send(response))
    .error(err => res.sendStatus(500))
})

//delete
projectRouter.delete('/:id', (req,res) => {
    projects.remove(req.params.id)
    .then(response => res.sendStatus(200))
    .error(err => res.sendStatus(500))
})

module.exports = projectRouter; 