'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import moment from 'moment';

export class MainController {
  /*@ngInject*/
  // constructor($http, $scope, socket) {
  constructor($http) {
    this.$http = $http;
    // this.socket = socket;

    // $scope.$on('$destroy', function() {
    //   socket.unsyncUpdates('thing');
    // });
  }

  $onInit() {
    this.$http.get('/api/cpu')
      .then(response => {
        this.cpu = response.data;
        this.cpu.class = "bg-info";
        if (this.cpu.percent > 60) this.cpu.class = "bg-warning";
        if (this.cpu.percent > 90) this.cpu.class = "bg-danger";
      });
    this.$http.get('/api/disk')
      .then(response => {
        this.disk = response.data;
        this.disk.class = "bg-info";
        if (this.disk.percent > 60) this.disk.class = "bg-warning";
        if (this.disk.percent > 90) this.disk.class = "bg-danger";
      });
    this.$http.get('/api/information')
      .then(response => {
        this.information = response.data;
      });
    this.$http.get('/api/memory')
      .then(response => {
        this.memory = response.data;
        this.memory.class = "bg-info";
        if (this.memory.percent > 60) this.memory.class = "bg-warning";
        if (this.memory.percent > 90) this.memory.class = "bg-danger";
      });
    this.$http.get('/api/services')
      .then(response => {
        this.services = response.data;
      });
    this.$http.get('/api/uptime')
      .then(response => {
        // this.uptime = response.data;
        var duration = moment.duration(parseInt(response.data), 'seconds');
        console.log(duration._data)
        this.uptime = {
          days : duration._data.days,
          hours : duration._data.hours,
          minutes : duration._data.minutes,
        };
        this.uptime.subtitle = "";
        if (this.uptime.minutes !== 0) {
          this.uptime.title = this.uptime.minutes;
          this.uptime.unit = "min";
          this.uptime.subtitle = this.uptime.minutes+"m";
        }
        if (this.uptime.hours !== 0) {
          this.uptime.title = this.uptime.hours;
          this.uptime.unit = "hours";
          this.uptime.subtitle = this.uptime.hours+"h "+this.uptime.subtitle;
        }
        if (this.uptime.days !== 0) {
          this.uptime.title = this.uptime.days;
          this.uptime.unit = "days";
          this.uptime.subtitle = this.uptime.days+"d "+this.uptime.subtitle;
        }
        this.uptime.subtitle = "Uptime "+this.uptime.subtitle;
        this.uptime.class = "bg-info";
      });
  }

  // addThing() {
  //   if(this.newThing) {
  //     this.$http.post('/api/things', {
  //       name: this.newThing
  //     });
  //     this.newThing = '';
  //   }
  // }

  // deleteThing(thing) {
  //   this.$http.delete(`/api/things/${thing._id}`);
  // }
}

export default angular.module('kupikiHotspotAdminApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
