(()=>{"use strict";function e(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function t(t,r){return fetch(t,r).then(e)}function r(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?n:r}function n(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var o=t.submitter,i=o.textContent;r(!0,o,i,n),e().then((function(){t.target.reset()})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){r(!1,o,i)}))}function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==o(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===o(i)?i:String(i)),n)}var i}var a=function(){function e(t){var r=t.baseUrl,n=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.baseUrl=r,this.headers=n}var r,n;return r=e,(n=[{key:"getUserInfo",value:function(){return t("".concat(this.baseUrl,"/users/me"),{method:"GET",headers:this.headers})}},{key:"getInitialCards",value:function(){return t("".concat(this.baseUrl,"/cards"),{method:"GET",headers:this.headers})}},{key:"changeUserInfo",value:function(e,r){return t("".concat(this.baseUrl,"/users/me"),{method:"PATCH",headers:this.headers,body:JSON.stringify({name:e,about:r})})}},{key:"addNewCard",value:function(e,r){return t("".concat(this.baseUrl,"/cards"),{method:"POST",headers:this.headers,body:JSON.stringify({name:e,link:r})})}},{key:"deleteCard",value:function(e){return t("".concat(this.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this.headers})}},{key:"addLike",value:function(e){return t("".concat(this.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:this.headers})}},{key:"deleteLike",value:function(e){return t("".concat(this.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:this.headers})}},{key:"changeAvatar",value:function(e){return t("".concat(this.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this.headers,body:JSON.stringify({avatar:e})})}}])&&i(r.prototype,n),Object.defineProperty(r,"prototype",{writable:!1}),e}();function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function u(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==c(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==c(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===c(o)?o:String(o)),n)}var o}var l=function(){function e(t,r,n){var o=t.data,i=t.handleCardClick,a=t.handleLikeClick,c=t.handleDeleteClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._placeValue=o.name,this._linkValue=o.link,this._cardId=o._id,this._cardLikes=o.likes,this._cardOwner=o.owner,this._handleCardClick=i,this._handleLikeClick=a,this._handleDeleteClick=c,this._cardTemplateSelector=r,this._profileId=n}var t,r;return t=e,(r=[{key:"_checkPreviousLikes",value:function(){var e=this,t=this._cardLikes.some((function(t){return t._id===e._profileId}));return t?this._cardLike.classList.add("card__like-active"):this._cardLike.classList.remove("card__like-active"),t}},{key:"_getTemplate",value:function(){return document.querySelector(this._cardTemplateSelector).content.querySelector(".card").cloneNode(!0)}},{key:"setLikes",value:function(e){this._cardLikeValue.textContent=e.length,this._cardLikes=e,this._cardLike.classList.contains("card__like-active")?this._cardLike.classList.remove("card__like-active"):this._cardLike.classList.add("card__like-active")}},{key:"generate",value:function(){return this._element=this._getTemplate(),this._image=this._element.querySelector(".card__image"),this._image.src=this._linkValue,this._image.alt="img = ".concat(this._placeValue),this._text=this._element.querySelector(".card__text"),this._text.textContent=this._placeValue,this._cardLikeValue=this._element.querySelector(".card__like-value"),this._cardLike=this._element.querySelector(".card__like"),this._cardDelete=this._element.querySelector(".card__delete"),this._cardOwner._id!==this._profileId&&this._cardDelete.classList.add("card__delete_hidden"),this.setLikes(this._cardLikes),this._checkPreviousLikes(),this._setCardEventListener(),this._setLikeEventListener(),this._setDeleteEventListener(),this._element}},{key:"removeCard",value:function(){this._element.remove()}},{key:"_setCardEventListener",value:function(){var e=this;this._image.addEventListener("click",(function(){e._handleCardClick(e._placeValue,e._linkValue)}))}},{key:"_setLikeEventListener",value:function(){var e=this;this._cardLike.addEventListener("click",(function(){e._handleLikeClick(e._cardId,e._checkPreviousLikes(),e)}))}},{key:"_setDeleteEventListener",value:function(){var e=this;this._cardDelete.addEventListener("click",(function(){e._handleDeleteClick(e._cardId,e)}))}}])&&u(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function f(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==s(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===s(o)?o:String(o)),n)}var o}var p=function(){function e(t,r){var n=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=n,this._container=document.querySelector(r)}var t,r;return t=e,(r=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(e,t){var r=this;e.forEach((function(e){r._renderer(e,t)}))}}])&&f(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function d(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==y(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==y(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===y(o)?o:String(o)),n)}var o}var v=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupSelector=t,this._popupItem=document.querySelector(this._popupSelector),this._closeBtn=this._popupItem.querySelector(".popup__button-close")}var t,r;return t=e,(r=[{key:"open",value:function(){var e=this;this._popupItem.classList.add("popup_opened"),document.addEventListener("keydown",(function(t){return e._handleEscClose(t)})),this._popupItem.addEventListener("click",(function(t){return e._closePopupModalListener(t)}))}},{key:"close",value:function(){var e=this;this._popupItem.classList.remove("popup_opened"),document.removeEventListener("keydown",(function(t){return e._handleEscClose(t)})),this._popupItem.removeEventListener("click",(function(t){return e._closePopupModalListener(t)}))}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_closePopupModalListener",value:function(e){e.currentTarget===e.target&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._closeBtn.addEventListener("click",(function(){return e.close()}))}}])&&d(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}function h(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==m(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==m(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===m(o)?o:String(o)),n)}var o}function b(){return b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=S(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},b.apply(this,arguments)}function _(e,t){return _=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},_(e,t)}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}var g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_(e,t)}(a,e);var t,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(n);if(o){var r=S(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===m(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function a(e,t){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,e))._handleSubmit=t,r._formItem=r._popupItem.querySelector(".popup__form"),r._formInputs=r._formItem.querySelectorAll(".popup__input"),r._formSubmitButton=r._formItem.querySelector(".popup__button-submit"),r}return t=a,(r=[{key:"close",value:function(){b(S(a.prototype),"close",this).call(this),this._formItem.reset()}},{key:"_getInputValues",value:function(){var e={};return this._formInputs.forEach((function(t){e[t.name]=t.value})),e}},{key:"setEventListeners",value:function(){var e=this;b(S(a.prototype),"setEventListeners",this).call(this),this._formItem.addEventListener("submit",(function(t){t.preventDefault(),e._handleSubmit(e._getInputValues(),t)}))}}])&&h(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),a}(v);function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function w(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==k(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==k(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===k(o)?o:String(o)),n)}var o}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},E.apply(this,arguments)}function L(e,t){return L=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},L(e,t)}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}var j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&L(e,t)}(a,e);var t,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(n);if(o){var r=O(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===k(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._zoomImage=t._popupItem.querySelector(".popup__zoom-image"),t._zoomTitle=t._popupItem.querySelector(".popup__zoom-title"),t}return t=a,(r=[{key:"open",value:function(e,t){E(O(a.prototype),"open",this).call(this),this._zoomImage.src=t,this._zoomImage.alt="".concat(e),this._zoomTitle.textContent=e}}])&&w(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),a}(v);function P(e){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P(e)}function C(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==P(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==P(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===P(o)?o:String(o)),n)}var o}function I(){return I="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=q(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},I.apply(this,arguments)}function T(e,t){return T=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},T(e,t)}function q(e){return q=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},q(e)}var R=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&T(e,t)}(a,e);var t,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=q(n);if(o){var r=q(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===P(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function a(e,t){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,e))._handleSubmit=t,r._formItem=r._popupItem.querySelector(".popup__form"),r._formSubmitButton=r._formItem.querySelector(".popup__button-submit"),r}return t=a,(r=[{key:"setEventListeners",value:function(){var e=this;I(q(a.prototype),"setEventListeners",this).call(this),this._formSubmitButton.addEventListener("submit",(function(t){t.preventDefault(),e._handleSubmit()}))}}])&&C(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),a}(v);function B(e){return B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},B(e)}function x(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==B(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==B(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===B(o)?o:String(o)),n)}var o}var U=function(){function e(t,r,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameSelector=t,this._infoSelector=r,this._avatarSelector=n,this._nameItem=document.querySelector(this._nameSelector),this._infoItem=document.querySelector(this._infoSelector),this._avatarItem=document.querySelector(this._avatarSelector)}var t,r;return t=e,(r=[{key:"getUserInfo",value:function(){return{user_name:this._nameItem.textContent,user_occupation:this._infoItem.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,r=e.info,n=e.avatar;this._nameItem.textContent=t,this._infoItem.textContent=r,this._avatarItem.src=n}},{key:"setAvatarInfo",value:function(e){var t=e.avatar;this._avatarItem.src=t}}])&&x(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function D(e){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D(e)}function V(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==D(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==D(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===D(o)?o:String(o)),n)}var o}var A=function(){function e(t,r){var n=t.inputSelector,o=t.submitButtonSelector,i=t.inactiveButtonClass,a=t.inputErrorClass,c=t.errorClass;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.formSelector=r,this.inputSelector=n,this.submitButtonSelector=o,this.inactiveButtonClass=i,this.inputErrorClass=a,this.errorClass=c}var t,r;return t=e,(r=[{key:"_showInputError",value:function(e,t){var r=this.formSelector.querySelector(".".concat(e.id,"-error"));e.classList.add(this.inputErrorClass),r.classList.add(this.errorClass),r.textContent=t}},{key:"_hideInputError",value:function(e){var t=this.formSelector.querySelector(".".concat(e.id,"-error"));e.classList.remove(this.inputErrorClass),t.classList.remove(this.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(e,t){this._hasInvalidInput(e)?(t.disabled=!0,t.classList.add(this.inactiveButtonClass)):(t.disabled=!1,t.classList.remove(this.inactiveButtonClass))}},{key:"_setEventListeners",value:function(){var e=this,t=Array.from(this.formSelector.querySelectorAll(this.inputSelector)),r=this.formSelector.querySelector(this.submitButtonSelector);t.forEach((function(n){e.inputSelector&&(r.disabled=!0,r.classList.add(e.inactiveButtonClass)),n.addEventListener("input",(function(){e._toggleButtonState(t,r),e._checkInputValidity(n)}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&V(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}(),z=document.querySelector(".profile__button-edit"),N=document.querySelector(".popup_profile").querySelectorAll(".popup__input"),M=document.querySelector(".profile__button-avatar"),J=document.querySelector(".profile__button-add"),G=document.querySelector(".popup_delete").querySelector(".popup__button-submit"),H={inputSelector:".popup__input",submitButtonSelector:".popup__button-submit",inactiveButtonClass:"popup__button-submit_inactive",inputErrorClass:"popup__input_type-error",errorClass:"popup__input-error_active"},$=document.querySelector(".popup_add"),F=document.querySelector(".popup_profile"),K=document.querySelector(".popup_avatar-update");function Q(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var W="",X=new a({baseUrl:"https://nomoreparties.co/v1/plus-cohort-24",headers:{authorization:"72c9f5e3-e302-4291-9e92-5cdf6c091286","Content-Type":"application/json"}}),Y=new j(".popup_zoom");Y.setEventListeners();var Z=new g(".popup_add",(function(e,t){n((function(){return X.addNewCard(e["place-name"],e["img-link"]).then((function(e){var t=ue(e,W);oe.addItem(t),Z.close()}))}),t)}));Z.setEventListeners();var ee=new g(".popup_profile",(function(e,t){n((function(){return X.changeUserInfo(e.user_name,e.user_occupation).then((function(e){ne.setUserInfo({name:e.name,info:e.about,avatar:e.avatar}),ee.close()}))}),t)}));ee.setEventListeners();var te=new g(".popup_avatar-update",(function(e,t){n((function(){return X.changeAvatar(e["img-link"]).then((function(e){ne.setAvatarInfo({avatar:e.avatar}),te.close()}))}),t)}));te.setEventListeners();var re=new R(".popup_delete",(function(){}));re.setEventListeners();var ne=new U(".profile__name",".profile__text",".profile__image"),oe=new p({renderer:function(e,t){oe.addItem(ue(e,t))}},".cards");function ie(e,t,r){t?X.deleteLike(e).then((function(e){r.setLikes(e.likes)})).catch((function(e){console.log(e)})):X.addLike(e).then((function(e){r.setLikes(e.likes)})).catch((function(e){console.log(e)}))}function ae(e,t){Y.open(e,t)}function ce(e,t){re.open(),new Promise((function(e){G.onclick=function(){e()}})).then((function(){X.deleteCard(e).then((function(e){console.log(e),re.close(),t.removeCard()})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))}function ue(e,t){return new l({data:e,handleCardClick:ae,handleLikeClick:ie,handleDeleteClick:ce},"#card-template",t).generate()}z.addEventListener("click",(function(){ee.open();var e=ne.getUserInfo();N.forEach((function(t){t.value=e[t.name]}))})),M.addEventListener("click",(function(){te.open()})),J.addEventListener("click",(function(){Z.open()})),Promise.all([X.getUserInfo(),X.getInitialCards()]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i,a,c=[],u=!0,l=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=i.call(r)).done)&&(c.push(n.value),c.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return c}}(t,r)||function(e,t){if(e){if("string"==typeof e)return Q(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Q(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],i=n[1];console.log(o),console.log(i),ne.setUserInfo({name:o.name,info:o.about,avatar:o.avatar}),W=o._id,i.reverse(),oe.renderItems(i,W)})).catch((function(e){console.log(e)})),document.addEventListener("animationstart",(function(e){"fade-in"===e.animationName&&e.target.classList.add("did-fade-in")})),document.addEventListener("animationend",(function(e){"fade-out"===e.animationName&&e.target.classList.remove("did-fade-in")}));var le=new A(H,$),se=new A(H,F),fe=new A(H,K);le.enableValidation(),se.enableValidation(),fe.enableValidation()})();