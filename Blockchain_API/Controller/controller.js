const express = require("express");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const cons = require("../../build/contracts/Token.json");
const ContractAddress = cons.networks[5777].address;
const ABi = cons.abi;
const cont1 = new web3.eth.Contract(ABi, ContractAddress);
const PRIVATE_KEY =
"d1bc56f5678ed2e9e35b69d3a5fd231537ff3e75fac85d630eb1e8c89b4ab622";
const getdata = (req, res) => {
  res.send("Hello from the post sid dfefde");
};
const transfer = async (req, res) => {
  const address2 = await address();
  const _value = req.body.value;
  // console.log(req.body);
  // res.send('Abhay')
  // const _address = (req.body.address).toString();
  const _nonce = await web3.eth.getTransactionCount(
    "0xA0f5DE0DF3C30afF89c959b3497cC850dfb69555"
  );
 
  const transfer1 = await cont1.methods
    .transfer('0x2d37e5a10D7b28a1D8337a6556cb97b07AFC15BA', 10).send();
    
  const transaction = {
    from:address2[0],
    gasPrice:"20000000000",
    gas:"3000000",
    to:ContractAddress,
    value:_value,
    nonce:_nonce,
  };

  const signedTx = await web3.eth.accounts.signTransaction(transaction,PRIVATE_KEY);
   console.log(signedTx);
   res.send(signedTx);

  res.send(transfer);
  // console.log(transfer1);
};
const mint = async (req, res) => {
  const mint1 = await cont1.methods
    .mint(10)
    .send({ from: "0xA0f5DE0DF3C30afF89c959b3497cC850dfb69555" });
  console.log(mint1);
  res.send(mint1);
};

const approve = async (req, res) => {
  const approve1 = await cont1.methods
    .approve("0x2d37e5a10D7b28a1D8337a6556cb97b07AFC15BA", 1000)
    .send({ from: "0xA0f5DE0DF3C30afF89c959b3497cC850dfb69555" });
  res.send(approve1);
  console.log(approve1);
};

const transferFrom = async (req, res) => {
  const transfer1 = await cont1.methods
    .transferFrom(
      "0x2d37e5a10D7b28a1D8337a6556cb97b07AFC15BA",
      "0xA0f5DE0DF3C30afF89c959b3497cC850dfb69555",
      100
    )
    .send({ from: "0xA0f5DE0DF3C30afF89c959b3497cC850dfb69555" });
  console.log(transfer1);
  res.send(transfer1);
};
const balanceOf = async (req, res) => {
  balance = await cont1.methods
    .balanceOf("0xA0f5DE0DF3C30afF89c959b3497cC850dfb69555")
    .call({ from: "0xA0f5DE0DF3C30afF89c959b3497cC850dfb69555" });
  res.send(balance);
  console.log(balance);
};
const allowance = async (req, res) => {
  const allowance1 = await cont1.methods
    .allowance(
      "0xA0f5DE0DF3C30afF89c959b3497cC850dfb69555",
      "0x2d37e5a10D7b28a1D8337a6556cb97b07AFC15BA"
    )
    .call({ from: "0xA0f5DE0DF3C30afF89c959b3497cC850dfb69555" });

  res.send(allowance1);
  console.log(allowance1);
};

const confiscate = async (req, res) => {
  const confiscate1 = await cont1.methods
    .confiscate("0xA0f5DE0DF3C30afF89c959b3497cC850dfb69555", 2)
    .send({ from: "0xA0f5DE0DF3C30afF89c959b3497cC850dfb69555" });
  res.send(confiscate1);
  console.log(confiscate1);
};

const address = async (req, res) => {
  const address1 = await web3.eth.getAccounts();
  console.table(address1);
  // res.send(address1);
  return address1;
};

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
