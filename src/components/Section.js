export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    addItem(element) { //функция вставки в разметку
        this._container.prepend(element);
    }
    renderItems(id) { //перебор по списку карточек с вызовом внешней функции
        this._renderedItems.forEach((item) => {  
            this._renderer(item, id);
        });
    }
}