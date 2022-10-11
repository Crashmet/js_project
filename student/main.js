(() => {
  // dz
  let arrSaveData = [];
  let listName = '';
  let dateFlag = 0;
  let edFlag = 0;

  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h4');
    appTitle.innerHTML = title;
    appTitle.classList.add('mb-3', 'mt-3');
    // возвращаем элемент что бы можно было к нему обратиться
    return appTitle;
  }

  function createDataTitle() {
    let dataTitle = document.createElement('h2');
    dataTitle.textContent = 'Добавьте студента в список';
    dataTitle.classList.add('mb-3', 'mt-3');
    // возвращаем элемент что бы можно было к нему обратиться
    return dataTitle;
  }

  function createFilterTitle() {
    let filterTitle = document.createElement('h4');
    filterTitle.textContent = 'Поиск по фильтру';
    filterTitle.classList.add('mb-3', 'mt-3');
    // возвращаем элемент что бы можно было к нему обратиться
    return filterTitle;
  }


  function createErrorDateLine() {
    let errorLine = document.createElement('p');
    errorLine.textContent = 'Неверная дата рождения, введите настоящую';
    errorLine.style.color = 'white';
    errorLine.style.backgroundColor = 'red';
    errorLine.classList.add('mb-3', 'd-flex', 'algin-items-center', 'justify-content-center', 'delete-date-line');
    // возвращаем элемент что бы можно было к нему обратиться
    return errorLine;
  }

  function createErrorEdLine() {
    let errorLineEd = document.createElement('p');
    errorLineEd.textContent = 'Неверная дата поступления, введите настоящую';
    errorLineEd.style.color = 'white';
    errorLineEd.style.backgroundColor = 'red';
    errorLineEd.classList.add('mb-3', 'd-flex', 'algin-items-center', 'justify-content-center', 'delete-ed-line');
    // возвращаем элемент что бы можно было к нему обратиться
    return errorLineEd;
  }


  function alertBlock(){
    const alert = document.createElement('div');
    alert.classList.add('mb-3');
    return alert;
  }


   // создаем и возвращаем форму для поиска дела
   function createItemSearchForm() {
    // создаем элементы
    const formSearch = document.createElement('form');
    const inputNameSearch = document.createElement('input');
    const inputFacultySearch = document.createElement('input');
    const inputStartEdSearch = document.createElement('input');
    const inputEndEdSearch = document.createElement('input');
    const btnAddSearch = document.createElement('button');

    // добавим классы
    formSearch.classList.add('input-group', 'mb-5');
    inputNameSearch.classList.add('form-control', 'col-4');
    inputNameSearch.placeholder = 'Фамилия';
    inputFacultySearch.classList.add('form-control', 'col-3');
    inputFacultySearch.placeholder = 'Факультет';
    inputStartEdSearch.classList.add('form-control', 'col-2');
    inputStartEdSearch.placeholder = 'Год начала обучения';
    inputEndEdSearch.classList.add('form-control', 'col-2');
    inputEndEdSearch.placeholder = 'Год конца обучения';
    btnAddSearch.classList.add('btn', 'btn-success', 'col-1');
    btnAddSearch.textContent = 'Поиск';

    // создаем структуру
    formSearch.append(inputNameSearch);
    formSearch.append(inputFacultySearch);
    formSearch.append(inputStartEdSearch);
    formSearch.append(inputEndEdSearch);
    formSearch.append(btnAddSearch);

    // нужно вернуть их от сюда, иначе мы не будем иметь к ним доступа. т.к. созданы они были здесь
    return{
      formSearch,
      inputNameSearch,
      inputFacultySearch,
      inputStartEdSearch,
      inputEndEdSearch,
      btnAddSearch
    };
  }


  // создаем и возвращаем шапку для сортировки дел
  function createSortBtnForm() {
    // создаем элементы
    const formSort = document.createElement('div');
    const btnSortName = document.createElement('button');
    const btnSortFaculty = document.createElement('button');
    const btnSortDate = document.createElement('button');
    const btnSortStartEd = document.createElement('button');
    const btnSortClear = document.createElement('button');

    // добавим классы
    formSort.classList.add('input-group', 'mb-3');
    btnSortName.classList.add('btn', 'btn-primary', 'col-4');
    btnSortName.textContent = 'Фамилия';
    btnSortFaculty.classList.add('btn', 'btn-light', 'col-3');
    btnSortFaculty.textContent = 'Факультет';
    btnSortDate.classList.add('btn', 'btn-light', 'col-2');
    btnSortDate.textContent = 'Дата рождения';
    btnSortStartEd.classList.add('btn', 'btn-light', 'col-2');
    btnSortStartEd.textContent = 'Год начала обучения';
    btnSortClear.classList.add('btn', 'btn-danger', 'col-1');
    btnSortClear.textContent = 'Очистить';

    // создаем структуру
    formSort.append(btnSortName);
    formSort.append(btnSortFaculty);
    formSort.append(btnSortDate);
    formSort.append(btnSortStartEd);
    formSort.append(btnSortClear);

  
    // нужно вернуть их от сюда, иначе мы не будем иметь к ним доступа. т.к. созданы они были здесь
    return{
      formSort,
      btnSortName,
      btnSortFaculty,
      btnSortDate,
      btnSortStartEd,
      btnSortClear
    };
  }

  // создаем и возвращаем форму для создания дела
  function createItemForm() {
    // создаем элементы
    const form = document.createElement('form');
    const inputName = document.createElement('input');
    const inputFaculty = document.createElement('input');
    const inputDate = document.createElement('input');
    const inputStartEd = document.createElement('input');
    const btnAdd = document.createElement('button');

    // добавим классы
    form.classList.add('input-group', 'mb-5');
    inputName.classList.add('form-control', 'col-4');
    inputName.placeholder = 'Фамилия';
    inputName.required = 'true';
    inputFaculty.classList.add('form-control', 'col-3');
    inputFaculty.placeholder = 'Факультет';
    inputFaculty.required = 'true';

    inputDate.classList.add('form-control', 'col-2');
    inputDate.placeholder = 'Дата рождения';
    inputDate.type = 'date';
    inputDate.min = '1900-01-01'
    inputDate.required = 'true';

    inputStartEd.classList.add('form-control', 'col-2');
    inputStartEd.placeholder = 'Год начала обучения';
    inputStartEd.required = 'true';
    btnAdd.classList.add('btn', 'btn-success', 'col-1');
    btnAdd.textContent = 'Добавить';

    // создаем структуру
    form.append(inputName);
    form.append(inputFaculty);
    form.append(inputDate);
    form.append(inputStartEd);
    form.append(btnAdd);

    // нужно вернуть их от сюда, иначе мы не будем иметь к ним доступа. т.к. созданы они были здесь
    return{
      form,
      inputName,
      inputFaculty,
      inputDate,
      inputStartEd,
      btnAdd
    };
  }


  // создаем и возвращаем список элементов
  function createStudentList() {
    let list = document.createElement('ul');
    list.classList.add('list-group', 'mb-5', 'data-list');
    return list;
  }


  // создает элемент списка 
  function createStudentItem(obj) {
    let items = document.createElement('li');
    // Данные помещаем в элемент, который красиво покажет их в одной группе
    let itemName = document.createElement('div');
    let itemFaculty = document.createElement('div');
    let itemDate = document.createElement('div');
    let itemStartEd = document.createElement('div');
    let deleteBtn = document.createElement('button');

    // устанавливаем стили для элемента списка, а так же для размещения кнопок в его правой части с помощью флекс
    items.classList.add('list-group-item', 'd-flex', 'algin-items-center', 'data-list-item');
    itemName.classList.add('col-4', 'br');
    itemName.textContent = obj.name;
    itemFaculty.classList.add('col-3', 'br', 'pl');
    itemFaculty.textContent = obj.faculty;
    itemDate.classList.add('col-2', 'br', 'pl');
    itemDate.textContent = obj.date;
    itemStartEd.classList.add('col-2', 'pl');
    itemStartEd.textContent = obj.startEd;
    deleteBtn.classList.add('btn', 'btn-danger', 'col-1');
    deleteBtn.textContent = 'Удалить';
  

    // добавляем обработчик на кнопки
    deleteBtn.addEventListener('click', function() {
      if (confirm('Вы уверены?')) {
        // dz
        arrSaveData.splice(arrSaveData.indexOf(obj), 1);
        items.remove();
        saveList(arrSaveData, listName);
      }
    })

    // вкладываем кнопки в отдельный элемент, чтобы они объеденились в один блок
    items.append(itemName);
    items.append(itemFaculty);
    items.append(itemDate);
    items.append(itemStartEd);
    items.append(deleteBtn);
    items.append(deleteBtn);

    localStorage.setItem('arrSaveCase', JSON.stringify(arrSaveData));

    // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    return{
      items,
      itemName,
      itemFaculty,
      itemDate,
      itemStartEd,
      deleteBtn
    };
  };


  // dz создаем локальное xранилище в браузере
  function saveList(arr, keyName) {
    localStorage.setItem(keyName, JSON.stringify(arr));
  }

  // создает список студентов
  function createStudentApp(container, title ='Список студентов', keyName){
    
    // вызываем функции
    let studentDataTitle = createDataTitle()
    let studentAppTitle = createAppTitle(title);
    let studentItemForm = createItemForm();
    let studentList = createStudentList();
    let studentSearchForm = createItemSearchForm();
    let studentSortBtnForm = createSortBtnForm();
    let studentFilterTitle = createFilterTitle();
    let alertLine = alertBlock();
    listName = keyName;
    // создаем в контейнере 
    
    // вначале берем .форм а не сами элементы формы
    container.append(studentDataTitle);
    container.append(studentItemForm.form);
    container.append(alertLine);
    container.append(studentAppTitle);
    container.append(studentSortBtnForm.formSort);
    container.append(studentList);
    container.append(studentFilterTitle);
    container.append(studentSearchForm.formSearch);


    // dz
    let localData = localStorage.getItem(listName)
    
    if(localData !== null && localData !== '') {
      arrSaveData = JSON.parse(localData)
    }
    
    for(let obj of arrSaveData){
      let studentItem = createStudentItem(obj);
      studentList.append(studentItem.items);
    }

    // браузер создает событие submit на форме по нажатию на Enter или на кнопку по создания дела
    studentItemForm.form.addEventListener('submit', function(e) {
      
      // эта строчка необходима, чтобы предотвратить стандартное действие браузера
      // в данном случаем мы не хотим, чтобы страница перезагрузилась при отправке формы
      e.preventDefault();

      let startSubmit = true;
      let name = studentItemForm.inputName.value;
      let faculty = studentItemForm.inputFaculty.value;
      let date = studentItemForm.inputDate.value;
      let startEd = studentItemForm.inputStartEd.value
      
      // валидатор
      function parseStudentData(){
        // Коррекция имени
        let correctName = name.split(' ').join('');
        let firstCharName = correctName.substr(0, 1);
        let otherCharName = correctName.substr(1, 1000);
        correctName = correctName.replace(firstCharName, firstCharName.toUpperCase());
        correctName = correctName.replace(otherCharName, otherCharName.toLowerCase());
      
        // Корректор факультета
        let correctFaculty = faculty;
        let firstCharFaculty = correctFaculty.substr(0, 1);
        let otherCharFaculty = correctFaculty.substr(1, 1000);
        correctFaculty = correctFaculty.replace(firstCharFaculty, firstCharFaculty.toUpperCase());
        correctFaculty = correctFaculty.replace(otherCharFaculty, otherCharFaculty.toLowerCase());
        
        // для дат
        let today = new Date();
        let day = today.getDate();
        day = day < 10 ? '0' + day : day;
        let month = today.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let year = today.getFullYear();

        // корректор даты рождения
        let errorLineDate = createErrorDateLine()
        let maxDate = year + "-" + month + "-" + day;
        let alertLineDelete = document.querySelector(".delete-date-line");
        let birthDate = new Date(date);
        let birthDay = birthDate.getDate();
        birthDay = birthDay < 10 ? '0' + birthDay : birthDay;
        let birthMonth = birthDate.getMonth() + 1;
        birthMonth = birthMonth < 10 ? '0' + birthMonth : birthMonth;
        let birthYear = birthDate.getFullYear();
        
        let birthDateValid = birthDay + "." + birthMonth + "." + birthYear;

        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
          
        let correctDate = `${birthDateValid} (${age}лет)`
      
        if (dateFlag >= 1){
          dateFlag -= 1;
          alertLineDelete.remove();
        }
        if (maxDate < date) {
          dateFlag += 1;
          alertLine.append(errorLineDate);
          return startSubmit = false;
        } 
      
       
        // корректор года поступления
        let errorLineEd = createErrorEdLine()
        let alertLineEd = document.querySelector(".delete-ed-line");
        let trueStartEd = false;
        let yearLastNum = String(year).substr(2, 2);
      
        if (edFlag >= 1){
          edFlag -= 1;
          alertLineEd.remove();
        }
      
        for (let i = 0; i <= yearLastNum; i++){
          if (i < 10){
            trueStartEd = startEd.includes('200' + i)
          } else{
            trueStartEd = startEd.includes('20' + i);
          } 
          if (trueStartEd){
            break;
          }
        }
      
        if (!trueStartEd){
          edFlag += 1;
          alertLine.append(errorLineEd);
          return  startSubmit = false;
        }
        
        let correctEndEd = Number(startEd) + 4;
        let numСourse = year - startEd
        if (numСourse > 4){
          numСourse = 'закончил';
        } else {
          numСourse = year - startEd + ' ' + 'курс';
        }
        let correctStartEd = `${startEd}-${correctEndEd} (${numСourse})`;
        
        return{
          correctName,
          correctFaculty,
          correctDate,
          correctStartEd
        };
      };
      
      let parseStudent = parseStudentData()

      if (startSubmit){
        // dz
        let newItem = {
          name: parseStudent.correctName,
          faculty: parseStudent.correctFaculty,
          date: parseStudent.correctDate,
          startEd: parseStudent.correctStartEd
        }

        // todoItemForm.button.disabled = true;
        // результат выполнения функции
        let studentItem = createStudentItem(newItem);
        

        // dz
        arrSaveData.push(newItem);
        saveList(arrSaveData, listName);

        // создаем и добавляем в список новое дело с названием из содержимого импута
        // items = элемент ли
        studentList.append(studentItem.items);
        };

        
        // обнуляем значение в поле, чтобы не пришлось стирать его в ручную
        studentItemForm.inputName.value = '';
        studentItemForm.inputFaculty.value = '';
        studentItemForm.inputDate.value = '';
        studentItemForm.inputStartEd.value = '';
        
    });

    // dz
    let sortArrSaveData = [];
    let dataListItem = document.querySelectorAll(".data-list-item");
    
    studentSortBtnForm.btnSortName.addEventListener('click', function() {
      let studentMap = arrSaveData.map(student => student.name);
      let studentSort = studentMap.sort();
      for (let student of studentSort){
        for(let data of arrSaveData){
          let {name} = data;
          if(student === name){
            sortArrSaveData.push(data)
            break;
          }
        }
      }
      
      dataListItem.forEach((e) =>{
        console.log()
        e.remove()
      })

      for(let obj of sortArrSaveData){
        let studentItem = createStudentItem(obj);
        studentList.append(studentItem.items);
      }
      dataListItem = document.querySelectorAll(".data-list-item");
      sortArrSaveData = []
    });

    studentSortBtnForm.btnSortFaculty.addEventListener('click', function() {
      let studentMap = arrSaveData.map(student => student.faculty);
      let studentSort = studentMap.sort();
      for (let facultystudentSort of studentSort){
        for(let data of arrSaveData){
          let {faculty} = data;
          if(facultystudentSort === faculty){
            sortArrSaveData.push(data)
            break;
          }
        }
      }
      
      dataListItem.forEach((e) =>{
        console.log()
        e.remove()
      })

      for(let obj of sortArrSaveData){
        let studentItem = createStudentItem(obj);
        studentList.append(studentItem.items);
      }
      dataListItem = document.querySelectorAll(".data-list-item");
      sortArrSaveData = []
    });

    studentSortBtnForm.btnSortDate.addEventListener('click', function() {
      let studentMap = arrSaveData.map(student => student.date);
      let studentSort = studentMap.sort();
      for (let student of studentSort){
        for(let data of arrSaveData){
          let {date} = data;
          if(student === date){
            sortArrSaveData.push(data)
            break;
          }
        }
      }
      
      dataListItem.forEach((e) =>{
        console.log()
        e.remove()
      })

      for(let obj of sortArrSaveData){
        let studentItem = createStudentItem(obj);
        studentList.append(studentItem.items);
      }
      dataListItem = document.querySelectorAll(".data-list-item");
      sortArrSaveData = []
    });

    studentSortBtnForm.btnSortStartEd.addEventListener('click', function() {
      let studentMap = arrSaveData.map(student => student.startEd);
      let studentSort = studentMap.sort();
      for (let student of studentSort){
        for(let data of arrSaveData){
          let {startEd} = data;
          if(student === startEd){
            sortArrSaveData.push(data)
            break;
          }
        }
      }
      
      dataListItem.forEach((e) =>{
        console.log()
        e.remove()
      })

      sortArrSaveData = sortArrSaveData.reverse()
      for(let obj of sortArrSaveData){
        let studentItem = createStudentItem(obj);
        studentList.append(studentItem.items);
      }
      dataListItem = document.querySelectorAll(".data-list-item");
      sortArrSaveData = []
    });

    studentSortBtnForm.btnSortClear.addEventListener('click', function() {
      dataListItem.forEach((e) =>{
        console.log()
        e.remove()
      })

      for(let obj of arrSaveData){
        let studentItem = createStudentItem(obj);
        studentList.append(studentItem.items);
      }
      dataListItem = document.querySelectorAll(".data-list-item");
      sortArrSaveData = []
    });

    
    studentSearchForm.formSearch.addEventListener('submit', function(e) {
      e.preventDefault();

      let nameSearch = studentSearchForm.inputNameSearch.value;
      let facultySearch = studentSearchForm.inputFacultySearch.value;
      let startEdSearch = studentSearchForm.inputStartEdSearch.value;
      let endEdSearch = studentSearchForm.inputEndEdSearch.value;


      // Коррекция имени
      let correctName = nameSearch.split(' ').join('');
      let firstCharName = correctName.substr(0, 1);
      let otherCharName = correctName.substr(1, 1000);
      correctName = correctName.replace(firstCharName, firstCharName.toUpperCase());
      correctName = correctName.replace(otherCharName, otherCharName.toLowerCase());

      // Корректор факультета
      let correctFaculty = facultySearch;
      let firstCharFaculty = correctFaculty.substr(0, 1);
      let otherCharFaculty = correctFaculty.substr(1, 1000);
      correctFaculty = correctFaculty.replace(firstCharFaculty, firstCharFaculty.toUpperCase());
      correctFaculty = correctFaculty.replace(otherCharFaculty, otherCharFaculty.toLowerCase());

      // корректор начала
      let correctStartEd = startEdSearch.split(' ').join('');
      // correctStartEd = correctStartEd.substr(0, 4);
      console.log(correctStartEd)
      // корректор конца 

      
      
      sortArrSaveData = arrSaveData.filter(student => student.startEd.substr(5, 4) === endEdSearch || student.startEd.substr(0, 4) === startEdSearch || student.faculty === correctFaculty || student.name === correctName)


      dataListItem.forEach((e) =>{
        console.log()
        e.remove()
      })

      for(let obj of sortArrSaveData){
        let studentItem = createStudentItem(obj);
        studentList.append(studentItem.items);
      }

      dataListItem = document.querySelectorAll(".data-list-item");

      sortArrSaveData = []
      studentSearchForm.inputNameSearch.value = '';
      studentSearchForm.inputFacultySearch.value = '';
      studentSearchForm.inputStartEdSearch.value = '';
      studentSearchForm.inputEndEdSearch.value = '';
    });
    
  };

  window.createStudentApp = createStudentApp;
})();