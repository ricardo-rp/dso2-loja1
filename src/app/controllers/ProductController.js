import * as Yup from 'yup';

import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    // get para pegar os produtos
    const list = await Product.findAll();

    return res.status(200).json(list);
  }

  // post para criar um produto passando (id,title,description,price)
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.string().required(),
    });
    // verificando se todos os dados para criar o produto foram passados corretamente
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // verificando se ja possui um id de produto ja cadastrado
    const idExists = await Product.findOne({ where: { id: req.body.id } });

    if (idExists) {
      return res.status(400).json({ error: 'ID already exists.' });
    }
    // criando produto
    const { id, title, description, price } = await Product.create(req.body);

    return res.status(200).json({
      id,
      title,
      description,
      price,
    });
  }
}
export default new ProductController();
