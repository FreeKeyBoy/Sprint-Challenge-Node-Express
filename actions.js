
const actions = require('express').Router();
const actionModel = require('./data/helpers/actionModel')

//CRUD
//get
actions.get('/', (req,res) => {
    actionModel.get()
    .then(response => res.send(response))
    .error(err => res.send(err))
})

//get by id
actions.get('/:id', (req,res) => {
    actionModel.get(req.params.id)
    .then(response => res.send(response))
    .error(err => res.send(err))
})

//post
actions.post('/',(req,res) => {
    actionModel.insert(req.body)
    .then(response => res.send(response))
    .error(err => res.send(err))
})

//update
actions.put('/:id', (req,res) => {
    actionModel.update(req.params.id,req.body)
    .then(response => res.send(response))
    .error(err => res.sendStatus(500))
})

//delete
actions.delete('/:id', (req,res) => {
    actionModel.remove(req.params.id)
    .then(response => res.sendStatus(200))
    .error(err => res.sendStatus(500))
})

module.exports = actions; 