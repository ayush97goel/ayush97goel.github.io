// UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listener
loadEventListerner();


function loadEventListerner() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear task list
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks
  filter.addEventListener('keyup', filterTasks);


}

//get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    //create a list item element
    const li = document.createElement('li');

    //adding class 'collection-item'
    li.className = 'collection-item';

    // create Text Node and append to li
    li.appendChild(document.createTextNode(task));

    // create a link element to contain the icon
    const link = document.createElement('a');
    // add classes to the link
    link.className = "delete-item secondary-content"
    // add the remove icon inside link
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    //append link to li
    li.appendChild(link);

    // append list item to ul
    taskList.appendChild(li);
  });
}

function addTask(e) {
  // alert if the the tast input is empty
  if (taskInput.value === '') {
    alert('Please enter the Task!');
  }
  else {
    //create a list item element
    const li = document.createElement('li');

    //adding class 'collection-item'
    li.className = 'collection-item';

    // create Text Node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create a link element to contain the icon
    const link = document.createElement('a');
    // add classes to the link
    link.className = "delete-item secondary-content"
    // add the remove icon inside link
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    //append link to li
    li.appendChild(link);

    // append list item to ul
    taskList.appendChild(li);

    addTaskToLocalStorage(taskInput.value);
    // reset the task input
    taskInput.value = '';

    e.preventDefault();
  }
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure you want to delete the task?'))
      e.target.parentElement.parentElement.remove();
    removeTaskFromLocalStorage(e.target.parentElement.parentElement.textContent);
  }
}

function removeTaskFromLocalStorage(text) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task, index) {
    if (task === text) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {
  // taskList.innerHTML = '';

  // faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear all task form Local Stoarage
  clearAllTasksFromLocalStorage();
}

function clearAllTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function (task) {
      const item = task.firstChild.textContent.toLowerCase();
      if (item.indexOf(text) !== -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  )
}

function addTaskToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

}

