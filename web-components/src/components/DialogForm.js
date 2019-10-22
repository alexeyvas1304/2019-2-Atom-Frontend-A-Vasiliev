const template = document.createElement('template');
template.innerHTML = `
    <style>
    
    
        .begin {
        background-color: purple;
        border: 2px solid black;
        height: 10vh;
        display:flex;
        }
        
        
        .header {
        color: white;
        text-align: center;
        margin-bottom: 10px;
        flex:19;
        }
        
        .burger {
        flex:1.2;
        overflow: hidden;
        
        }
        
        .search {
        flex:1.2;
        overflow: hidden;
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
        width: 50px;
        float: right;
        margin-right: 15px;
        }
        

        
        
        .messages {
        display:None;
        }
        
    </style>
    
    <form>
        <div class = "dialogs">
            <div class = "begin">
                <img class = "burger" src="https://css-tricks.com/wp-content/uploads/2012/10/threelines.png">
                <h1 class = "header">СПИСОК ЧАТОВ</h1 class = "header">
                <img class = "search" src="https://png.pngtree.com/element_origin_min_pic/00/00/07/165789f61e99eea.jpg" >
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
        this.shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.$form = this.shadowRoot.querySelector('form');
        this.$window = this.shadowRoot.querySelector('dialog-block');
        this.$buttonNewChat = this.shadowRoot.querySelector('.newchat');
        this.$messageForm = this.shadowRoot.querySelector('message-form');

        this.$dialogs = this.shadowRoot.querySelector('.dialogs');
        this.$messages = this.shadowRoot.querySelector('.messages');

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

        this.$messages.setAttribute('style', 'display: None');
        this.$dialogs.setAttribute('style', 'display:');
    }
}


customElements.define('dialog-form', DialogForm);
