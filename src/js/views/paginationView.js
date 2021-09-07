import View from './View';
import icons from 'url:../../img/icons.svg'; //parcel 2 style

class PaginationView extends View {

    _parentElement = document.querySelector('.pagination');

    adhandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            console.log(btn);
            const gotoPage = +btn.dataset.goto;
            console.log(gotoPage);
            handler(gotoPage)
        })
    }
    _generatedMarkup() {

        const curPage = this._data.page;
        //get total number of pages 
        const numPages = Math.ceil(this._data.results.length / this._data.resultPerPage);
        // page 1 , and there are  other pages
        if (curPage === 1 && numPages > 1) {
            return this._nextButton(curPage);

        }
        //last page 
        if (curPage === numPages && numPages > 1) {
            return this._previousButton(curPage);
        }
        //other pages
        if (curPage < numPages) {

            return this._prevNextButton(curPage);


        }
        //page 1 and there are no other pages
        return ''

    }
    _previousButton(curPage) {
        return `<button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>`
    }
    _nextButton(curPage) {
        return `
      <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `
    }
    _prevNextButton(curPage) {
        return `
        <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      <button  data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
        `;
    }



}
export default new PaginationView();