if ('serviceWorker' in navigator){
    window.addEventListener('load', () =>{
        navigator.serviceWorker.register('sw.js')
        .then( registro =>
            console.log('service worker registrado con exito', registro.scope)
        ) 
        .catch(err =>{
            console.log('no jalo', err)
        })
    })
}