document.body.addEventListener("htmx:afterRequest", function(event) {

    if(event.target.getAttribute("id") === "todo-form") {
        resetForm();
        atualizarListaTarefas();
    }

});

// resetar o formulario
function resetForm() {
    document.querySelector("#todo-form").reset();
}

// atualizar a lista
function atualizarListaTarefas() {
    htmx.ajax("GET", "http://localhost:3000/todos", "#todo-list")
}