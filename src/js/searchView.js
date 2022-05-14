class SearchView {
  _parentEl = document.querySelector(".search");
  getQuery() {
    console.log("get query called");
    const query = this._parentEl.querySelector(".search__field").value;
    this._clearInput;
    return query;
  }

  #clearInput() {
    this._parentEl.querySelector(".search__field").value = "";
  }
  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      console.log(
        "submit fucntionality , now caaling handler funcrtion",
        handler
      );
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
