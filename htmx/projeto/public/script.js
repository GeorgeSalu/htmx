document.addEventListener("htmx:afterRequest", function(event) {
    
    if(event.target.id === 'busca-dados') {
        const response = JSON.parse(event.detail.xhr.responseText)
        
        const userDiv = document.querySelector("#dados-user")

        let htmlDiv = ""

        response.forEach( user => {
            htmlDiv += `
                <p>Nome: ${user.name}</p>
                <p>Nome: ${user.email}</p>
                <br/>
            `
        })

        userDiv.innerHTML = htmlDiv;

    }

})