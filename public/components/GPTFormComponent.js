const template = document.createElement("template");
template.innerHTML = `
    <style>
        @import "style.css";
    </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer"
    />

    <div class="search-wrapper">
        <div class="input-row">
            <input  placeholder="Type message..."id="inputField"></input>
                <button id="promptResponseBtn"><i class="fa-sharp fa-solid fa-search btn-icon"></i></button>
        </div>
        <p id="output">
        
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

        </p>
    </div>
`;

class gptSearchBar extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }


    async promptResponse() {
        let input = this.shadowRoot.querySelector('#inputField').value;

        if (input) {
            let uri = '/prompt/user/' + input
            const response = await fetch(uri, {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' }
            })

            this.shadowRoot.querySelector("#output").innerHTML = await response.text();
        }

    }



    connectedCallback() {
        this.shadowRoot
            .querySelector("#promptResponseBtn")
            .addEventListener("click", () => this.promptResponse());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector("#generateRes").removeEventListener();
    }
}

window.customElements.define("gpt-search-bar", gptSearchBar);