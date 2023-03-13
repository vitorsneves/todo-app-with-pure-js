let todos = [
    {
        id: 1,
        task: 'Do the dishes',
        complete: false
    },
    {
        id: 2,
        task: 'Get things done',
        complete: false
    }
];

let showWhichTasks = 'all';

const fillTodoList = () => {
    const todoList = document.getElementById('todo-list');

    todoList.innerHTML = '';

    const todosToShow = getTodosToShow();

    todosToShow.map((todo) => {
        todoList.appendChild(createTodoLine(todo));
    })

    updateActiveItemsCount();
}

const getTodosToShow = () => {
  if(showWhichTasks == 'all')
    return todos;

  if(showWhichTasks == 'active')
    return todos.filter((todo) => !todo.complete);

  if(showWhichTasks == 'complete')
    return todos.filter((todo) => todo.complete);
}

const updateActiveItemsCount = () => {
  const numOfActiveItems = todos.filter((todo) => !todo.complete).length

  console.log(numOfActiveItems + 'items left')
  
  const numOfActiveItemsText = document.getElementById('active-items-count');
  numOfActiveItemsText.innerText = numOfActiveItems + ' items left';
}

const createTodoLine = (todo) => {
    const todoLI = document.createElement('li');

    todoLI.id = 'todo-' + todo.id;

    todoLI.appendChild(createTodoCheckBtn(todo));
    todoLI.appendChild(createTodoText(todo));
    todoLI.appendChild(createTodoDeleteBtn(todo));

    if(todo.complete)
      todoLI.classList.add('completed-task');

    return todoLI;
}

const createTodoCheckBtn = (todo) => {
    const checkTodoBtn = document.createElement('button');
    checkTodoBtn.className = 'check-button';

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
    deleteTodoBtn.classList.add('transparent-btn');

    deleteTodoBtn.addEventListener('click', () => {deleteTodo(todo.id)});

    return deleteTodoBtn;
}

const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id != id);

  const TodoList = document.getElementById('todo-list');
  const todo = document.getElementById('todo-' + id);

  TodoList.removeChild(todo);
  updateActiveItemsCount();
}

const toggleComplete = (id) => {
  todos.forEach((todo) => {
    if(todo.id == id)
      todo.complete = !todo.complete;
  })

  updateActiveItemsCount();
  fillTodoList();
}

// Form configuration

const addNewTodo = (e) => {
  e.preventDefault();

  const taskDescriptionField = document.getElementById('task-description');

  todos.push({
    id: getUniqueId(),
    task: taskDescriptionField.value,
    complete: false
  });

  taskDescriptionField.value = '';

  fillTodoList();
}

const getUniqueId = () => {
  const maxId = todos.length > 0 
    ? Math.max(...todos.map((todo) => todo.id))
    : 0;

  return maxId + 1;
}

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', addNewTodo);

// Footer buttons configuration

const showAllBtn = document.getElementById('show-all-btn')
showAllBtn.addEventListener('click', () => {
  showWhichTasks = 'all';
  fillTodoList();

  unselectAllFilterButtons();
  showAllBtn.classList.add('selected-btn');
});

const showActiveBtn = document.getElementById('show-active-btn')
showActiveBtn.addEventListener('click', () => {
  showWhichTasks = 'active';
  fillTodoList();

  unselectAllFilterButtons();
  showActiveBtn.classList.add('selected-btn');
});

const showCompleteBtn = document.getElementById('show-completed-btn')
showCompleteBtn.addEventListener('click', () => {
  showWhichTasks = 'complete';
  fillTodoList();

  unselectAllFilterButtons();
  showCompleteBtn.classList.add('selected-btn');
});

const unselectAllFilterButtons = () => {
  const showAllBtn = document.getElementById('show-all-btn');
  showAllBtn.classList.remove('selected-btn');

  const showActiveBtn = document.getElementById('show-active-btn');
  showActiveBtn.classList.remove('selected-btn');

  const showCompleteBtn = document.getElementById('show-completed-btn');
  showCompleteBtn.classList.remove('selected-btn');
};

// Clear completed tasks

const clearComplete = () => {
  todos = todos.filter((todo) => !todo.complete);
  fillTodoList();
}

const clearCompleteBtn = document.getElementById('clear-completed-btn');
clearCompleteBtn.addEventListener('click', clearComplete);

fillTodoList();