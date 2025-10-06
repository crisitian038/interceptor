// Interceptar requests
self.addEventListener('fetch', event => {
    // Solo interceptar la imagen de la moto
    if (event.request.url.includes('moto.webp')) {
        console.log('Service Worker: Interceptando imagen de moto');
        
        event.respondWith(
            // Primero intentar con la imagen de sustitución (viejito.jpeg)
            fetch('/img/viejito.jpeg')
                .then(response => {
                    if (response.ok) {
                        console.log('Service Worker: Imagen reemplazada por viejito (sustitución)');
                        return response;
                    } else {
                        // Si la respuesta no es OK, lanzar error para ir al catch
                        throw new Error('Sustitución no disponible');
                    }
                })
                .catch(error => {
                    console.log('Service Worker: Error al cargar sustitución, usando genérica:', error);
                    // Si falla la sustitución, intentar con la imagen genérica
                    return fetch('/img/pato.webp')
                        .then(response => {
                            if (response.ok) {
                                console.log('Service Worker: Imagen reemplazada por genérica');
                                return response;
                            } else {
                                // Si falla la genérica, usar la original
                                throw new Error('Genérica no disponible');
                            }
                        })
                        .catch(error => {
                            console.log('Service Worker: Error al cargar genérica, usando original:', error);
                            return fetch(event.request);
                        });
                })
        );
    }
    // Dejar pasar todos los demás requests normalmente
});