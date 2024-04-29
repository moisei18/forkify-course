import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    // Запускаем отслеживание изменений в элементе
    // this.observer.observe(this.element, this.config);
  }

  showWindow() {
    this._window.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }

  hideWindow() {
    this._window.classList.add('hidden');
    this._overlay.classList.add('hidden');
  }

  addForm() {
    this._parentElement.innerHTML = '';
    const markup = `<div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="TEST23" required name="title" type="text" />
    <label>URL</label>
    <input value="TEST23" required name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input value="TEST23" required name="image" type="text" />
    <label>Publisher</label>
    <input value="TEST23" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="23" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="23" required name="servings" type="number" />
  </div>
  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input
      value="0.5,kg,Rice"
      type="text"
      required
      name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 2</label>
    <input
      value="1,,Avocado"
      type="text"
      name="ingredient-2"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 3</label>
    <input
      value=",,salt"
      type="text"
      name="ingredient-3"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 4</label>
    <input
      type="text"
      name="ingredient-4"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 5</label>
    <input
      type="text"
      name="ingredient-5"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 6</label>
    <input
      type="text"
      name="ingredient-6"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
  </div>
  <button class="btn upload__btn">
    <svg>
      <use href="${icons}#icon-upload-cloud"></use>
    </svg>
    <span>Upload</span>
  </button>`;
    document.querySelector('.upload').insertAdjacentHTML('beforeend', markup);
  }

  clear() {
    this._parentElement.innerHTML = '';
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', () => this.addForm());
    this._btnOpen.addEventListener('click', this.showWindow.bind(this));
    this._parentElement.addEventListener('submit', this.deleteMessage());
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', () => this.hideWindow(this));
    this._overlay.addEventListener('click', () => this.hideWindow(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  deleteMessage() {
    const parentDiv = document.querySelector('.upload');
    const message = parentDiv.querySelector('.message');
    const spinner = parentDiv.querySelector('.spinner');

    parentDiv.contains(message) ? parentDiv.removeChild(message) : '';
    parentDiv.contains(spinner) ? parentDiv.removeChild(spinner) : '';
  }

  _generateMarkup() {}
  // // Создаем новый экземпляр MutationObserver
  // // Выбираем элемент, который нужно отслеживать
  // element = document.querySelector('.add-recipe-window');
  // observer = new MutationObserver(function (mutationsList) {
  //   for (let mutation of mutationsList) {
  //     // Проверяем, является ли изменение добавлением или удалением класса
  //     if (
  //       mutation.type === 'attributes' &&
  //       mutation.attributeName === 'class'
  //     ) {
  //       // Проверяем, содержит ли элемент определенный класс
  //       if (
  //         document
  //           .querySelector('.add-recipe-window')
  //           .classList.contains('hidden')
  //       ) {
  //         console.log('Элемент содержит класс hidden');
  //       } else {
  //         console.log('Элемент не содержит класс hidden');
  //       }
  //     }
  //   }
  // });

  // // Настраиваем настройки для MutationObserver
  // config = { attributes: true };
}

export default new AddRecipeView();
