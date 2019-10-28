/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>
    
    
        .begin {
        background-color: purple;
        border: 2px solid black;
        height: 8vh;
        display: flex;
        }
        
        
        .header {
        color: white;
        text-align: center;
        margin-bottom: 10px;
        transition: all 1s ease-in-out;
        flex:20;
        }
        
        .header:hover {
        color:black;
        }
        
        
        
        .burger {
        overflow: hidden;
        cursor:pointer;
        width:60px;
        height:72px;
        margin-left: 10px;
        }
        
        .search {
        overflow: hidden;
        margin:5px;
        cursor:pointer;
        width:60px;
        height:60px;
        }
        
       
        
        .window {
        background-color: white;
        border-bottom: 0px solid black;
        display:flex;
        flex-direction: column;
        align-items: center;
        height:80vh;
        }
        
        
        end {
        height:10vh;
            flex:1;
            background-color: purple;
        }
        
        .newchat {
        width: 60px;
        float: right;
        margin-right: 15px;
        cursor: pointer;
        border-radius: 50px;
        transform:rotate(0deg);
        transition: transform 1s ease;
        animation: pulse 2s linear infinite;
        }
        
        
        
        .newchat:hover {
        transform: rotate(180deg);
        animation: none;
        }
        
        @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 #bbbbbb;
        }
        
        50% {
            box-shadow: 0 0 0 10px #bbbbbb;
        }
        
        100% {
            box-shadow: 0 0 0 0 #bbbbbb;
        }
        }

        
        
        .messages {
        display:None;
        }
        
        dialog-block {
        cursor: pointer;
        }
        
        
        
        
        
    </style>
    
    <form>
        <div class = "dialogs">
            <div class = "begin">
                <img class = "burger" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png">
                <h1 class = "header">СПИСОК ЧАТОВ</h1 class = "header">
                <img class = "search" src="https://elize.ru/img/icons/zoom.png" >
            </div>
            <div class = "window">
                <dialog-block></dialog-block>
            </div>  
            <div class = "end">
                <img class = "newchat" src="https://icon-library.net/images/plus-button-icon/plus-button-icon-27.jpg">
            </div>  
        </div>
        
        <div class = "messages">
        <message-form></message-form>
        </div>
        
    </form>
`;

class DialogForm extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$form = this._shadowRoot.querySelector('form');
        this.$window = this._shadowRoot.querySelector('dialog-block');
        this.$buttonNewChat = this._shadowRoot.querySelector('.newchat');
        this.$messageForm = this._shadowRoot.querySelector('message-form');

        this.$dialogs = this._shadowRoot.querySelector('.dialogs');
        this.$messages = this._shadowRoot.querySelector('.messages');

        if (localStorage.getItem('history') !== null) {
            const header = JSON.parse(localStorage.getItem('history'))[JSON.parse(localStorage.getItem('history')).length - 1][0];
            const content = JSON.parse(localStorage.getItem('history'))[JSON.parse(localStorage.getItem('history')).length - 1][1];
            const time = JSON.parse(localStorage.getItem('history'))[JSON.parse(localStorage.getItem('history')).length - 1][2];
            this.$window.setAttribute('header', header);
            this.$window.setAttribute('content', content);
            this.$window.setAttribute('time', time);
        }

        this.$window.addEventListener('click', this.onButton.bind(this));
        this.$messageForm.addEventListener('backButtonFromDialog', this.backButtonFromDialog.bind(this));
    }

    onButton() {
        this.$dialogs.setAttribute('style', 'display:None');
        this.$messages.setAttribute('style', 'display:block');
    }


    backButtonFromDialog() {
        if (localStorage.getItem('history') !== null) {
            const header = JSON.parse(localStorage.getItem('history'))[JSON.parse(localStorage.getItem('history')).length - 1][0];
            const content = JSON.parse(localStorage.getItem('history'))[JSON.parse(localStorage.getItem('history')).length - 1][1];
            const time = JSON.parse(localStorage.getItem('history'))[JSON.parse(localStorage.getItem('history')).length - 1][2];
            this.$window.setAttribute('header', header);
            this.$window.setAttribute('content', content);
            this.$window.setAttribute('time', time);
        }

        this.$dialogs.setAttribute('style', 'display:');
        this.$messages.setAttribute('style', 'display: None');
    }
}


customElements.define('dialog-form', DialogForm);
