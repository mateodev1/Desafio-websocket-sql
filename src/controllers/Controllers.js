const { options } = require('./../options/mariaDB')
const knex = require('knex')(options)

const createTable = (req,res)=>{
    knex.schema.createTable('chat', table=>{
        table.increments('id')
        table.string('title')
        table.integer('price')
        table.string('url')
    })
    .then(()=>console.log('create table'))
    res.send('create table')
}

const client = (req,res)=>{
        knex.from('product').select('*')
        .then(products=>{
            res.render('client',{products})
        })
}

module.exports = {client,createTable}