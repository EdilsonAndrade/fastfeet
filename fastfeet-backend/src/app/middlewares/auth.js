import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import auth from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'User not authorized' });
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoder = await promisify(jwt.verify)(token, auth.secret);
    if (!decoder) {
      return res.status(401).json({ error: 'User not verified' });
    }
    req.userId = decoder.id;
    return next();
  } catch (error) {
    return res.status(500).json({ error: `Error occured ${error}` });
  }
};
