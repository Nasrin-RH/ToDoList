/*const day=document.getElementById("day");
let options={
    weekday:"long",
    month:"short",
    day:"numeric"
};
let today=new Date();
day.innerHTML=today.toLocaleDateString("en-US",options);
  */
let todoItems = [];

function renderTodo(todo) {
    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));

    const list = document.querySelector('.js-todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);
   
    if (todo.deleted) {
     
      item.remove();

    if (todoItems.length === 0) list.innerHTML = '';
      return
    }
  
    const isChecked = todo.checked ? 'done': '';
    const node = document.createElement("li");
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
      <i class="fas fa-trash-alt"></i>
      </button>
    `;
  
    if (item) {
      list.replaceChild(node, item);
    } else {
      list.append(node);
    }
}

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}
function toggleDone(key) {
   
    const index = todoItems.findIndex(item => item.id === Number(key));
    
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}

function deleteTodo(key) {
    
    const index = todoItems.findIndex(item => item.id === Number(key));
   
    const todo = {
      deleted: true,
      ...todoItems[index]
    };
    
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}


const form = document.querySelector('.js-form');

form.addEventListener('submit', event => {
  
  event.preventDefault();
  
  const input = document.querySelector('.js-todo-input');

 
  const text = input.value.trim();
 var regx=/^[a-zA-Z]/;
  if (text !== '' ) {
    if(regx.test(text)) {
    addTodo(text);
    input.value = '';
    input.focus();
  }
  else
  {
   alert("input starts with letter");
  }
}
});

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
}

 
if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
}
});
document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
      todoItems = JSON.parse(ref);
      todoItems.forEach(t => {
        renderTodo(t);
      });
    }
});
























