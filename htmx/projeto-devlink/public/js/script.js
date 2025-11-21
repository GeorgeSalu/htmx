document.body.addEventListener("htmx:afterRequest", function(event) {

    const xhr = event.datail.xhr;
    const redirectUrl = xhr.getResponseHeader("HX-Redirect");

    if(redirectUrl) {
        window.location.href = redirectUrl;
    }

})

document.body.addEventListener("htmx:afterRequest", async function(event) {
    
    const divToast = document.querySelector("#toast")

    // verificar se tem algo dentro do toast
    if( divToast.textContent.trim() !== "") {
        setTimeout(() => {
            divToast.classList.add("hidden")
        }, 3000)
    }

    if (event.target.getAttribute("id") === 'form-links') {
        document.querySelector("#form-links").reset()
        await fetchLinks()
    }

})

document.body.addEventListener("htmx:responseError", function(event) {

    const divToast = document.querySelector("#toast")
    divToast.classList.remove("hidden")

    if(event.detail.xhr.status === 400) {
        return divToast.innerHTML = `${event.detail.xhr.responseText}`
    }

    if(event.detail.xhr.status === 401) {
        return divToast.innerHTML = `${event.detail.xhr.responseText}`
    }

    if(event.detail.xhr.status === 500) {
        return divToast.innerHTML = `${event.detail.xhr.responseText}`
    }

})

async function fetchLinks() {
    await htmx.ajax("GET", "http://localhost:3333/dashboard/links", "#list-links")
}

async function handleDeleteLink(id) {
    await htmx.ajax("DELETE", `http://localhost:3333/delete-link/${id}`, { swap: "none" })
    await fetchLinks()
}