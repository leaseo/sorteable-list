import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-drag-and-drop-lists'

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from './common/common.module';
import './app.css';

export const AppModule = angular
  .module('app', [
    'dndLists',
    'ngAnimate',
    ComponentsModule,
    CommonModule
  ])
  .component('app', AppComponent)
  .name;