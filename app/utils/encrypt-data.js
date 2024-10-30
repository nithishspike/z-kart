import ENV from 'online-shopping-client/config/environment';
export default function encryptData(data) {
  let encrypt = new JSEncrypt();
  let publicKey= ENV.publicKey;
  encrypt.setPublicKey(publicKey);
  let encrypted = encrypt.encrypt(JSON.stringify(data));
  if (!encrypted) {
      console.error("Encryption failed. Check your public key and data format.");
  } 
  console.log(encrypted,data);
  
  return encrypted;
}

