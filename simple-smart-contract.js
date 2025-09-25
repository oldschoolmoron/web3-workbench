// learning: smart contract is basically code that runs on blockchain
// here simulating it with plain JS (not real blockchain yet)

// imagine a smart contract that stores balance for users
class SimpleBank {
  constructor() {
    this.balances = {}; // store user => balance
  }

  // deposit money
  deposit(user, amount) {
    if (amount <= 0) {
      console.log("invalid deposit");
      return;
    }
    if (!this.balances[user]) {
      this.balances[user] = 0;
    }
    this.balances[user] += amount;
    console.log(`${user} deposited ${amount}. new balance = ${this.balances[user]}`);
  }

  // withdraw money
  withdraw(user, amount) {
    if (!this.balances[user] || this.balances[user] < amount) {
      console.log("not enough balance");
      return;
    }
    this.balances[user] -= amount;
    console.log(`${user} withdrew ${amount}. new balance = ${this.balances[user]}`);
  }

  // check balance
  getBalance(user) {
    return this.balances[user] || 0;
  }
}

// "deploy" smart contract (in real life, deploys on blockchain)
const bank = new SimpleBank();

// interacting like frontend/web dApp would do
bank.deposit("Alice", 100);
bank.deposit("Bob", 50);

bank.withdraw("Alice", 40);

console.log("Alice balance:", bank.getBalance("Alice"));
console.log("Bob balance:", bank.getBalance("Bob"));
