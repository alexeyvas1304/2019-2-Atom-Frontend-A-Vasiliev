/* eslint-disable default-case */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const template = document.createElement('template');

template.innerHTML = `
    <style xmlns="http://www.w3.org/1999/html">
        
        
        .content {
            display: inline-block;
            font-size: 15px;
            font-family:Ubuntu;
            flex:5;
            text-align: left;
            word-wrap: break-word;
        }
        
        .time {
            width: auto;
            padding: 1px;
            margin-bottom: 1px;
            flex:1;
            text-align: right;
            overflow-wrap: normal;
        }
        
        .all {
            background-color: aqua;
            border-radius: 15px;
            width: auto ;
            max-width: 30vw;
            padding: 10px;
            margin-top: 15px;
            margin-right: 5px;
            display:flex;
            flex-direction: column;
        }
    </style>
    <div class="all">
        <div class = "content"></div>
        <div class = "time"></div>
    </div>
`;

class Message extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$all = this._shadowRoot.querySelector('.all');

    this.$author = this._shadowRoot.querySelector('.author');
    this.$content = this._shadowRoot.querySelector('.content');
    this.$time = this._shadowRoot.querySelector('.time');
  }

  static get observedAttributes() {
    return ['author', 'content', 'time'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'content':
        this.$content.innerHTML = newValue;
        break;

      case 'time':
        this.$time.innerHTML = newValue;
        break;

      case 'author':
        this.$author.innerHTML = newValue;
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

  get author() {
    return this.$author.value;
  }

  set author(newValue) {
    this.$author.innerHTML = newValue;
  }
}

customElements.define('message-block', Message);
