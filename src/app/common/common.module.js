import angular from 'angular';
// import Nav from './nav';
import { HeaderModule } from './header/header.module';
// import Footer from './footer';

export const CommonModule = angular
  .module('app.common', [
    // Nav,
    HeaderModule,
    // Footer
  ])
  .name;
