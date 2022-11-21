import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("todo-app")
class TodoApp extends LitElement {
    @property()
    name: string;

    render() {
        return html`
            <h1>Hello ${this.name}!</h1>
        `;
    }
}
