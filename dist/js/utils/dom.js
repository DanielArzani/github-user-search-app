import{validationError}from"./errors.js";export function changeClassName(e,t){if(!(e instanceof Element&&"string"==typeof t))throw new validationError("Either an argument that wasn't an HTMLElement was passed in or a string wasn't passed in");e.className=t}export function storeTheme(e){localStorage.setItem("theme",e)}export function setLabel(e,t,a){e.getAttribute("for")===t?e.dataset[a]="true":e.dataset[a]="false"}export function handleClick(e,t){changeClassName(e,this.id),storeTheme(this.id),t.forEach((e=>{if(!(e instanceof HTMLLabelElement))throw new validationError("One of the elements is not an instance of HTMLLabelElement");setLabel(e,this.id,"hidden")}))}
//# sourceMappingURL=dom.js.map