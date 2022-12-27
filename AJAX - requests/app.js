const btnGet = document.querySelector('.btn-get-posts');
const list = document.querySelector('.container');
const btnSet = document.querySelector('.btn-set-posts');

// управление формой
const form = document.forms['set-posts'];
const inputName = form.elements['name'];
const inputEmail = form.elements['email'];
const inputUsername = form.elements['username'];
const inputPhone = form.elements['phone'];
const inputWebsite = form.elements['website'];

form.addEventListener('submit', onFormSubmitHandler);
btnGet.addEventListener('click', (e) => {
  getPosts(renderPosts);
});

function onFormSubmitHandler(e) {
  e.preventDefault();
  const body = {};

  body.name = inputName.value;
  body.email = inputEmail.value;
  body.username = inputUsername.value;
  body.phone = inputPhone.value;
  body.website = inputWebsite.value;

  setPost(body, (response) => {
    const card = cardTemplate(response);
    list.insertAdjacentElement('afterbegin', card);
  });

  form.reset();
}

function getPosts(renderPosts) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);
    renderPosts(response);
  });

  xhr.addEventListener('error', () => {
    console.log('error');
  });

  xhr.send();
}

function setPost(body, renderPost) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://jsonplaceholder.typicode.com/users');
  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);
    renderPost(response);
  });

  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

  xhr.addEventListener('error', () => {
    console.log('error');
  });

  xhr.send(JSON.stringify(body));
}

function cardTemplate(user) {
  const card = document.createElement('ul');
  card.classList.add('card');

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = user.name;

  const cardInfo = document.createElement('ul');
  cardInfo.classList.add('card-info', 'no-visible');

  const infoPhone = document.createElement('li');
  infoPhone.classList.add('info-phone');
  infoPhone.textContent = `Phone: ${user.phone}`;

  const infoWebsite = document.createElement('li');
  infoWebsite.classList.add('info-website');
  infoWebsite.textContent = `Web-site: ${user.website}`;

  const infoEmail = document.createElement('li');
  infoEmail.classList.add('info-email');
  infoEmail.textContent = `Email: ${user.email}`;

  cardInfo.appendChild(infoPhone);
  cardInfo.appendChild(infoWebsite);
  cardInfo.appendChild(infoEmail);
  card.appendChild(title);
  card.appendChild(cardInfo);

  card.addEventListener('click', (e) => {
    cardInfo.classList.toggle('no-visible');
  });

  return card;
}

function getInfoUsers(user) {
  return cardInfo;
}

function renderPosts(response) {
  const fragment = document.createDocumentFragment();
  response.forEach((user) => {
    const card = cardTemplate(user);
    fragment.appendChild(card);
  });
  list.appendChild(fragment);
}
