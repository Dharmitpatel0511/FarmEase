

const chatSocket = (io) => {
    io.on("connection", (socket) => {
        console.log('socket is connected', socket.id)
        socket.on('join', ({room}) => {
            socket.join(room)
            console.log(`${socket.id} has joined room ${room}`)
        })

        socket.on('leave', ({room}) => {
            socket.leave(room)
            console.log(`${socket.id} has left room ${room}`)
        })
        
        socket.on('sendMessage', ({roomId, sender, message}) => {
            socket.to(roomId).emit('receiveMessage', {sender, message})
            console.log({sender, message, roomId})
        })
    })
}

export default chatSocket;