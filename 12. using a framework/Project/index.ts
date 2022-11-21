import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("todo-app")
export class TodoApp extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;

            width: 80%;
            margin: auto;

            padding: 2rem;
        }

        .new-todo {
            height: 3rem;

            font-size: 1.5rem;

            border: solid 0.1rem cornflowerblue;
            border-radius: 0.5rem;

            padding: 0.5rem;
            box-sizing: border-box;

            transition: box-shadow 0.1s;
        }

        .new-todo:focus {
            outline: none;
            box-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.5);
        }

        .new-todo::placeholder {
            color: rgb(103, 103, 103);
        }

        .todos {
            list-style-type: none;

            padding-left: 0.5rem;
        }
    `;

    todos: string[] = JSON.parse(localStorage.getItem("todos") ?? "[]");

    AddTodo(e: KeyboardEvent)
    {
        if (e.key != "Enter") return;

        this.todos.push((e.target as HTMLInputElement).value);

        (e.target as HTMLInputElement).value = "";
        
        this.requestUpdate();
    }

    updated() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    render() {
        return html`
            <input class="new-todo" placeholder="Add a todo item..." @keydown="${this.AddTodo}">

            <ul class="todos">
                ${this.todos.map((todo, index) => html`
                <li>
                    <todo-item todo="${todo}" index="${index}"></todo-item>
                </li>
                `)}
            </ul>
        `;
    }
}

@customElement("todo-item")
export class TodoItem extends LitElement {
    static styles = css`
        :host {
            display: flex;
            gap: 0.5rem;
        }

        :host(.done) {
            text-decoration: line-through;
        }

        * {
            text-decoration: inherit;
        }

        .todo {
            height: 1.5rem;
            width: 100%;

            font-size: 1rem;

            margin: 0.05rem;

            border: none;
            border-radius: 0.5rem;

            padding: 0.2rem;
            box-sizing: content-box;
        }

        .todo:focus {
            margin: 0;  
            border: solid 0.05rem cornflowerblue;
        }
    `;

    @property()
    todo: string;

    @property({ type: Number })
    index: number;

    ToggleDone(e: InputEvent) {
        this.classList.toggle("done", (e.target as HTMLInputElement).checked);
    }

    UpdateTodo(e: InputEvent) {
        var app = this.parentElement as TodoApp;
        app.todos[this.index] = (e.target as HTMLInputElement).value;

        app.requestUpdate();
    }

    render() {
        return html`
            <input class="done-checkbox" type="checkbox" @input="${this.ToggleDone}">
            <input class="todo" value="${this.todo}" @input="${this.UpdateTodo}">
        `;
    }
}
