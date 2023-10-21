class JABCarousel extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log(this, 'jab-carousel');
    }
}

window.customElements.define("jab-carousel", JABCarousel);

export { JABCarousel };