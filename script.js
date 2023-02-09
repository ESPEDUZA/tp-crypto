// Load the required modules
const crypto = require("crypto-js");
const fs = require("fs");

// Function to encrypt data
function encryptData(algorithm, data, key) {
  const cipher = crypto.createCipher(algorithm, key);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Function to decrypt data
function decryptData(algorithm, encryptedData, key) {
  const decipher = crypto.createDecipher(algorithm, key);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Function to generate hash
function generateHash(algorithm, data) {
  const hash = crypto.createHash(algorithm);
  hash.update(data);
  return hash.digest("hex");
}

// Read a file
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;

  // Encrypt the file content
  const encrypted = encryptData("aes256", data, "secretkey");
  console.log("Encrypted data:", encrypted);

  // Decrypt the encrypted data
  const decrypted = decryptData("aes256", encrypted, "secretkey");
  console.log("Decrypted data:", decrypted);

  // Generate hash
  const hash = generateHash("sha256", decrypted);
  console.log("Hash:", hash);
});
