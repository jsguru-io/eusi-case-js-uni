require('app-module-path').addPath(__dirname + '/lib');
const express = require('express');
const path = require('path');
const eusiNode = require('eusi-sdk-node');
const eusi = global.eusi = eusiNode({
    deliveryApi: 'https://delivery.stg.eusi.cloud/api/v1',
    bucketKey: '63c49661-653f-46ce-b6f6-a86e4ba28fe1',
    // eslint-disable-next-line
    bucketSecret: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidWNrZXRfaWQiOiI2M2M0OTY2MS02NTNmLTQ2Y2UtYjZmNi1hODZlNGJhMjhmZTEiLCJpZCI6IjA4ODhhZGQ5LTNkMjQtNDMwYi05Y2E5LWZiZjgzMGVlNzg4ZCIsInRpbWVzdGFtcCI6MTUxODM1MjA2MjMwNn0.woCmS2Idd5c9PAstdm8JMH_TtCQoXFbXmPCBzCadoJU'
});


var server = require('nodebootstrap-server')
    , appConfig = require('./app-config')
    , app = require('express')();

app = require('nodebootstrap-htmlapp').setup(app);
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.static(path.join(__dirname, './node_modules/eusi-sdk-core/dist/browser')));
app.use(express.static(path.join(__dirname, './node_modules/eusi-sdk-browser/dist/browser')));

server.setup(app, appConfig.setup);
