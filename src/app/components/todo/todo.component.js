import templateUrl from './todo.html';

export const TodoComponent = {
  template: templateUrl,
  bindings: {
    todoData: '<'
  },
  controller: class TodoController {
    constructor(TodoService) {
      this.todoService = TodoService;
    }
    $onInit () {
      this.todoService.open()
        .then(() => {
          this.getTodos()
        })
        .catch(err => console.log(err)) 
    }
    getTodos () {
      return this.todoService.getTodos()
        .then(todos => {
          this.setTodos(todos)
        })
        .catch(err => console.log(err))
    }
    setTodos (todos) {
      this.todos = todos;
    }
    $onChanges (changes) {
      if (changes.todoData) {
        this.todos = Object.assign({}, this.todoData);
      }
    }
    addTodo ({ todo }) {
      if (!todo) return;
      if (this.todos.find(e => e.title === todo.title)) return;

      this.todoService.addTodo(todo);
      this.getTodos();
      this.newTodo = {
        title: ''
      };
    }
    updateTodo ({ todo }) {
      if (!todo.title) {
        this.getTodos();
        return;
      }
      this.todoService.updateTodo(todo);
      return this.getTodos();
    }
    reOrderTodo () {
        this.todos.forEach((e, index) => {
          e.index = index;
          this.updateTodo({
            todo: e
          });
        });
        return this.getTodos();
    }
    deleteTodo ({ todo }) {
      if (!todo) return;
      this.todoService.deleteTodo(todo.id);
      return this.getTodos();
    }
    deleteAllTodo () {
      if (!this.todos) return;
      this.todos.forEach(e => this.todoService.deleteTodo(e.id));
      return this.getTodos();
    }
  },
};

TodoComponent.$inject = ['TodoService'];