let tasks = [];
let stored = localStorage.getItem("toDos");

if (stored?.length > 0) {
  // JSON.parse(localStorage.getItem("toDos"));
  tasks = JSON.parse(stored);
} else {
  tasks = [];
}
// console.log(localStorage.setItem());

const container = document.getElementById("container");

function getTaskName() {
  const input = document.getElementById("task");
  const task = input.value;
  const trimmedTask = task.trim();

  if (trimmedTask.length > 0) {
    tasks.push(trimmedTask);
    localStorage.setItem("toDos", JSON.stringify(tasks));
    render(trimmedTask);
  }

  input.value = "";
}

// let container
function render(taskName) {
  const taskDiv = document.createElement("div");
  taskDiv.id = `${taskName}-${tasks.length + 1}`;
  taskDiv.className = "task-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  // checkbox.style.display = "block";
  checkbox.className = "task-checkbox";
  checkbox.value = taskName;

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      taskText.style.transition = "all 0.8s ease-in-out";
      taskText.style.textDecoration = "line-through";
      taskText.style.opacity = "0.4";
    } else {
      taskText.style.textDecoration = "none";
      taskText.style.opacity = "1";
    }
  });

  const taskText = document.createElement("span");
  taskText.textContent = taskName;

  const button = document.createElement("input");
  button.type = "submit";
  button.value = "-";
  button.className = "taskRemove";

  button.addEventListener("click", () => {
    if (checkbox.checked) {
      // console.log("log======>", checkbox.value);

      button.style.backgroundColor = "rgb(230, 46, 46)";
      setTimeout(() => {
        container.removeChild(taskDiv);
      }, 250);

      let search = checkbox.value;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] === search) {
          // console.log("found===> ", tasks[i]);
          tasks.splice(i, 1);
          // console.log("splice===> ", tasks);

          localStorage.setItem("toDos", JSON.stringify(tasks));
          break;
        }
      }
    }
  });

  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(taskText);
  taskDiv.appendChild(button);
  container.appendChild(taskDiv);
}

// localStorage.setItem(tasks,i);

for (let i in tasks) {
  render(tasks[i]);
}
