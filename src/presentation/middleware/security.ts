import { scrypt, randomFill, createCipheriv, createDecipheriv, randomFillSync } from "crypto";

const algorithm = 'aes-192-cbc';
const password = "112233445566778899";
const salt = "112233445566778899";

// Helper function for encryption
export function encrypt(plaintext: string): Promise<string> {
    return new Promise((resolve, reject) => {
        scrypt(password, salt, 24, (err, key) => {
            if (err) return reject(err);

            const iv = Buffer.alloc(16); // Create a buffer for the IV
            randomFill(iv, (err: any) => {
                if (err) return reject(err);

                const cipher = createCipheriv(algorithm, key, iv);
                let encrypted = '';
                cipher.setEncoding('hex');

                cipher.on('data', (chunk) => encrypted += chunk);
                cipher.on('end', () => {
                    // Concatenate IV (as hex) and encrypted text
                    const result = iv.toString('hex') + encrypted;
                    resolve(result);
                });

                cipher.write(plaintext);
                cipher.end();
            });
        });
    });
}

// Helper function for decryption
export function decrypt(ciphertext: string): Promise<string> {
    return new Promise((resolve, reject) => {
        scrypt(password, salt, 24, (err, key) => {
            if (err) {
                console.error("Scrypt error:", err);
                return reject(err);
            }

            try {
                // Extract the IV from the ciphertext (first 32 hex chars = 16 bytes)
                const iv = Buffer.from(ciphertext.slice(0, 32), 'hex');
                const encryptedData = Buffer.from(ciphertext.slice(32), 'hex');

                const decipher = createDecipheriv(algorithm, key, iv);
                let decrypted = '';

                decipher.on('readable', () => {
                    let chunk;
                    while (null !== (chunk = decipher.read())) {
                        decrypted += chunk.toString('utf8');
                    }
                });

                decipher.on('end', () => {
                    resolve(decrypted);
                });

                decipher.on('error', (err) => {
                    console.error("Decipher error:", err);
                    reject(err);
                });

                decipher.write(encryptedData);
                decipher.end();
            } catch (error) {
                console.error("Decryption error:", error);
                reject(error);
            }
        });
    });
}
function generateRandomPassword(length: any) {
    const buffer = Buffer.alloc(length);
    randomFillSync(buffer);
    return buffer.toString('base64').slice(0, length); // Convert to base64 and trim to desired length
}
// Example usage
// encrypt("123456").then(encrypted => {
//     console.log("Encrypted:", encrypted);
//     decrypt(encrypted).then(decrypted => {
//         console.log("Decrypted:", decrypted);
//     }).catch(err => {
//         console.error("Decryption error:", err);
//     });
// }).catch(err => {
//     console.error("Encryption error:", err);
// });