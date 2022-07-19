const { Router } = require('express')
const router = Router()
const {client,createTable} = require('../controllers/Controllers')
const { options } = require('./../options/sqlite3')
const knex = require('knex')(options)

router.get("/",client)

router.get('/create',createTable)

router.get('/createchat',(req,res)=>{
    knex.schema.createTable('chat', table=>{
        table.string('message')
        table.string('email')
        table.string('fecha')
    })
    .then(()=>res.send('create table'))
})

module.exports = router