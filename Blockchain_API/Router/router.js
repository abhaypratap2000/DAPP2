const { Router } = require('express');
const express= require('express');
const { append } = require('express/lib/response');
const routing = express.Router();
const control = require("../Controller/controller")
routing.get('/',control.getdata);
routing.post('/transferFrom',control.transferFrom);
routing.post('/transfer',control.transfer);
routing.post('/mint',control.mint);
routing.post('/balance',control.balanceOf);
routing.post('/approve',control.approve);
routing.post('/allowance',control.allowance);
routing.post('/confiscate',control.confiscate);
routing.get('/address',control.address);

module.exports = {routing};

