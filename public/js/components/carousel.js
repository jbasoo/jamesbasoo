class JABCarousel extends HTMLElement {
    static styles = `
        :root {
            background: blue;
        }

        * {
            all: unset;
        }

        ul {
            overflow: auto;
            display: flex;
            gap: var(--spacing, .5rem);
        }

        li {
            flex: 1 0 var(--item-block-size, 30%);
            background: red;
        }
    `;

    constructor() {
        super();

        this.styles = new CSSStyleSheet();
        this.styles.replaceSync(this.constructor.styles)
        this.template = document.querySelector("template");

        const shadow = this.attachShadow({ mode: "open" });
        shadow.adoptedStyleSheets = [this.styles];
        shadow.appendChild(this.template.content.cloneNode(true));
    }

    connectedCallback() {

    }
}

window.customElements.define("jab-carousel", JABCarousel);

export { JABCarousel };