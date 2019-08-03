import templateUrl from './todo-form.html';

export const TodoFormComponent = {
  template: templateUrl,
  bindings: {
    todo: '<',
    onAddTodo: '&'
  },
  controller: class TodoFormComponent {
    constructor(EventEmitter) {
        this.EventEmitter = EventEmitter;
    }
    $onChanges(changes) {
      if (changes.todo) {
        this.todo = Object.assign({}, this.todo);
      }
    }
    onSubmit() {
      if (!this.todo.title) return;
      this.onAddTodo(
        this.EventEmitter({
          todo: this.todo
        })
      );
    }
  }
};

TodoFormComponent.$inject = ['EventEmitter'];
