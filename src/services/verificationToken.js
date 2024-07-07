// This file is used to generate a random token for email verification
// It uses the crypto module to generate a random token

import crypto from 'crypto';

export function generateVerificationToken(length = 40) {
    return crypto.randomBytes(length).toString('hex');
}
