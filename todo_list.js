const form = document.querySelector(".deneme");
const input = document.querySelector("#input");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const list = document.querySelector("#list");
loadItems();
eventListeners();

function eventListeners() {
  form.addEventListener("submit", addNewItem);
  list.addEventListener("click", deleteItem);
  list.addEventListener("click", completedToggle);
  list.addEventListener('click',newFunciton);
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
  let items = getItemsFromLS();
  items?.forEach((item) => {
    createItems(item.title, item.id,item.isCompleted);
  });
}

function completedToggle(e) {
   e.target.classList.toggle("mystyle");
}

function getItemsFromLS() {
  let items = [];
  if (
    localStorage.getItem("items") === undefined ||
    localStorage.getItem("items") === null
  ) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

function setItemToLS(text, id) {
  let items = getItemsFromLS();
  const object = {
    title: text,
    isCompleted: false,
    id: id.toString(),
  };
  items.push(object);
  localStorage.setItem("items", JSON.stringify(items));
}

function deleteItemFromLS(id) {
  items = getItemsFromLS();
  items.forEach(function (item, index) {
    if (item.id === id) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}

function createItems(title, id,isCompleted = false) {
  const li = document.createElement("li");
  li.id = id;
   const classElemnt = (isCompleted) ? "list-group-items mystyle" : "list-group-items" ;
  li.className = classElemnt;
  li.appendChild(document.createTextNode(title));
  const a = document.createElement("a");
  a.className = "delete";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';
  li.appendChild(a);
  list.appendChild(li);
}

function addNewItem(e) {
  if (input.value == "") {
    alert("list is empty , please add new item...");
  } else {
    let id = Math.floor(Math.random() * 10);
    createItems(input.value, id);
    setItemToLS(input.value, id);
    input.value = "";
  }

  e.preventDefault();
}

function deleteItem(e) {
    const idName = e.target.id;

  if (e.target.className === "fas fa-times") {
    e.target.parentElement.parentElement.remove();


    deleteItemFromLS(e.target.parentElement.parentElement.id);
    
  }
  e.preventDefault();
}

function deleteAllItems(e) {
  list.innerHTML = "";
  localStorage.clear();

  e.preventDefault();
}

function newFunciton(e) {
    const getLocalTodos = getItemsFromLS();
    if (e.target.tagName == "LI") {
      const id = e.target.id;
      getLocalTodos.forEach((item, index) => {
        if (item.id === id) {
          item.isCompleted = !item.isCompleted;
          getLocalTodos.splice(index, 1);
          getLocalTodos.splice(index, 0, item);
          localStorage.setItem("items", JSON.stringify(getLocalTodos));
        }
      });
    }
  }