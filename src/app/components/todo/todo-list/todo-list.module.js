import angular from 'angular';
import { TodoListComponent } from './todo-list.component';

export const TodoList = angular
  .module('todo.list', [])
  .component('todoList', TodoListComponent)
  .value('EventEmitter', payload => ({ $event: payload }))
  .name;
