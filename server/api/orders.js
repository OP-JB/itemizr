const router = require('express').Router();
const {Product, Order, CartItem, Vendor} = require('./index');

// ==> create new vendors cart <== //
//api/orders/addToCart/?ProductId=int&size=int&quantity=int
router.post('/cart/add', async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);
    const [order] = await Order.findOrCreate({
      where: {
        vendorId: req.vendor.id,
        complete: false,
      },
    });
    await order.addProduct(product, {
      through: {
        quantity: req.query.quantity,
      },
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.get('/cart', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      limit: 1,
      where: {
        vendorId: req.vendor.id,
        complete: false,
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.put('/complete', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        vendorId: req.vendor.id,
        complete: false,
      },
    });
    const update = order.update(
      {
        complete: true,
      },
      {returning: true}
    );
    res.json(update);
  } catch (err) {
    next(err);
  }
});

router.post('/cart/complete', async (req, res, next) => {
  try {
    const order = await Order.findById(req.body.id, {
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(order.products);
  } catch (err) {
    next(err);
  }
});

// ==> api/orders/removeFromCart?ProductId=1
router.delete('/cart/remove', async (req, res, next) => {
  try {
    await CartItem.destroy({
      where: {
        productId: req.query.productId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//new route for getting order history using query
// router.get('/', async (req, res, next) => {
//     let orders = []
//     try {
//       if(Number(req.query.vendorId) === req.vendor.id) {
//         orders = await Order.findAll({
//         where: {
//           vendorId: req.vendor.id,
//           complete: true
//         }
//       })
//       res.json(orders);
//     } else res.sendStatus(401)
//     } catch (err) {
//         next(err);
//     }
// });

module.exports = router;
