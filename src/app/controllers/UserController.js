import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(3),
    });
    // validacoes do user
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.status(200).json({
      id,
      name,
      email,
      provider,
    });
  }

  // metodo para fazer atualizacoes do usuario
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ), // condicional para mudar a senha(senha antiga deve obrigatoriamente ser posta)
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    // se os dados de validacao estiver incorreto devolve um 400 error
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // verificacao se email e senha antiga ja foram colocados
    const { email, oldPassword } = req.body;
    // fazendo verificacao de dados ja existentes (email, senha antiga)
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    // atualizando dados com os dados verificados e retornando o update
    const { id, name, provider } = await user.update(req.body);

    return res.status(200).json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
