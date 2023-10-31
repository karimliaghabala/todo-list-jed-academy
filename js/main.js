
let inputValue = document.querySelector(".input>input");
let button = document.querySelector(".input>span");
let ulList = document.querySelector(".list");

// Səhifə yükləndikdə local yaddashdan melumatlari alir
let todos = JSON.parse(localStorage.getItem("todos")) || [];

button.onclick = (e) => {
  e.preventDefault();
  if (inputValue.value !== "") {
    let ul = document.createElement("ul");
    let div = document.createElement("div");
    let li = document.createElement("li");
    let iRemove = document.createElement("i");
    let iDone = document.createElement("i");
    let iChange = document.createElement("i");
    ulList.append(ul);
    ul.append(li, div);
    div.append(iRemove, iDone, iChange);
    iRemove.className = "fa-solid fa-xmark";
    iDone.className = "fa-solid fa-check";
    iChange.className = "fa-solid fa-cash-register";
    li.textContent = inputValue.value;
    inputValue.value = "";

    iRemove.onclick = () => {
      ul.remove();
      // məlumatlari local yaddaşdan silir
      todos = todos.filter((todoItem) => todoItem !== li.textContent);
      localStorage.setItem("todos", JSON.stringify(todos));
    };

    let isDone = false;
    iDone.onclick = () => {
      if (isDone) {
        li.style.textDecoration = "none";
      } else {
        li.style.textDecoration = "line-through #ffd700";
      }
      isDone = !isDone;

      // tapşırığ tamamladıqda local yaddaşda yeniləyin
      const index = todos.indexOf(li.textContent);
      if (index > -1) {
        todos[index] = isDone ? "done:" + li.textContent : li.textContent;
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    };

    iChange.onclick = () => {
      let newTodo = prompt("Zəhmət olmasa dəyişikliyi qeyd edin", li.innerText);
      li.innerText = newTodo;

      // tapşırıgı local yaddaşda yeniliyin
      const index = todos.indexOf(li.textContent);
      if (index > -1) {
        todos[index] = newTodo;
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    };

    // Əlavə olunan məlumatı locala əlave edin
    todos.push(li.textContent);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

// Səhifə yükləndikdə, local yaddaşdakı məlumatları çağırır
window.onload = () => {
  for (let todo of todos) {
    let ul = document.createElement("ul");
    let div = document.createElement("div");
    let li = document.createElement("li");
    let iRemove = document.createElement("i");
    let iDone = document.createElement("i");
    let iChange = document.createElement("i");
    ulList.append(ul);
    ul.append(li, div);
    div.append(iRemove, iDone, iChange);
    iRemove.className = "fa-solid fa-xmark";
    iDone.className = "fa-solid fa-check";
    iChange.className = "fa-solid fa-cash-register";
    li.textContent = todo;
    let isDone = todo.startsWith("done:");

    if (isDone) {
      li.style.textDecoration = "line-through #ffd700";
    }

    iRemove.onclick = () => {
      ul.remove();
      // tapçırığı local yaddaşdan silin
      todos = todos.filter((todoItem) => todoItem !== li.textContent);
      localStorage.setItem("todos", JSON.stringify(todos));
    };

    iDone.onclick = () => {
      if (isDone) {
        li.style.textDecoration = "none";
      } else {
        li.style.textDecoration = "line-through #ffd700";
      }
      isDone = !isDone;

      // tapşırığ tamamladıqda local yaddaşda yeniləyin
      const index = todos.indexOf(li.textContent);
      if (index > -1) {
        todos[index] = isDone ? "done:" + li.textContent : li.textContent;
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    };

    iChange.onclick = () => {
      let newTodo = prompt("Zəhmət olmasa dəyişikliyi qeyd edin", li.innerText);
      li.innerText = newTodo;

      // tapçırığı local yaddaşda yeniləyin
      const index = todos.indexOf(todo);
      if (index > -1) {
        todos[index] = newTodo;
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    };
  }
};