import { sign } from 'jsonwebtoken';
import 'dotenv';
import IJwt from '../interfaces/IJwt';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = (paylod: IJwt): string => {
  const token = sign(paylod, secret, { algorithm: 'HS256' });

  return token;
};

export default generateToken;
