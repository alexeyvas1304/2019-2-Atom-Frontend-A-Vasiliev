/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>
    
    
        .begin {
        background-color: purple;
        border: 2px solid black;
        height: 10vh;
        display: flex;
        }
        
        .buttonback {
        width:60px;
        margin:15px;
        cursor: pointer;
        border-radius: 50px;
        overflow: hidden;
        }
        
        
        
        .info {
        flex:15;
        }
        
       
        
        .partner {
        color: white;
        text-align: center;
        margin-bottom: 10px;
        transition: color 2s ease;
        }
        
        .partner:hover {
        color:black;
        }
        
        
        
        .state {
        font-size: 14pt;
        text-align: center;
        color: white;
        }
        
        
        
        
        
        .window {
        background-color: white;
        border-bottom: 0px solid black;
        display:flex;
        flex-direction: column-reverse;
        align-items: flex-end;
        height:82vh;
        overflow: scroll;
        }
        
        
        end {
        height:8vh;
            flex:1;
            background-color: purple;
        }
        

        input[type=submit] {
            visibility: collapse;
        }
        
        
        @keyframes fadeOut {
         0%  { opacity: 0; }
         10% { opacity: 0.1; }
         90% { opacity: 0.9;}
         100% { opacity: 1; }
            }
            
        message-block {
        animation: fadeOut 1s;
        }
        
        .first {
        display:None;
        }
        
    </style>
    
    <form>
    
        <div class = "begin">
            <img class = 'buttonback' src = "https://image.flaticon.com/icons/png/512/12/12104.png">
            <div class="info">
              <h1 class = "partner">АЛЕКСЕЙ ВАСИЛЬЕВ</h1 class = "partner">
              <div class = "state">в сети</div>
            </div>
        </div>
        <div class = "window">
        <message-block class = "first" content = "Привет. Добро пожаловать в чат" time = "17:00:00"></message-block>
</div>    
        <div class = "end">
            <form-input name="message-text" placeholder="Введите сообщение"></form-input>
        </div>
        
    </form>
`;

class MessageForm extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$form = this._shadowRoot.querySelector('form');
        this.$input = this._shadowRoot.querySelector('form-input');
        this.$window = this._shadowRoot.querySelector('.window');
        this.$button = this._shadowRoot.querySelector('.buttonback');
        this.$firstMessage = this._shadowRoot.querySelector('message-block');

        this.$form.addEventListener('submit', this.onSubmit.bind(this));
        this.$form.addEventListener('keypress', this.onKeyPress.bind(this));
        this.$button.addEventListener('click', this.onButton.bind(this));
    }

    connectedCallback() {
        const messages = localStorage.getItem('history');
        this.messages = messages ? JSON.parse(messages) : [];
        for (let i = this.messages.length - 1; i >= 0; i--) {
            const $message = document.createElement('message-block');
            $message.setAttribute('content', this.messages[i][1]);
            $message.setAttribute('time', this.messages[i][2]);
            this.$window.insertBefore($message, this.$firstMessage);
        }
    }

    onButton() {
        this.dispatchEvent(new Event('backButtonFromDialog'));
    }


    onSubmit(event) {
        event.preventDefault();
        this.$firstMessage = this.shadowRoot.querySelector('message-block');

        if (this.$input.value.trim() !== '') {
            const content = this.$input.value;
            const Data = new Date();
            let Hour = Data.getHours();
            if (String(Hour).length === 1) {
                Hour = '0' + Hour;
            }
            let Minutes = Data.getMinutes();
            if (String(Minutes).length === 1) {
                Minutes = '0' + Minutes;
            }
            let Seconds = Data.getSeconds();
            if (String(Seconds).length === 1) {
                Seconds = '0' + Seconds;
            }
            const time = Hour + ':' + Minutes + ':' + Seconds;
            const author = 'Алексей';


            this.messages.push([author, content, time]);
            localStorage.setItem('history', JSON.stringify(this.messages));

            const $message = document.createElement('message-block');
            $message.setAttribute('content', content);
            $message.setAttribute('time', time);
            this.$window.insertBefore($message, this.$firstMessage);
            this.$firstMessage = this.shadowRoot.querySelector('message-block');


            this.$input.value = '';
            this.$window.scrollTo(0, 10 ** 20);
        }
    }

    onKeyPress(event) {
        if (event.keyCode === 13) {
            this.$form.dispatchEvent(new Event('submit'));
        }
    }
}


customElements.define('message-form', MessageForm);
