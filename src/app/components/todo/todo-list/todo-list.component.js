import templateUrl from './todo-list.html';

export const TodoListComponent = {
  template: templateUrl,
  bindings: {
    todos: '<',
    onUpdateTodo: '&',
    onDeleteTodo: '&',
    onReorderTodo: '&'
  },
  controller: class TodoListController {
    constructor(EventEmitter) {
      this.EventEmitter = EventEmitter;
      this.editMode = false;
    }
    $onChanges (changes) {
      if (changes.todo) {
        this.todo = Object.assign({}, this.todo);
      }
    }
    setEditModeOn () {
      this.editMode = true;
    }
    setEditModeOff () {
      this.editMode = false;
    }
    isEditMode () {
      return this.editMode;
    }
    onUpdate (todo) {
      this.setEditModeOff();
      if (!todo) return;

      this.onUpdateTodo(
        this.EventEmitter({
          todo: todo
        })
      );
    }
    onReorder() {
      this.onReorderTodo(
        this.EventEmitter({})
      );
    }
    onDelete (todo) {
      if (!todo) return;
      this.onDeleteTodo(
        this.EventEmitter({
          todo: todo
        })
      );
    }
  },
};

TodoListComponent.$inject = ['EventEmitter'];