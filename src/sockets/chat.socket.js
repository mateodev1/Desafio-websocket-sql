const { options } = require('./../options/sqlite3')
const knex = require('knex')(options)

const socketsEventsChat = io =>{
    io.on('connection',socket =>{
        // io.sockets.emit('chat',chat)
        knex.from('chat').select('*')
            .then(chat=>{
                io.sockets.emit('chat',chat)
                socket.emit('chat',chat)
            })
        // console.log(socket.id)
        socket.on('new-message',newMessage=>{
            knex('chat').insert(newMessage)
                .then(()=>knex.from('chat').select('*')
                .then(chat=>{
                    io.sockets.emit('chat',chat)
                    socket.emit('chat',chat)
                }))
        })
    })
}

module.exports = socketsEventsChat