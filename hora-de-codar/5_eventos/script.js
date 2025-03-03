/*
    evento de load
    document.body.addEventListener("htmx:load", function(event) {
        console.log(event);

        console.log("carregou a pagina")
    });
*/

/*
    eventos de antes e depois do swap
    document.body.addEventListener("htmx:beforeSwap", function(event) {
        console.log("antes do swap")
    });

    document.body.addEventListener("htmx:afterSwap", function(event) {
        console.log("depois do swap")
    })
*/

/*
    eventos de antes e depois do swap
    document.body.addEventListener("htmx:beforeRequest", function(event) {
        console.log("antes do request")
    });

    document.body.addEventListener("htmx:afterRequest", function(event) {
        console.log("depois do request")
    })
*/

/*
    dispara depois de uma erro no servidor
    document.body.addEventListener("htmx:responseError", function(event) {
        alert("ocorreu um erro interno tente mas tarde")
    })
*/

/*
    interceptando requisicoes
    document.body.addEventListener("htmx:configRequest", function(event) {
        
        event.detail.headers["novo_token"] = "HSD*D2332222";

        event.detail.parameters["param1"] = "valor do param 1";
        event.detail.parameters["param2"] = "valor do param 2";

    })
*/

/*
    htmx.logger = function(elt, event, data) {
        
        console.log("evento htmx: ",event);
        console.log("elemento alvo: ",elt);
        console.log("detalhes do evento: ",data);

    }
*/

const customEventButton = document.querySelector("#customEventButton");

customEventButton.addEventListener("click", function() {
    htmx.trigger(customEventButton, "customEvent")
})

document.body.addEventListener("customEvent", function(event) {
    console.log("evento acionado")

    htmx.ajax("GET", "http://localhost:3000/customEvent", "#custom-event-response")
})