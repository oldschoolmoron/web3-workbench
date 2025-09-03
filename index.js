const crypto = require('crypto');

const input = "bitcoin_pdf"
const hash = crypto.createHash("sha256").update(input).digest('hex');

console.log(hash);

