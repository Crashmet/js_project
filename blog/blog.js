( () => {
  function createGlobalPageTitle(pageTitle) {
    let globalTitle = document.createElement('h2');
    let hRefTitle = document.createElement('a');

    globalTitle.classList.add('mb-4', 'mt-3');
    hRefTitle.innerHTML = pageTitle;
    hRefTitle.href = "list.html";
    hRefTitle.classList.add('text-secondary')

    globalTitle.append(hRefTitle)

    return globalTitle;
  }

  function createCardsList() {
    let list = document.createElement('ul');
    list.classList.add('list-group', 'mb-3');
    return list;
  }

  function createCardsListElement(blogItemData) {
    const cardBlock = document.createElement('li');
    const cardTitle = document.createElement('h3');
    const cardBody  = document.createElement('div');

    cardBlock.classList.add('list-group', 'mb-4', 'bg-info');
    cardBlock.style.cursor = 'pointer'
    cardBlock.style.width = '750px';
    cardBlock.style.padding = '30px 40px';
    cardTitle.textContent = blogItemData.title;
    cardTitle.classList.add('text-secondary')
    cardBody.textContent = blogItemData.body;
    cardBody.classList.add('text-light')

    cardBlock.append(cardTitle);
    cardBlock.append(cardBody);
    cardBlock.addEventListener('click', () => {
      window.open('arcticle.html');
      // saveId = blogItemData.id
      localStorage.setItem('pageId', blogItemData.id)
    })

    return cardBlock;
  }

  function createPaginationBlock(totalPages, page) {
    let penulPage = totalPages - 1;
    let penulPageThree=  totalPages - 3;

    let element = document.createElement('div');
    let firstPage = document.createElement('button');
    let active = document.createElement('button');
    let beforePage = document.createElement('button');
    let afterPage = document.createElement('button');
    let afterPageThree = document.createElement('button');
    let ellipsis = document.createElement('button');
    let nextBtn = document.createElement('button');
    let backBtn =  document.createElement('button');
    let lastPage = document.createElement('button');

    element.classList.add('mb-5')
    element.style.margin = '0 auto';
    element.style.width = '900px';
    active.classList.add('btn', 'btn-warning', 'pgnt');
    active.style.margin = '0 5px';
    active.textContent = page;
    firstPage.classList.add('btn', 'btn-light', 'pgnt');
    firstPage.style.margin = '0 5px';
    firstPage.textContent = 1;
    beforePage.classList.add('btn','btn-light', 'pgnt');
    beforePage.style.margin = '0 5px';
    beforePage.textContent = page - 1;
    afterPage.classList.add('btn', 'btn-light', 'pgnt');
    afterPage.style.margin = '0 5px';
    afterPage.textContent = page + 1;
    afterPageThree.classList.add('btn', 'btn-light', 'pgnt');
    afterPageThree.style.margin = '0 5px';
    afterPageThree.textContent = page + 2;
    backBtn.classList.add('btn', 'btn-info', 'pgnt');
    backBtn.style.margin = '0 5px';
    backBtn.textContent = 'back';
    nextBtn.classList.add('btn', 'btn-info', 'pgnt');
    nextBtn.style.margin = '0 5px';
    nextBtn.textContent = 'next';
    ellipsis.classList.add('btn', 'btn-light', 'pgnt');
    ellipsis.style.margin = '0 5px';
    ellipsis.textContent = '...';
    lastPage.classList.add('btn', 'btn-light', 'pgnt');
    lastPage.style.margin = '0 5px';
    lastPage.textContent = totalPages;

    if (page == 1) {
      element.append(active);
      element.append(afterPage);
      element.append(afterPageThree);
      element.append(lastPage);
      element.append(nextBtn);
    } 
    if (penulPageThree >= page && page > 1) {
      element.append(backBtn);
      element.append(firstPage);
      element.append(beforePage);
      element.append(active);
      element.append(afterPage);
      element.append(lastPage);
      element.append(nextBtn);
    } 
    
    
    if (page === totalPages) {
      element.append(backBtn);
      element.append(firstPage);
      element.append(beforePage);
      element.append(active);
    } else if (penulPage == page) {
      element.append(backBtn);
      element.append(firstPage);
      element.append(beforePage);
      element.append(active);
      element.append(lastPage);
    } else if (penulPageThree < page) {
      element.append(backBtn);
      element.append(firstPage);
      element.append(beforePage);
      element.append(active);
      element.append(afterPage);
      element.append(lastPage);
    }

    return element;
  }

  async function createListBlogApp(totalPages, page) {
    const container = document.createElement('div');
    container.classList.add('container')
    const blogAppTitle = createGlobalPageTitle('Список тем');
    const blogAppList = createCardsList();
    let paginationBlogApp = createPaginationBlock(totalPages, page);

    document.body.append(container);
    container.append(blogAppTitle);
    container.append(blogAppList);

    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
    const blogItemList = await response.json();
    let {code, data, meta} = blogItemList;
    
    if (code == 200){
      page = meta.pagination.page;
      totalPages = meta.pagination.pages;

      paginationBlogApp = createPaginationBlock(totalPages, page);

      data.forEach(blogItemData => {
        let blogItemElement = createCardsListElement(blogItemData);
        blogAppList.append(blogItemElement);
      });
    } else {
      alert('Что то не так с сервером :(')
    }
    container.append(paginationBlogApp);

    document.querySelectorAll('.pgnt').forEach( btnPgnt => {
      btnPgnt.addEventListener('click', async () => {
        
        if (btnPgnt.textContent === 'next') {
          page += 6;
        }else if (btnPgnt.textContent === 'back') {
          page -= 6;
        }else {
          page = Number(btnPgnt.textContent);
        }

        container.remove()
        createListBlogApp(totalPages, page)
      })
    });
  }

  async function createArticleBlogApp() {
    const container = document.createElement('div');
    container.classList.add('container');

    const blogAppTitle = createGlobalPageTitle('Список тем');
    const articleBlock = document.createElement('div');
    const titleArticle = document.createElement('h3');
    const bodyArticle = document.createElement('p');
    const commentList = document.createElement('ul');

    articleBlock.classList.add('list-group', 'mb-4', 'bg-warning');
    articleBlock.style.width = '750px';
    articleBlock.style.padding = '30px 40px';
    titleArticle.classList.add('text-primary');
    bodyArticle.classList.add('text-secondary');
    commentList.classList.add('list-group');

    let saveId = +localStorage.getItem('pageId')
    
    const responsePosts = await fetch(`https://gorest.co.in/public-api/posts?id=${saveId}`);
    const blogItemPost = await responsePosts.json();
    let {code, data} = blogItemPost;

    if (code == 200) {
      data.forEach(blogItemData => {
        titleArticle.textContent = blogItemData.title;
        bodyArticle.textContent = blogItemData.body;
      });
    } else {
      alert('Что то не так с сервером :(')
    }
    
    document.body.append(container);
    container.append(blogAppTitle);
    container.append(articleBlock);
    articleBlock.append(titleArticle);
    articleBlock.append(bodyArticle);
    container.append(commentList);


    // comment

    const responseComments = await fetch(`https://gorest.co.in/public-api/comments?post_id=${saveId}`);
    const blogItemComment = await responseComments.json();
    let {code:c, data:d, meta:m} = blogItemComment;
    console.log(blogItemComment)

    if (c == 200) {
      d.forEach(items => {
        let commentUser = createCommentUser(items);
        commentList.append(commentUser);
      });
    } else {
      alert('Что то не так с сервером :(')
    }
  }  

  function createCommentUser(items){
    const commentItem = document.createElement('li');
    const commentHeader = document.createElement('div');
    const nameCommnet = document.createElement('h5');
    const mailComment = document.createElement('h5');
    const bodyComment = document.createElement('p');


    commentItem.classList.add('bg-success', 'm-2', 'bg-warning');
    commentItem.style.maxWidth = '500px';
    commentItem.style.padding = '30px 40px';
    commentItem.style.listStyleType = 'none';
    commentItem.style.borderRadius = '10px';
    nameCommnet.classList.add('text-success');
    mailComment.classList.add('text-success');
  
    nameCommnet.textContent = items.name;
    mailComment.textContent = items.email;
    bodyComment.textContent = items.body;

    commentItem.append(commentHeader);
    commentHeader.append(nameCommnet);
    commentHeader.append(mailComment);
    commentItem.append(bodyComment);

    return commentItem;
  } 

  window.createListBlogApp = createListBlogApp;
  window.createArticleBlogApp = createArticleBlogApp;
  
})();