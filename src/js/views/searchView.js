import View from "./View";

class SearchView extends View {
    _parentElement = document.querySelector('.search');
    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }
    _clearInput() {
        this._parentElement.querySelector('.search__field').value = "";
    }
    adhandlerSearch(handler) {

        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();

        })

    }

}

export default new SearchView()