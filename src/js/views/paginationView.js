import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = '';
  _message = '';

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1 and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupButton(currPage, 'next');
    }
    //Last page
    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupButton(currPage, 'prev');
    }
    //Other page
    if (currPage < numPages) {
      return this._generateMarkupButton(currPage);
    }
    //Page 1 and there are NO other pages (all other condition are already check so this is left)
    return '';
  }

  _generateMarkupButton(currPage, direction = '') {
    const nextBtn = `
          <button data-goto="${
            currPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    const prevBtn = `
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>`;

    if (direction === 'prev') return prevBtn;
    if (direction === 'next') return nextBtn;
    return prevBtn + nextBtn;
  }
}

export default new PaginationView();
