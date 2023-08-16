class PropertyCalculator {
  #element;
  #selector;
  #appended = false;

  constructor(selector) {
    this.#selector = selector;

    if (!this.#selector) {
      this.#element = document.createElement("DIV");
      this.#element.classList.add("property-calculator-container");
    }

    if (!this.appended) {
      document.body.appendChild(this.element);
    }
  }

  get style() {
    return this.element.style;
  }

  get appended() {
    return this.#appended;
  }

  get element() {
    if (this.#element) return this.#element;

    if (this.#selector) {
      this.#element = document.querySelector(this.#selector);
      if (this.#element) {
        this.#appended = true;
      }
    }

    if (!this.#element)
      throw new Error(
        "no container available (nor set via selector) to compute a value"
      );
    return this.#element;
  }
}

function calc(property, style, selector) {
  const calculator = new PropertyCalculator(selector);

  calculator.style[property] = style;

  const val = window
    .getComputedStyle(calculator.element)
    .getPropertyValue(property);

  console.log(`${selector} { ${property}: ${val} }`);
}

calc("margin-left", "calc(var(--some-var) * 10)");
calc("margin-left", "calc(var(--some-var) * 10)", ".some-span");
calc("top", "calc(var(--some-var) * 10)", ".some-div");
