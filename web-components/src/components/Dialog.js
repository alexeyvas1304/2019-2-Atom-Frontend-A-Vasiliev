/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');

template.innerHTML = `
    <style xmlns="http://www.w3.org/1999/html">


    .all {
        background-color: white;
        border-bottom: 3px purple solid;
        width: 100vw ;
        padding: 10px;
        margin-right: 5px;
        display:flex;
        height:10vh ;
    }
    
    .all:hover {
    background-color: #d8bfd8;
    }

    .first {
        flex:5;
        display: flex;
    }

    .second {
        flex:10;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .third {
        flex:1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }


    .avatar {
        width: 100px;
        margin-left: 10px;
    }

    .header {
        flex:7;
        margin-top: 5px;
        margin-left: 15px;
        color: purple;
        font-size: 24px;
    }



    .content {
        display: block;
        font-size: 15px;
        font-family:Ubuntu;
        flex:30;
        text-align: left;
        margin-top: 5px;
        margin-left: 15px;
        word-wrap: break-word;
        overflow: hidden;
    }



    .time {
        flex:4;
        float: right;
        margin-right: 15px;
    }


    .sign {
        overflow: hidden;
        flex:2;
        width:35px;
        height:35px;
        margin-right:15px;
    }

</style>
<div class="all">
    <div class = "first">
        <img class = "avatar" src="https://cdn-st2.rtr-vesti.ru/vh/pictures/bp/115/646/5.jpg";
    </div>
    <div class = "second">
        <div class = "header">Служба поддержки</div>
        <div class = "content">Начните диалог</div>
    </div>
    <div class = "third">
        <div class = "time">17:00:00</div>
        <img class = "sign" src="https://icon-library.net/images/green-check-mark-icon-png/green-check-mark-icon-png-20.jpg">
    </div>
</div>
`;

class Dialog extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$all = this._shadowRoot.querySelector('.all');

        this.$time = this._shadowRoot.querySelector('.time');
        this.$content = this._shadowRoot.querySelector('.content');
        this.$header = this._shadowRoot.querySelector('.header');
    }

    static get observedAttributes() {
        return ['time', 'content', 'header'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
        case 'time':
            this.$time.innerHTML = newValue;
            break;

        case 'content':
            this.$content.innerHTML = newValue;
            break;

        case 'header':
            this.$header.innerHTML = newValue;
            break;
        }
    }

    get content() {
        return this.$content.value;
    }

    set content(newValue) {
        this.$content.innerHTML = newValue;
    }

    get time() {
        return this.$time.value;
    }

    set time(newValue) {
        this.$time.innerHTML = newValue;
    }

    get header() {
        return this.$header.value;
    }

    set header(newValue) {
        this.$header.innerHTML = newValue;
    }
}


customElements.define('dialog-block', Dialog);
