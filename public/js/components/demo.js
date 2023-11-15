class JABDemo extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        shadow.appendChild(this.querySelector('template').content.cloneNode(true));
    }
}

window.customElements.define("jab-demo", JABDemo);

export { JABDemo };