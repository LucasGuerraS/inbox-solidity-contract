const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

// Test Example
// class Car {
//   park() {
//     return "stopped";
//   }

//   drive() {
//     return "vroom";
//   }
// }
// let car;

// beforeEach(() => {
//   car = new Car();
// });

// describe("Car", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });

//   it("can drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });

let accounts;
let inbox;
const INITIAL_STRING = "Hello";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy a contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });
  it("has default messsage", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });
  it("can change the message", async () => {
    let newMessage = "bye";
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, newMessage);
  });
});

// TODO Updated Version
// const assert = require('assert');
// const ganache = require('ganache-cli');
// const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());

// const { abi, evm } = require('../compile');

// let accounts;
// let inbox;

// beforeEach(async () => {
// Get a list of all accounts
//   accounts = await web3.eth.getAccounts();
//   inbox = await new web3.eth.Contract(abi)
//     .deploy({
//       data: evm.bytecode.object,
//       arguments: ['Hi there!'],
//     })
//     .send({ from: accounts[0], gas: '1000000' });
// });

// describe('Inbox', () => {
//   it('deploys a contract', () => {
//     assert.ok(inbox.options.address);
//   });
//   it('has a default message', async () => {
//     const message = await inbox.methods.message().call();
//     assert.equal(message, 'Hi there!');
//   });
//   it('can change the message', async () => {
//     await inbox.methods.setMessage('bye').send({ from: accounts[0] });
//     const message = await inbox.methods.message().call();
//     assert.equal(message, 'bye');
//   });
// });
