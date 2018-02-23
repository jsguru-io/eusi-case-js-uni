// @see: https://gist.github.com/branneman/8048520
require('app-module-path').addPath(__dirname + '/lib');
const eusiNode = require('eusi-sdk-node');
const eusi = global.eusi = eusiNode({
    bucketKey: '63c49661-653f-46ce-b6f6-a86e4ba28fe1',
    // eslint-disable-next-line
    bucketSecret: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidWNrZXRfaWQiOiI2M2M0OTY2MS02NTNmLTQ2Y2UtYjZmNi1hODZlNGJhMjhmZTEiLCJpZCI6IjA4ODhhZGQ5LTNkMjQtNDMwYi05Y2E5LWZiZjgzMGVlNzg4ZCIsInRpbWVzdGFtcCI6MTUxODM1MjA2MjMwNn0.woCmS2Idd5c9PAstdm8JMH_TtCQoXFbXmPCBzCadoJU'
});


var server = require('nodebootstrap-server')
  , appConfig = require('./appConfig')
  , app    = require('express')();


app = require('nodebootstrap-htmlapp').setup(app);

server.setup(app, appConfig.setup);
