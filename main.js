let todos = [
    {
        id: 1,
        task: 'Do the dishes',
        complete: true
    },
    {
        id: 2,
        task: 'Get things done',
        complete: false
    }
];

const fillTodoList = (todos) => {
    const todoList = document.getElementById('todo-list');

    todoList.innerHTML = '';

    todos.map((todo) => {
        todoList.appendChild(createTodoLine(todo));
    })
}

const createTodoLine = (todo) => {
    const todoLI = document.createElement('li');

    todoLI.id = 'todo-' + todo.id;

    todoLI.appendChild(createTodoCheckBtn(todo));
    todoLI.appendChild(createTodoText(todo));
    todoLI.appendChild(createTodoDeleteBtn(todo));

    return todoLI;
}

const createTodoCheckBtn = (todo) => {
    const checkTodoBtn = document.createElement('button');
    checkTodoBtn.className = 'checkButton'

    checkTodoBtn.addEventListener('click', () => {toggleComplete(todo.id)})

    return checkTodoBtn;
}

const createTodoText = (todo) => {
    const todoText = document.createElement('p');
    todoText.textContent = todo.task;
    todoText.className = 'task-text';

    return todoText;
}

const createTodoDeleteBtn = (todo) => {
    const deleteTodoBtn = document.createElement('button');
    deleteTodoBtn.className = 'task-delete-button';

    deleteTodoBtn.addEventListener('click', () => {deleteTodo(todo.id)});

    return deleteTodoBtn;
}

const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id != id);

  const TodoList = document.getElementById('todo-list');
  const todo = document.getElementById('todo-' + id);

  TodoList.removeChild(todo);
}

const toggleComplete = (id) => {
  todos.forEach((todo) => {
    if(todo.id == id)
      todo.complete = !todo.complete;
  })
}

// Footer buttons configuration

const showAllBtn = document.getElementById('show-all-btn')
showAllBtn.addEventListener('click', () => {
  fillTodoList(todos);
});

const showActiveBtn = document.getElementById('show-active-btn')
showActiveBtn.addEventListener('click', () => {
  fillTodoList(todos.filter((todo) => !todo.complete));
});

const showCompleteBtn = document.getElementById('show-completed-btn')
showCompleteBtn.addEventListener('click', () => {
  fillTodoList(todos.filter((todo) => todo.complete));
});

fillTodoList(todos);