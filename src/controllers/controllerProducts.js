import mercadopago from 'mercadopago'
import { containerProducts } from "../container/containerProducts.js";
import { randomUUID } from 'crypto';
import { transporter } from "../email/index.js";

export async function controllerGetProducts(req, res) {
  const products = await containerProducts.getAll();
  res.json(products);
}

export async function controllerPostProducts(req, res) {
  const product1 = {
    alimentaryPlans : [],
    identificator: randomUUID(),
    image: 'https://res.cloudinary.com/dmx8e4tt0/image/upload/v1680542501/grafer-images/rduc4ajnke6uwq9bljd1.png',
    title: 'Planes Alimentarios',
    length: 0,
    name: 'alimentaryPlans',
    endpoint: 'planesAlimentarios'
  }
  const product2 = {
    ebooks : [],
    identificator: randomUUID(),
    image: 'https://res.cloudinary.com/dmx8e4tt0/image/upload/v1680542505/grafer-images/k2hbdmlitephfmevbk19.png',
    title: 'E-books',
    length: 0,
    name: 'ebooks',
    endpoint: 'ebooks'
  }
  const product3 = {
    recetaries : [],
    identificator: randomUUID(),
    image: 'https://res.cloudinary.com/dmx8e4tt0/image/upload/v1680542510/grafer-images/oehcec14ugcw6orodtqt.png',
    title: 'Recetarios',
    length: 0,
    name: 'recetaries',
    endpoint: 'recetarios'
  }
  await containerProducts.save(product1)
  await containerProducts.save(product2)
  await containerProducts.save(product3)
  res.json({ succesfull: "Products addedd" });
}

export async function controllerGetProductCollection(req,res) {
  const identificator = req.params.identificator;
  const collection = await containerProducts.getById(identificator);
  if(collection) {
    res.json(collection);
  } else {
      res.status(404).json({error: `Collection with id ${identificator} not found`});
  }
}

export async function controllerPutProductCollection(req, res) {
  const collection = await containerProducts.getAll();
  const product = req.body
  product.identificator = randomUUID()
  const col = collection.find(c => c.name === product.name);
  col[col.name].push(product);
  col.length++;
  await containerProducts.changeById(col.identificator,col)
  const updateProducts = await containerProducts.getAll();
  res.json(updateProducts)
}

export async function controllerDeleteProductCollection(req, res) {
  const collection = await containerProducts.getAll();
  const product = req.body
  const col = collection.find(c => c.name === product.name);
  const index = col[col.name].findIndex(c => c.identificator === product.identificator);
  if(index  !== - 1) {
    if(col.length > 0) {
      col[col.name].splice(index,1);
      col.length--;
      await containerProducts.changeById(col.identificator,col);
      const updateProducts = await containerProducts.getAll();
      res.json(updateProducts);
    } else {
        res.status(400).json({error: 'No products to delete'});
    }
  } else {
    res.status(400).json({error: 'No product found'})
  }
}


export async function controllerPostSendProduct(req, res) {
  const product = req.body.product
  const user = req.body.user
  if(user.name && user.email && user.surname && product.title && product.price) {
    await transporter.sendMail({
      from: 'Servidor Node.js',
      to: 'grafer1965@hotmail.com',
      subject: 'Compra realizada',
      html: `<h3>Nueva compra de:</h3><h4>Nombre: ${user.name} ${user.surname}</h4><h4>Email: ${user.email}</h4><h4>Producto: ${product.title}</h4><h4>Precio: ${product.price}</h4><button style='padding:7px; background-color: #1cb85f; color: #fff;'><a style='text-decoration:none; color: #fff;' href='${product.pdf}'>Producto digital</a></button>`
  })

  await transporter.sendMail({
    from: 'Servidor Node.js',
    to: user.email,
    subject: 'Compra realizada',
    html: `<h3>Nueva compra</h3><h4>Felicidades por tu nueva compra! A continuación te dejo los datos del producto y el link para acceder al pdf completo</h4><h5>Producto: ${product.title}</h5><h5>Precio: ${product.price}</h5><button style='padding:7px; background-color: #1cb85f; color: #fff;'><a style='text-decoration:none; color: #fff;' href='${product.pdf}'>Producto digital</a></button>`
  })
    res.json({ succesfull: "Emails send" });
  } else res.status(404).json({error: 'Faltan datos de envio'});
}