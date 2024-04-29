import View from './View.js';
import * as model from '../model.js';
import resultsView from './resultsView.js';
import { state } from '../model.js';
import icons from 'url:../../img/icons.svg';

class SearchView extends View {
  _parentEl = document.querySelector('.search');
  _btnSort;
  sortParameter = 'name';

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    return (this._parentEl.querySelector('.search__field').value = '');
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  renderSortButton(par) {
    const divElement = document.querySelector('.sort');
    if (divElement) divElement.remove();
    const markup = `<div class="sort">
    <span class="sort--parameter">Sorted by ${par}</span>
    <button class="btn--sort">
    <svg class="sort__icon">
    <use href="${icons}#icon-sort"></use>
    </svg>
    </button>
    </div>`;
    document
      .querySelector('.search-results')
      .insertAdjacentHTML('afterbegin', markup);

    this._btnSort = document.querySelector('.btn--sort');

    this.addHandlerSortButton();
  }

  addHandlerSortButton() {
    this._btnSort.addEventListener('click', () => {
      const sortParameterElement = document.querySelector('.sort--parameter');
      const hasName = sortParameterElement.textContent.includes('name');
      const hascookingTime =
        sortParameterElement.textContent.includes('cooking time');
      const hasIngredients = sortParameterElement.textContent.includes(
        'the number of ingredients'
      );
      if (hasName) {
        this.renderSortButton('cooking time');
        this.sortParameter = 'cooking time';
      } else if (hascookingTime) {
        this.renderSortButton('the number of ingredients');
        this.sortParameter = 'the number of ingredients';
      } else if (hasIngredients) {
        this.renderSortButton('name');
        this.sortParameter = 'name';
      }
      if (this.sortParameter === 'name') {
        this.sortParameter === 'cooking time';
        state.search.results.sort((a, b) => a.title.localeCompare(b.title));
        resultsView.render(model.getSearchResultsPage());
      } else if (this.sortParameter === 'cooking time') {
        this.sortParameter === 'the number of ingredients';
        state.search.results.sort(
          (a, b) => Number(a.cookingTime) - Number(b.cookingTime)
        );
        resultsView.render(model.getSearchResultsPage());
      } else if (this.sortParameter === 'the number of ingredients') {
        this.sortParameter === 'name';
        state.search.results.sort((a, b) => a.ingredients - b.ingredients);
        resultsView.render(model.getSearchResultsPage());
      }
    });
  }
}

export default new SearchView();
