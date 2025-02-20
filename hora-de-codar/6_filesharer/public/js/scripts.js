document.body.addEventListener("htmx:afterRequest", (event) => {

    // evento para redirecionar login e logout
    const xhr = event.detail.xhr;

    const redirect = xhr.getResponseHeader("HX-Redirect");

    if(redirect) {
        window.location.href = redirect;
    }

});