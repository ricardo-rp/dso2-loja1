import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Brenno Araujo',
    email: 'brenno@test.com',
    password_hash: '1234bbb',
  });

  return res.json(user);
});

export default routes;
