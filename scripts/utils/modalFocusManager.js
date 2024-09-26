export default class ModalFocusManager {
  constructor(modalElement, elementToFocus) {
    this.modalElement = modalElement;
    this.elementToFocus = elementToFocus;
    this.previouslyDisabledEls = [];
    this.updateFocusableElements();
    this.setInitialFocus();
    this.toggleBackgroundFocus(false);
    this.trapFocus();
    this.boundTrapFocus = this.trapFocus.bind(this);
    document.addEventListener("keydown", this.boundTrapFocus);
  }

  updateFocusableElements() {
    this.focusableEls = this.modalElement.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    this.firstFocusableEl = this.elementToFocus;
    this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
  }

  trapFocus() {
    document.addEventListener("keydown", (e) => {
      if (this.modalElement.style.display === "block") {
        const isTabPressed = e.key === "Tab" || e.keyCode === 9;
        if (!isTabPressed) {
          return;
        }
        if (e.shiftKey) {
          if (document.activeElement === this.elementToFocus) {
            this.lastFocusableEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === this.lastFocusableEl) {
            this.elementToFocus.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  setInitialFocus() {
    if (this.elementToFocus) {
      this.elementToFocus.focus();
    }
  }

  toggleBackgroundFocus(enable) {
    const focusableEls = document.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    focusableEls.forEach((el) => {
      if (!this.modalElement.contains(el)) {
        if (enable) {
          if (this.previouslyDisabledEls.includes(el)) {
            el.removeAttribute("tabindex");
          }
        } else {
          if (!el.hasAttribute("tabindex")) {
            el.setAttribute("tabindex", "-1");
            this.previouslyDisabledEls.push(el);
          }
        }
      }
    });
    if (enable) {
      this.previouslyDisabledEls.length = 0;
    }
  }

  destroy() {
    document.removeEventListener("keydown", this.boundTrapFocus);
  }
}
