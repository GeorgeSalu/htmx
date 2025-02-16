/*
evento de load
document.body.addEventListener("htmx:load", function(event) {
    console.log(event);

    console.log("carregou a pagina")
});
*/

document.body.addEventListener("htmx:beforeSwap", function(event) {
    console.log("antes do swap")
});

document.body.addEventListener("htmx:afterSwap", function(event) {
    console.log("depois do swap")
})