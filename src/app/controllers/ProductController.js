import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    // get para pegar os produtos
    const list = await Product.findAll();
    return res.status(200).json(list);
  }

  // post para criar um produto passando ( title, description, image, price )
  async store(req, res) {
    // criando produto
    const { title, description, image, price } = await Product.create(req.body);

    return res.status(200).json({
      title,
      description,
      image,
      price,
    });
  }
}
export default new ProductController();
