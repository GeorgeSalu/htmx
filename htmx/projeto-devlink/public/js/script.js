document.body.addEventListener("htmx:afterRequest", function(event) {

    const xhr = event.datail.xhr;
    const redirectUrl = xhr.getResponseHeader("HX-Redirect");

    if(redirectUrl) {
        window.location.href = redirectUrl;
    }

})