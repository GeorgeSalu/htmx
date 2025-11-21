document.body.addEventListener("htmx:afterRequest", function(event) {

    const xhr = event.datail.xhr;
    const redirectUrl = xhr.getResponseHeader("HX-Redirect");

    if(redirectUrl) {
        window.location.href = redirectUrl;
    }

})

document.body.addEventListener("htmx:afterRequest", async function(event) {
    
    if (event.target.getAttribute("id") === 'form-links') {
        document.querySelector("#form-links").reset()
        await fetchLinks()
    }

})


async function fetchLinks() {
    await htmx.ajax("GET", "http://localhost:3333/dashboard/links", "#list-links")
}

async function handleDeleteLink(id) {
    await htmx.ajax("DELETE", `http://localhost:3333/delete-link/${id}`, { swap: "none" })
    await fetchLinks()
}