import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // 401 nao autorizado
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // desestruturando para pegar só o token
  const [, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next(); // se chegou ate aqui o usuario pode acessar o controller normalmente, pois ele está autenticado
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
