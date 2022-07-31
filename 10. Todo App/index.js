const newTodoInput = document.getElementById("new-todo");
const todos = document.getElementById("todos");

newTodoInput.addEventListener("keydown", e => {
    if (e.key != "Enter") return;
    
    let todo = e.target.value;

    if (todo.trim() == "") return;

    let todoElement = document.createElement("li");

    let doneCheckbox = document.createElement("input");
    doneCheckbox.classList.add("done-checkbox");
    doneCheckbox.type = "checkbox";

    doneCheckbox.addEventListener("input", e => {
        todoElement.classList.toggle("done", e.target.checked);
    });

    todoElement.appendChild(doneCheckbox);

    let existingTodo = document.createElement("input");
    existingTodo.classList.add("existing-todo");
    existingTodo.value = todo;

    todoElement.appendChild(existingTodo);

    if (todos.children.length == 0) todos.appendChild(todoElement);
    else todos.insertBefore(todoElement, todos.firstElementChild);
});