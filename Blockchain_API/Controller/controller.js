// from 0xFce453aA73177E63f24530ea106ee75d478a5cb1
// to 0x06FFdb895116eAccbEd57460C6EE1693eb13c3Bf

const express = require("express");
const Web3 = require("web3");
const accounts = require("web3-eth-accounts");

const model = require("../Models/models");
// const Provider = require('@truffle/hdwallet-provider');
// const address1 = '0xFce453aA73177E63f24530ea106ee75d478a5cb1';
// const privateKey = '61f84609b0c5c7cf36f01eb84af270c109bfcdd790db99af5fc4bec2315bc313';
// const provider1 = 'https://rinkeby.infura.io/v3/cba9c1d8b5ab4c2193bbd20ed721f374';
// const web3 = new Web3(provider1);

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const cons = require("../../build/contracts/Token.json");
const ContractAddress = cons.networks[5777].address;
const ABi = cons.abi;
const cont1 = new web3.eth.Contract(ABi, ContractAddress);
const PRIVATE_KEY =
  "8d77508c7dbb051a9fb27fcb92e141acee566ecc3a97a74c3a95cc7482a22036";

const getdata = (req, res) => {
  res.send("Hello from the post sid dfefde");
};
const transfer = async (req, res) => {
  // const address2 = await address();
  const _value = req.body.value;
  console.log(_value);
  const _nonce = await web3.eth.getTransactionCount(
    "0x9Ac701D8f749832F4FE17bf26370d3e1e4667946"
  );

  const transfer1 = await cont1.methods
    .transfer('0x4e4CAaF74c44F2C72ebaF699561A6bFc2C4D09EB', _value);
  const data = transfer1.encodeABI();

  const transaction =
  {
    from: '0x9Ac701D8f749832F4FE17bf26370d3e1e4667946',
    nonce: _nonce,
    gasPrice: "200000",
    gas: "300000",
    to: ContractAddress,
    data: data,
    _value,

  };
  const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
  const reciept = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(reciept);
  res.send(reciept);
  const MyEvent = reciept.logs[0].topics;
  console.log(MyEvent);
  // console.log(signedTx);
  // res.send(signedTx);
};
const mint = async (req, res) => {
  const mint1 = await cont1.methods
    .mint(10)
    .send({ from: "0x27627D3C4F48C832A27c2B17bacf11Ef3AcEeED8" });
  console.log(mint1);
  res.send(mint1);
};

const approve = async (req, res) => {
  const approve1 = await cont1.methods
    .approve("0x5cE170Ca39f4dC72717798621C3f80911Cc82F68", 1000)
    .send({ from: "0xFB8A9ea376d48739E85B508f1dBCf348Ec86F570" });
  res.send(approve1);
  console.log(approve1);
};

const transferFrom = async (req, res) => {
  const _value = req.body.value;
  console.log(_value);
  const _nonce = await web3.eth.getTransactionCount(
    "0xFB8A9ea376d48739E85B508f1dBCf348Ec86F570"
  );
  const transfer1 = await cont1.methods
    .transferFrom(
      "0xfb8a9ea376d48739e85b508f1dbcf348ec86f570",
      "0x5cE170Ca39f4dC72717798621C3f80911Cc82F68",
      _value
    );
  const data = transfer1.encodeABI();

  const transaction =
  {
    from: "0xfb8a9ea376d48739e85b508f1dbcf348ec86f570",
    nonce: _nonce,
    gasPrice: "2000000",
    gas: "1000000",
    to: ContractAddress,
    data: data,
    _value,



  };
  const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
  console.log(signedTx);
  const reciept = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(reciept);
  res.send(reciept);
  const MyEvent = reciept.logs[0].topics;
  console.log(MyEvent);
};


const balanceOf = async (req, res) => {
  balance = await cont1.methods
    .balanceOf("0x4e4CAaF74c44F2C72ebaF699561A6bFc2C4D09EB")
    .call({ from: "0x4e4CAaF74c44F2C72ebaF699561A6bFc2C4D09EB" });
  res.send(balance);
  console.log(balance);
};
const allowance = async (req, res) => {
  const allowance1 = await cont1.methods
    .allowance(
      "0xFB8A9ea376d48739E85B508f1dBCf348Ec86F570",
      "0x5cE170Ca39f4dC72717798621C3f80911Cc82F68"
    )
    .call({ from: "0xFB8A9ea376d48739E85B508f1dBCf348Ec86F570" });

  res.send(allowance1);
  console.log(allowance1);
};

const confiscate = async (req, res) => {
  const confiscate1 = await cont1.methods
    .confiscate("0x27627D3C4F48C832A27c2B17bacf11Ef3AcEeED8", 2)
    .send({ from: "0x27627D3C4F48C832A27c2B17bacf11Ef3AcEeED8" });
  res.send(confiscate1);
  console.log(confiscate1);
};

const address = async (req, res) => {
  const Address = await new model(web3.eth.accounts.create());
  Address.result = Address.address;
  res.send(Address.result);
  Address.save();
  console.log(Address);


}











module.exports = {
  getdata,
  transfer,
  transferFrom,
  mint,
  balanceOf,
  approve,
  allowance,
  confiscate,
  address,

};
