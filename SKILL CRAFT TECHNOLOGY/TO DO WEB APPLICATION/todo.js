const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskList = document.getElementById('taskList');

function addTask() {
  const taskText = taskInput.value.trim();
  const dueDate = taskDate.value;

  if (!taskText) return alert('Please enter a task.');

  const li = document.createElement('li');
  li.classList = 'flex items-center justify-between bg-gray-100 p-4 rounded-xl';

  li.innerHTML = `
    <div>
      <p class="task-text text-lg font-medium">${taskText}</p>
      <p class="text-sm text-gray-500">${dueDate ? formatDateTime(dueDate) : ''}</p>
    </div>
    <div class="flex items-center gap-3">
      <button onclick="editTask(this)" class="text-blue-500 hover:text-blue-700 text-xl">✏️</button>
      <button onclick="completeTask(this)" class="text-green-500 hover:text-green-700 text-xl">✅</button>
      <button onclick="deleteTask(this)" class="text-red-500 hover:text-red-700 text-xl">🗑️</button>
    </div>
  `;

  taskList.appendChild(li);
  taskInput.value = '';
  taskDate.value = '';
}

function editTask(btn) {
  const taskTextEl = btn.closest('li').querySelector('.task-text');
  const newTask = prompt('Edit Task:', taskTextEl.textContent);
  if (newTask) taskTextEl.textContent = newTask;
}

function completeTask(btn) {
  const li = btn.closest('li');
  li.classList.toggle('bg-green-100');
  li.querySelector('.task-text').classList.toggle('line-through');
}

function deleteTask(btn) {
  btn.closest('li').remove();
}

function formatDateTime(datetimeStr) {
  const options = { dateStyle: 'medium', timeStyle: 'short' };
  return new Date(datetimeStr).toLocaleString(undefined, options);
}
