require('app-module-path').addPath(__dirname + '/lib');
const express = require('express');
const path = require('path');

var server = require('nodebootstrap-server')
    , appConfig = require('./app-config')
    , app = require('express')();

app = require('nodebootstrap-htmlapp').setup(app);
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.static(path.join(__dirname, './node_modules/eusi-sdk-core/dist/browser')));
app.use(express.static(path.join(__dirname, './node_modules/eusi-sdk-browser/dist/browser')));

server.setup(app, appConfig.setup);
