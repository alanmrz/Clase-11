let username
const ulMsg = document.querySelector('#ulMensajes')
const form = document.querySelector('form')
const input = document.querySelector('input')

// function iniciarSesion(){
    //     username='alan'
    
    // }
    
    // iniciarSesion()
    
    Swal.fire({
        title: 'AlanChat',
        input: 'text',
        text: 'Ingrese su nombre:',
        inputValidator: value => {
            return !value && 'debe ingresar un nombre!'
        },
        allowOutsideClick: false,
    }).then(result => {
        username = result.value
        document.querySelector('input')?.focus()
        startChat()
    })
    
    
    function startChat(){
        
    const socket = io({
        auth: {username}
    })
    form?.addEventListener('submit', e=>{
        e.preventDefault()
        sendMSG(username,input?.value)
        input.value = ''
    })
    
    
    function sendMSG(username, texto){
        
        socket.emit('mensaje',{
            username,
            texto
        })
    }
    
    socket.on('mensajes', msgs=>{
        
        ulMsg.innerHTML= ''
        for (const {username, texto} of msgs) {
            const liMSG = document.createElement('li')
            //console.log(texto);
            liMSG.innerHTML = `${username}: ${texto}`
            ulMsg?.appendChild(liMSG)
        }
        
    })

    socket.on('nuevoUsuario', nombreUsuario=>{
        Swal.fire({
            text: `${nombreUsuario} esta en linea`,
            toast: true,
            position: 'top-right'
        })
    })

}
    
    
    
    // setInterval(()=>{
    
//     const liMSG = document.createElement('li')
//     liMSG.innerHTML = "HELLO :D"
//     hello?.appendChild(liMSG)
// },1000);