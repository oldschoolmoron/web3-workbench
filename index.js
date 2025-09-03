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
      return { input : inputStr, hash: hash }
    }
    input++;
  }
}

const result = findHashWithPrefix('00000');
console.log(`input: ${result.input}`);
console.log(`hash ${result.hash}`);

// https://emn178.github.io/online-tools/sha256.html