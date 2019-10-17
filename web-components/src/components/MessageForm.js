/* eslint-disable quotes */
/* eslint-disable prefer-template */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const template = document.createElement('template');
template.innerHTML = `
    <style>
    
    
        .begin {
        background-color: purple;
        border: 2px solid black;
        height: 10vh;
        }
        
        .partner {
        color: white;
        text-align: center;
        margin-bottom: 10px;
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
        flex-direction: column;
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
        
    </style>
    
    <form>
    
        <div class = "begin">
            <h1 class = "partner">АЛЕКСЕЙ ВАСИЛЬЕВ</h1 class = "partner">
            <div class = "state">в сети</div>
        </div>
        <div class = "window"></div>    
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
    this.$mainpart = this._shadowRoot.querySelector('.mainpart');
    this.$window = this._shadowRoot.querySelector('.window');

    this.$form.addEventListener('submit', this._onSubmit.bind(this));
    this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
  }

  connectedCallback() {
    const messages = localStorage.getItem('history');
    this.messages = messages ? JSON.parse(messages) : [];
    for (let i = 0; i < this.messages.length; i++) {
      const $message = document.createElement('message-block');
      $message.setAttribute('content', this.messages[i][1]);
      $message.setAttribute('time', this.messages[i][2]);
      this.$window.appendChild($message);
    }
  }

  _onSubmit(event) {
    event.preventDefault();

    if (this.$input.value.trim() !== '') {
      let content = this.$input.value;
      let Data = new Date();
      let Hour = Data.getHours();
      if (String(Hour).length == 1) {
        Hour = '0' + Hour;
      }
      let Minutes = Data.getMinutes();
      if (String(Minutes).length == 1) {
        Minutes = '0' + Minutes;
      }
      let Seconds = Data.getSeconds();
      if (String(Seconds).length == 1) {
        Seconds = '0' + Seconds;
      }
      const time = Hour + ":" + Minutes + ":" + Seconds;
      let author = "Алексей";


      this.messages.push([author, content, time]);
      localStorage.setItem('history', JSON.stringify(this.messages));

      const $message = document.createElement('message-block');
      $message.setAttribute('content', content);
      $message.setAttribute('time', time);
      this.$window.appendChild($message);


      this.$window.scrollTo(0, 10 ** 20); // не знаю, как по-другому сделать нормальный скролл
      this.$input.value = '';
    }
  }

    _onKeyPress(event) {
      if (event.keyCode == 13) {
        this.$form.dispatchEvent(new Event('submit'));
      }
    }
  }


customElements.define('message-form', MessageForm);
