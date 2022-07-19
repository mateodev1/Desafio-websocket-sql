const socket = io.connect()

const list = document.querySelector("#products")
const btnProduct = document.querySelector("#btn-product")
const title = document.querySelector("#title")
const price = document.querySelector("#price")
const url = document.querySelector("#url")

socket.on('product',product =>renderProduct(product))

btnProduct.addEventListener('click', e=>{
    e.preventDefault()
    const newProduct = {
        title:title.value,
        price:price.value,
        url:url.value
    }
    socket.emit('new-product',newProduct)
    return false
})

const renderProduct = (data)=>{
    limpiarHTML(list)
    data.forEach(data => {
        const { title , price , url } = data
        const productDiv = document.createElement('div')
        productDiv.innerHTML = `
            <div class="box">
                <h2>${title}</h2>
                <p>Precio:${price}</p>
                <img src='${url}' alt="">
            </div>
        `
        list.appendChild(productDiv)
    });
}

const message = document.querySelector("#message")
const divChat = document.querySelector("#chat")
const email = document.querySelector("#email")
const btnChat = document.querySelector("#btn-chat")

// Fecha

const newfecha = new Date().toISOString()

socket.on('chat',chat =>renderChat(chat))

btnChat.addEventListener('click', e=>{
    e.preventDefault()
    const newMessage = {
        message:message.value,
        email:email.value,
        fecha: new Date().toISOString()
    }
    socket.emit('new-message',newMessage)
    return false
})

const renderChat = chat=>{
    limpiarHTML(divChat)
    chat.forEach(newMessage => {
        const { email , message ,fecha } = newMessage
        const messageDiv = document.createElement('div')
        messageDiv.innerHTML = `
            <div>
                <strong style="color: blue;" >${email}</strong>[
                <span style="color: brown;">${fecha}</span>]:
                <em style="color: green;font-style: italic;">${message}</em>
            </div>
        `
        divChat.appendChild(messageDiv)
    });
    
}

const limpiarHTML=(element)=> {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

