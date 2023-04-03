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
    </div>
`;

class gptSearchBar extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }


    async promptResponse() {
        let inputElement = this.shadowRoot.querySelector('#inputField');
        let msgConent = inputElement.value
        inputElement.value = ''


        if (msgConent) {
            let uri = '/prompt/user/' + msgConent;
            const response = await fetch(uri, {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' }
            })

            let outputElement = this.shadowRoot.querySelector("#output");
            outputElement.innerHTML = await response.text();
            outputElement.style.opacity = "1";



        }

    }



    connectedCallback() {
        let prompBtn = this.shadowRoot.querySelector('#promptResponseBtn');
        prompBtn.addEventListener("click", () => this.promptResponse());

        let inputElement = this.shadowRoot.querySelector('#inputField');
        inputElement.focus();
        inputElement.select();
        inputElement.addEventListener("keypress", function(event) {
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