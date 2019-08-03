import angular from 'angular';
import { TodoModule } from './todo/todo.module';
// import { CalendarModule } from './calendar/calendar.module';
// import { EventsModule } from './events/events.module';

export const ComponentsModule = angular
  .module('app.components', [
    TodoModule
    // CalendarModule,
    // EventsModule
  ])
  .name;
