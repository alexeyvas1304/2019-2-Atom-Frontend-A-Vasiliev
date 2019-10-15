/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        input {
            font-size: 45px;
            width: calc(100% - 4px);
            height:100%;
            width: 100%;
            border-top: 3px solid purple;
            padding:4px;
            
        }
        
        
    </style>
    <input type="text">
`;

class FormInput extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$input = this.shadowRoot.querySelector('input');
    }

    static get observedAttributes() {
        return ['name', 'value', 'placeholder', 'disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.$input.setAttribute(name, newValue);
    }

    get value() {
        return this.$input.value;
    }

  set value(newValue) {
    this.$input.value = newValue;
  }
}

customElements.define('form-input', FormInput);
