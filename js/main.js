const menuToggle = document.querySelector('#menu-toggle');
const menu = document.querySelector('.sidebar');

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUserName = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');

const postWrapper = document.querySelector('.posts');

const listUsers = [
  {
    id: '01',
    email: 'maks@mail.com',
    password: '12345',
    displayName: 'MaksJS'
  },
  {
    id: '02',
    email: 'kate@mail.com',
    password: '123',
    displayName: 'KateKillMaks'
  }
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      alert('email не валиден');
      return;
    }

    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такиими данными не найден');
    }
  },
  logOut(handler) {
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      alert('email не валиден');
      return;
    }

    if (!email.trim() || !password.trim()) {
      alert('Введите данные');
      return;
    }

    if (!this.getUser(email)) {
      const user = { email, password, displayName: email.split('@')[0] };

      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с таким email уже зарегистрирован');
    }
  },
  editUser(userName, userPhoto = '', handler) {
    if (userName) {
      this.user.displayName = userName;
    }

    if (userPhoto) {
      this.user.photo = userPhoto;
    }

    handler();
  },
  getUser(email) {
    return listUsers.find(item => item.email === email);
  },
  authorizedUser(user) {
    this.user = user;
  }
};

const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста',
      text: 'Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные тексты. То буквенных однажды продолжил не, диких наш жизни встретил живет большой предупреждал единственное что! Даже ipsum необходимыми океана свой от всех, эта, ты переписывается, они вопрос маленький подзаголовок lorem реторический свое коварный обеспечивает жаренные. Гор назад продолжил дороге первую живет это ему вдали, семь инициал последний встретил за рукопись текста обеспечивает своих он алфавит великий всемогущая силуэт? Взобравшись языком решила переписывается заманивший о жаренные пустился большого курсивных, запятой текстами лучше там живет ее, диких домах. Эта великий рот текстами имеет буквоград переулка путь единственное не взгляд алфавит.',
      tags: ['новое', 'горячее', 'мое', 'свежее', 'случайность'],
      author: 'kate@mail.com',
      date: '11.11.2020, 20:25:00',
      likes: 15,
      comments: 20
    },
    {
      title: 'Заголовок поста2',
      text: 'Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные тексты. То буквенных однажды продолжил не, диких наш жизни встретил живет большой предупреждал единственное что! Даже ipsum необходимыми океана свой от всех, эта, ты переписывается, они вопрос маленький подзаголовок lorem реторический свое коварный обеспечивает жаренные. Гор назад продолжил дороге первую живет это ему вдали, семь инициал последний встретил за рукопись текста обеспечивает своих он алфавит великий всемогущая силуэт? Взобравшись языком решила переписывается заманивший о жаренные пустился большого курсивных, запятой текстами лучше там живет ее, диких домах. Эта великий рот текстами имеет буквоград переулка путь единственное не взгляд алфавит.',
      tags: ['новое', 'горячее', 'мое', 'свежее', 'случайность'],
      author: 'maks@mail.com',
      date: '11.11.2020, 20:25:00',
      likes: 45,
      comments: 12
    }
  ]
}

function toggleAuthDom() {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
}

function showAllPosts() {
  let postsHTML = '';

  setPosts.allPosts.forEach(({ title, text, tags, author, date, likes, comments }) => {
    postsHTML += `
      <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${text}</p>
          <div class="tags">${tags}</div>
        </div>
        <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${likes}</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${comments}</span>
            </button>
            <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
            <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
          </div>
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">${author}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="" class="author-avatar"></a>
          </div>
        </div>
      </section>
    `;
  });

  postWrapper.innerHTML = postsHTML;
}

function init() {
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
    // loginForm.reset();
  });

  loginSignup.addEventListener('click', event => {
    event.preventDefault();
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
  });

  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
    loginForm.reset();
  });

  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUserName.value = setUsers.user.displayName;
  });

  editContainer.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.editUser(editUserName.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  });

  menuToggle.addEventListener('click', function (evt) {
    evt.preventDefault();
    menu.classList.toggle('visible');
  })

  showAllPosts();
  toggleAuthDom();
}

document.addEventListener('DOMContentLoaded', init);