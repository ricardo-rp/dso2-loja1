import * as Yup from 'yup';

import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    // get para pegar os produtos
    const list = await Product.findAll();

    return res.status(200).json(list);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const idExists = await Product.findOne({ where: { id: req.body.id } });

    if (idExists) {
      return res.status(400).json({ error: 'ID already exists.' });
    }

    const { id, title } = await Product.create(req.body);

    return res.status(200).json({
      id,
      title,
    });
  }
}
export default new ProductController();
