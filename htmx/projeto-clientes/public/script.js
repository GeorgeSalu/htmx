document.addEventListener("htmx:afterRequest", async function(event) {

    if(event.target.getAttribute("id") === 'form-clientes') {
        await fetchClientes();
        document.querySelector("#form-clientes").reset();
    }

})

async function fetchClientes() {
    await htmx.ajax("GET", "http://localhost:3333/clientes", "#lista-clientes")
}

async function handleDelete(id) {
    await htmx.ajax("DELETE", `http://localhost:3333/clientes/${id}`, { swap: "none" })
    await fetchClientes();
}


async function handleEdit(id, nome, email, cargo, status) {
    
    document.querySelector("#id-cliente").value = id
    document.querySelector("#edit-nome").value = nome;
    document.querySelector("#edit-email").value = email;
    document.querySelector("#edit-cargo").value = cargo;
    document.querySelector("#edit-status").checked = status === 'true' ? true : false

    document.querySelector("#form-edit-clientes").classList.remove("hidden")
    document.querySelector("#form-clientes").classList.add("hidden")

}


function handleCancelEdit() {
    document.querySelector("#form-edit-clientes").classList.add("hidden")
    document.querySelector("#form-clientes").classList.remove("hidden")

}


document.addEventListener("htmx:configRequest", function(event) {

    // intercepta as requisicoes para rota /clientes que seja diferentes do metodo get
    if(event.detail.path === '/clientes' && event.detail.verb !== "get") {
        setTimeout(() => {
            document.querySelector("#toast").innerHTML = '';
        }, 2000)
    }

})