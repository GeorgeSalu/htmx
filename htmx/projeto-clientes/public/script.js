document.addEventListener("htmx:configRequest", function(event) {

    if(event.detail.path === '/clientes' && event.detail.verb !== "get") {
        setTimeout(() => {
            document.querySelector("#toast").innerHTML = '';
        }, 4000)
    }

})