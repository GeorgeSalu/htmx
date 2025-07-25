// htmx:afterRequest evento depois de um request
document.addEventListener("htmx:afterRequest", function(event) {
    
    if(event.target.id === 'busca-dados') {
        const response = JSON.parse(event.detail.xhr.responseText)
        
        const userDiv = document.querySelector("#dados-user")

        let htmlDiv = ""

        response.forEach( user => {
            htmlDiv += `
                <p>Id: ${user.id}</p>
                <p>Nome: ${user.name}</p>
                <p>Email: ${user.email}</p>
                <br/>
            `
        })

        userDiv.innerHTML = htmlDiv;

    }

})

// htmx:load evento de load da pagina
document.addEventListener("htmx:load", function(event) {
    //console.log(event)
})

// htmx:responseError evento que ocorre quando uma request lanca um erro
document.addEventListener("htmx:responseError", function(event) {
    //console.log(event)

    const div = document.querySelector("#result-error")

    if(event.detail.xhr.status === 400) {
        return div.innerHTML = `<strong style='color: red;'>${event.detail.xhr.responseText}</strong>`
    }

    if(event.detail.xhr.status === 500) {
        return div.innerHTML = `<strong style='color: blue;'>${event.detail.xhr.responseText}</strong>`
    }

    if(event.detail.xhr.status === 401) {
        return div.innerHTML = `<strong style='color: brown;'>${event.detail.xhr.responseText}</strong>`
    }
})

document.addEventListener("htmx:configRequest", function(event) {
    console.log(event)

    // incluindo um token na request
    event.detail.headers["token"] = "eadesrt331fs"

    // incluindo um parameter na request
    event.detail.parameters["nome"] = "sujeito programador"


    if(event.detail.path === '/detalhes') {
        alert("chamou a /detalhes")
    }
})