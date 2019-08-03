import angular from 'angular';
import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';

import { TodoForm } from './todo-form/todo-form.module';
import { TodoList } from './todo-list/todo-list.module';

export const TodoModule = angular
  .module('todo', [
    TodoForm,
    TodoList
  ])
  .service('TodoService', TodoService)
  .component('todo', TodoComponent)
  .name;
