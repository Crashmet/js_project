(function(){
  let arrSaveData = [];
  let listName = '';

  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  // создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    // создаем элементы
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWraper = document.createElement('div');
    let button = document.createElement('button');

    // добавим классы
    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWraper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.disabled = true;
    // создаем структуру
    buttonWraper.append(button);
    form.append(input);
    form.append(buttonWraper);

    // если ничего не введено кнопка отключается
    input.addEventListener('input', function() {
      if (input.value !== "") {
        button.disabled = false;
      }else {
        button.disabled = true;
      }
    });
    return{
      form,
      input,
      button,
    };
  }

  // создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  
  function createTodoItemElement(todoItemData, {onDone, onDelete}) {
    let item = document.createElement('li');
    // кнопки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // устанавливаем стили для элемента списка, а так же для размещения кнопок в его правой части с помощью флекс
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'algin-items-center');
    item.textContent = todoItemData.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';
    
    if (todoItemData.done) item.classList.add('list-group-item-success');
    // dz добавляем обработчик на кнопки
    doneButton.addEventListener('click', function() {
      // server 
      onDone({todoItemData, element: item});
      // todoItemData.done если тру то клас будет проставлен
      item.classList.toggle('list-group-item-success', todoItemData.done);
    });
    deleteButton.addEventListener('click', function() {
      // server 
      onDelete({ todoItemData, element: item});
    })

    // вкладываем кнопки в отдельный элемент, чтобы они объеденились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    localStorage.setItem('arrSaveCase', JSON.stringify(arrSaveData));

    // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    return item;
  };


  // создает список дел
  async function createTodoApp(container, title, owner){
    // вызываем функции
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    // server.обработчики на кнопки  
    const handlers = {
      onDone({todoItemData}) {
        todoItemData.done = !todoItemData.done;
        fetch(`http://localhost:3000/api/todos/${todoItemData.id}`, {
          method: 'PATCH',
          body: JSON.stringify({done: todoItemData.done}),
          headers:{
            'Content-Type': 'application/json',
          }
        });
      },
      onDelete({todoItemData, element}) {
        if (!confirm('Вы уверены?')) {
          return;
        }
        element.remove();
        fetch(`http://localhost:3000/api/todos/${todoItemData.id}`, {
          method: 'DELETE',
          body: JSON.stringify({done: todoItemData.done}),
          headers:{
            'Content-Type': 'application/json',
          }
        });
      },
    };

    container.append(todoAppTitle);
    // вначале берем .форм а не сами элементы формы
    container.append(todoItemForm.form);
    container.append(todoList);


    // server. отправляем запрос на список всех дел
    // добавил фильтр по оwner на список дел
    const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
    const todoItemList = await response.json();
    
    todoItemList.forEach(todoItemData => {
      const todoItemElement = createTodoItemElement(todoItemData, handlers);
      todoList.append(todoItemElement);
    });
    

    // браузер создает событие submit на форме по нажатию на Enter или на кнопку по создания дела
    todoItemForm.form.addEventListener('submit', async function(e) {
      
      // эта строчка необходима, чтобы предотвратить стандартное действие браузера
      // в данном случаем мы не хотим, чтобы страница перезагрузилась при отправке формы
      e.preventDefault();

      // игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      // sever 
      const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        body: JSON.stringify ({
          name: todoItemForm.input.value.trim(),
          owner,
        }),
        headers: {
          'Content-type': 'application/json',
        }
      });
      const todoItemData = await response.json();

      // сервер. берем данные из сервера и создаем элемент
      const todoItemElement = createTodoItemElement(todoItemData, handlers);

      todoList.append(todoItemElement);

      // обнуляем значение в поле, чтобы не пришлось стирать его в ручную
      todoItemForm.button.disabled = true;
      todoItemForm.input.value = '';
      
    });
    
  };
  
  window.createTodoApp = createTodoApp;
})();