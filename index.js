const crypto = require('crypto');

// const input = "bitcoin_pdf"
// const hash = crypto.createHash("sha256").update(input).digest('hex');

// console.log(hash);

// Assignment : #1 f(n) to find an input string that produces a hash starting with '00000'
function findHashWithPrefix(prefix){
  let input = 0;
  while(true){
    const inputStr = input.toString();
    let hash = crypto.createHash('sha256').update(inputStr).digest('hex');
    if(hash.startsWith(prefix)){
      return { input: inputStr, hash: hash }
    }
    input++;
  }
}

// const result = findHashWithPrefix('00000');
// console.log(`input: ${result.input}`);
// console.log(`hash ${result.hash}`);

// https://emn178.github.io/online-tools/sha256.html

// Assignment #2 what if the input string should start with 'devdotmoron' or '100xdev'?

// In Base64-encoded SHA-256, prefixes like "devdotmoron" or "100xdev" are possible, but since outputs are pseudorandom and uniformly distributed, the chance of an N-character prefix is 1 in 64^N (e.g., 1 in 68.7B for 6 chars).
function findHashWithPrefixString(prefix){
  let input = 0;
  while(true){
    const inputStr = input.toString();
    let base64_ = crypto.createHash('sha256').update(inputStr).digest('base64');
    if(base64_.startsWith(prefix)){
      return { input: inputStr, hash: base64_ }
    }
    input++;
  }
}
// const result = findHashWithPrefixString('100xdev');
// console.log(`result : ${result.input}`);
// console.log(`input: ${result.hash}`);

// Assignment #3 find a nonce for the following input. // nonce => number used once
// userOne => UserTwo | Rs 100
// someUserX => someUserY | Rs 10

const block = {
  transactions : [
    "userOne => userTwo | Rs 100",
    "someUserX => someUserY | Rs 10"
  ],
  nonce : 0, //will keeping changing
  prevHash : "00000abg123" // in real blockchain, from previous block
}

function findingHashwithPrevHash(block, prefix){ 
  while(true){
    let currHash = crypto.createHash('sha256').update(JSON.stringify(block)).digest('base64');
    if(currHash.startsWith(prefix)){
      return { nonce: block.nonce, hash: currHash };
    }
    block.nonce++;
  }
}

// core concept : block structure with transactions, nonce, and prevHash
// const result = findingHashwithPrevHash(block, "dev")
// console.log(`Result: ${result.nonce}`);
// console.log(`input: ${result.hash}`);


// Assignment 4 How can I link multiple blocks into a chain, where each block uses the previous block’s hash?

// this is how things work under the hood (conceptually)
function calculateHash(block){
  return crypto.createHash('sha256')
  .update(JSON.stringify(block.transactions)+ block.nonce + block.prevHash)
  .digest("hex")
}

//mine block --> simple means just find hash starting with '000'
function mineBlock(transactions, prevHash){
  let nonce = 0;
  while(true){
    const block = { transactions, nonce,  prevHash};
    const hash = calculateHash(block);
    if(hash.startsWith("000")){
      return {...block, hash};
    }
    nonce++;
  }
}

//Genesis block
const genesisBlock = mineBlock(["Genesis block"], "0");

// Next block lines to genesis
const block2 = mineBlock(["userNameA => userNameB | Rs 50"], genesisBlock.hash);

// Next block links to block2
const block3 = mineBlock(["userNameC => userNameD | Rs 10"], block2.hash);

console.log(genesisBlock);
console.log(block2);
console.log(block3);


//output 
/*
node index.js
{
  transactions: [ 'Genesis block' ],
  nonce: 1359,
  prevHash: '0',
  hash: '000c5ad35292007f7c33e6890a07e5b49e62bf8fb9379437c8b4f9e36ab9e2b6'
}
{
  transactions: [ 'userNameA => userNameB | Rs 50' ],
  nonce: 1744,
  prevHash: '000c5ad35292007f7c33e6890a07e5b49e62bf8fb9379437c8b4f9e36ab9e2b6',
  hash: '000f68c3705edf6eed9eb07a8a63f3e9ba516ce217c113ddfbd971b9c7930346'
}
{
  transactions: [ 'userNameC => userNameD | Rs 10' ],
  nonce: 516,
  prevHash: '000f68c3705edf6eed9eb07a8a63f3e9ba516ce217c113ddfbd971b9c7930346',
  hash: '000f7c10c0eacc7b247aaae2541f602a850b29e333cf75777e100755f82dbc1a'
}
 */
