const template = document.createElement("template");
template.innerHTML = `
    <style>
        @import "style.css";
    </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer"
    />

    <div class="search-wrapper">
        <div class="input-row">
            <input  placeholder="Type a message..."id="inputField"></input>
                <button id="promptResponseBtn"><i class="fa-sharp fa-solid fa-search btn-icon"></i></button>
        </div>
  
        <div id="output">
        </div>
        
        <div id="loading-animation">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
     </div>
    </div>

`;

class gptSearchBar extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));


    }


    async promptResponse() {
        let msgConent = this.inputElement.value
        this.inputElement.value = ''

        this.outputElement.style.opacity = "0";
        this.loadingElement.style.visibility = "visible";


        if (msgConent) {
            let uri = '/prompt/user/' + msgConent;
            const response = await fetch(uri, {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' }
            })

            this.loadingElement.style.visibility = "hidden";
            this.outputElement.innerText = await response.text();
            this.outputElement.style.opacity = "1";

        }

    }



    connectedCallback() {
        this.loadingElement = this.shadowRoot.querySelector('#loading-animation');
        this.inputElement = this.shadowRoot.querySelector('#inputField');
        this.outputElement = this.shadowRoot.querySelector("#output");
        let prompBtn = this.shadowRoot.querySelector('#promptResponseBtn');
        prompBtn.addEventListener("click", () => this.promptResponse());


        this.inputElement.focus();
        this.inputElement.select();
        this.inputElement.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                prompBtn.click();
            }
        });
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector("#generateRes").removeEventListener();
        this.shadowRoot.querySelector("#inputField").removeEventListener();
    }
}

window.customElements.define("gpt-search-bar", gptSearchBar);