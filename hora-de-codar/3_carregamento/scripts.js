document.body.addEventListener("htmx:afterRequest", function(event) {

    if(event.target.id === 'load-user-data') {
        
        //console.log(event.detail.xhr.responseText);
        const response = JSON.parse(event.detail.xhr.responseText);

        const userDataDiv = document.querySelector('#user-data-2');

        userDataDiv.innerHTML = `
            <p>Nome: ${response.name}</p>
            <p>Idade: ${response.age}</p>
            <p>Localizacao: ${response.location}</p>
        `

    }

})