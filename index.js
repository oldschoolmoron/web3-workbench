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
const result = findHashWithPrefixString('100xdev');
console.log(`result : ${result.input}`);
console.log(`input: ${result.hash}`);
