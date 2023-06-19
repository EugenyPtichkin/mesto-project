export default class UserInfo {
    constructor(nameSelector, infoSelector, avatarSelector) {
        this._nameSelector = nameSelector;
        this._infoSelector = infoSelector;
        this._avatarSelector = avatarSelector;
        this._nameItem = document.querySelector(this._nameSelector);
        this._infoItem = document.querySelector(this._infoSelector);
        this._avatarItem = document.querySelector(this._avatarSelector);
    }
    getUserInfo() {
        return {
            user_name: this._nameItem.textContent,      //свойства должны быть = name из html!
            user_occupation: this._infoItem.textContent //свойства должны быть = name из html!
        }
    }
    setUserInfo({name, info, avatar}) {
        this._nameItem.textContent = name;
        this._infoItem.textContent = info;
        //this._avatarItem.src = avatar;
        this.setAvatarInfo({avatar});
    }
    
    setAvatarInfo({avatar}) {
        this._avatarItem.src = avatar;
    }
}
