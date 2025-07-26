document.addEventListener("htmx:afterRequest", async function(event) {

    if(event.target.getAttribute("id") === 'form-clientes') {
        await fetchClientes();
    }

})

async function fetchClientes() {
    await htmx.ajax("GET", "http://localhost:3333/clientes", "#lista-clientes")
}


document.addEventListener("htmx:configRequest", function(event) {

    // intercepta as requisicoes para rota /clientes que seja diferentes do metodo get
    if(event.detail.path === '/clientes' && event.detail.verb !== "get") {
        setTimeout(() => {
            document.querySelector("#toast").innerHTML = '';
        }, 2000)
    }

})