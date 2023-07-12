export default class ModalFocusManager {
  constructor(modalElement,elementToFocus) {
    this.logo = document.querySelector('.logo');
    this.logo.focus();
    this.modalElement = modalElement;
    this.elementToFocus = elementToFocus;
    this.previouslyDisabledEls = [];
    this.updateFocusableElements();
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
          if (document.activeElement === this.firstFocusableEl) {
            this.lastFocusableEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === this.lastFocusableEl) {
            this.firstFocusableEl.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  setInitialFocus() {
   if (this.firstFocusableEl) {
      this.firstFocusableEl.focus();
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
}