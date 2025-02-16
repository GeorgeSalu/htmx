document.body.addEventListener("htmx:afterRequest", function(event) {

    if(event.target.getAttribute("id") === "edit-form") {
        cancelEdit();
        atualizarListaTarefas();
    }

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

// excluir tarefa
function deletarTarefa(id) {

    if(confirm("Tem certeza que desja excluir a tarefa ??")) {
        htmx.ajax("DELETE", "http://localhost:3000/todos/" + id, "#msg");
        atualizarListaTarefas();
    }

}

// atualizar status da tarefas
function toggleTarefa(id) {

    htmx.ajax("PATCH", "http://localhost:3000/todos/" + id, "#msg");
    atualizarListaTarefas();

}

// editar tarefa
function editarTarefa(id, texto, dificuldade) {

    document.querySelector("#edit-id").value = id;
    document.querySelector("#edit-texto").value = texto;
    document.querySelector("#edit-dificuldade").value = dificuldade;

    document.querySelector("#edit-form").classList.remove("d-none");
    document.querySelector("#todo-form").classList.add("d-none");

}

// cancelar edicao
function cancelEdit() {

    document.querySelector("#edit-form").classList.add("d-none");
    document.querySelector("#todo-form").classList.remove("d-none");

}