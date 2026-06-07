const inputText = document.getElementById("input-text");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const countLabel = document.getElementById("count-label");
const clearDone = document.getElementById("clear-done");
const filtersBtns = document.querySelectorAll(".filters button");

let todos = [];
let currFilters = "all";

function render() {
  todoList.innerHTML = "";

  const filtered = todos.filter(function (todo) {
    if (currFilters === "active") return !todo.done;
    if (currFilters === "done") return todo.done;

    return true;
  });

  if (filtered.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "Nothing here!";
    todoList.appendChild(empty);
  } else {
    filtered.forEach(function (todo) {
      const li = document.createElement("li");
      li.className = "todo-item" + (todo.done ? " done" : "");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.done;

      checkbox.addEventListener("change", function () {
        todo.done = checkbox.checked;
        render();
      });

      const span = document.createElement("span");
      span.className = "todo-text";
      span.textContent = todo.text;

      const delBtn = document.createElement("button");
      delBtn.className = "del-btn";
      delBtn.textContent = "x";

      delBtn.addEventListener("click", function () {
        todos = todos.filter(function (t) {
          return t.id !== todo.id;
        });
        render();
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(delBtn);
      todoList.appendChild(li);
    });
  }

  const activeCount = todos.filter(function (t) {
    return !t.done;
  }).length;

  countLabel.textContent =
    activeCount + (activeCount === 1 ? " task left" : " tasks left");
}

function addTask() {
  const text = inputText.value.trim();

  if (!text) return;

  todos.push({
    id: Date.now(),
    text: text,
    done: false,
  });

  inputText.value = "";
  render();
}

addBtn.addEventListener("click", addTask);

inputText.addEventListener("keydown", function (event) {
  if (event.key === "Enter") addTask();
});

filtersBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filtersBtns.forEach(function (b) {
      b.classList.remove("active"); // classList.remove
    });

    btn.classList.add("active"); // classList.add

    currFilters = btn.dataset.filter; // dataset — reads data-* attributes

    render();
  });
});

clearDone.addEventListener("click", function () {
  todos = todos.filter(function (t) {
    return !t.done;
  });
  render();
});

render();
