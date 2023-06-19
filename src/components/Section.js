export default class Section {
    constructor({ renderer }, containerSelector) {  //items приходит после объявления, а не как в примере из констант
        //this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    addItem(element) { //функция вставки в разметку
        this._container.prepend(element);
    }
    renderItems(items, id) { //перебор по списку карточек с вызовом внешней функции
        items.forEach((item) => {
            this._renderer(item, id);
        });
    }
}