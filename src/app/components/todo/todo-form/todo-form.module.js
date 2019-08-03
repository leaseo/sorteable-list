import angular from 'angular';
import { TodoFormComponent } from './todo-form.component';

export const TodoForm = angular
  .module('todo.form', [])
  .component('todoForm', TodoFormComponent)
  .value('EventEmitter', payload => ({ $event: payload }))
  .name;
