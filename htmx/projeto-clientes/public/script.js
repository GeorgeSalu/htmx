document.addEventListener("htmx:configRequest", function(event) {

    // intercepta as requisicoes para rota /clientes que seja diferentes do metodo get
    if(event.detail.path === '/clientes' && event.detail.verb !== "get") {
        setTimeout(() => {
            document.querySelector("#toast").innerHTML = '';
        }, 2000)
    }

})