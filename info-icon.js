const tmpl = document.createElement("template");

tmpl.innerHTML = `
   <style>
      span {
         display: inline-flex;
         align-items: center;
         justify-content: center;
         inline-size: 1.5em;
         block-size: 1.5em;
         color: red;
         font-weight: bold;
         border: 1px solid red;
         border-radius: 50%;
         box-shadow: green 0 0 0.5em inset;
         user-select: none;
      }
   </style>

   <span part="container">ℹ</span>
`;

class InfoIcon extends HTMLElement {
   constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(tmpl.content.cloneNode(true));
   }

   static get observedAttributes() { return ["bg-color", "color"]; }

   // bg-color attribute
   get bgColor() { return this.getAttribute("bg-color"); }
   set bgColor(val) { this.setAttribute("bg-color", val); }

   // color attribute
   get color() { return this.getAttribute("color"); }
   set color(val) { this.setAttribute("color", val); }

   attributeChangedCallback(attrName, oldVal, newVal) {
      const theSpan = this.shadowRoot.querySelector("span");
      if (attrName == "bg-color") {
         theSpan.style.border = `1px solid ${newVal}`;
         theSpan.style.boxShadow = `${newVal} 0 0 0.5em inset`;
      }
      else if (attrName == "color") theSpan.style.color = `${newVal}`;
   }
}

customElements.define("info-icon", InfoIcon);

export default InfoIcon;
