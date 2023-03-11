let todos = [
    {
        id: 1,
        task: 'do the dishes'
    },
    {
        id: 2,
        task: 'get things done'
    }
];

const fillTodoList = (todos) => {
    const TodoList = document.getElementById('todo-list');

    todos.map((todo) => {
        let todoLI = document.createElement('li');

        todoLI.textContent = todo.task; 

        TodoList.appendChild(todoLI);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    fillTodoList(todos);
});