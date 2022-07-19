const { options:optionsSqlite3 } = require('./../options/sqlite3')
const { options:optionsMariaDB } = require('./../options/mariaDB')

const knexChat = require('knex')(optionsSqlite3)
const knexProducts = require('knex')(optionsMariaDB)


const createTables =()=>{
    knexChat.schema.hasTable('chat').then(exists=>{
        if(!exists){
            knexChat.schema.createTable('chat', table=>{
                table.string('message')
                table.string('email')
                table.string('fecha')
            })
            .then(()=>console.log('create table chat'))
        }
    })
    knexProducts.schema.hasTable('product').then(exists=>{
        if(!exists){
            knexProducts.schema.createTable('product', table=>{
                table.increments('id')
                table.string('title')
                table.integer('price')
                table.string('url')
            })
            .then(()=>console.log('create table product'))
        }
    })
}

module.exports = createTables