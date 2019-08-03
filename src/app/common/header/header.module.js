import { HeaderComponent } from './header.component';

export const HeaderModule = angular
  .module('header', [])
  .component('header', HeaderComponent)
  .name;
