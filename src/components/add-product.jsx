import React, {useState, Fragment} from 'react';
import axios from 'axios';
import ProductForm from './product-form';
import FormButtons from './form-buttons';

const AddProduct = ({insertProduct, closeForm}) => {
  const [userMsg, setUserMsg] = useState('');
  const [product, setProduct] = useState({
    name: '',
    productNumber: 0,
    category: '',
    vendor: '',
    price: '0.00',
    quantity: 0,
    unit: 'Unit',
    par: 0,
    onHand: 0,
  });

  const displayUserMsg = (msg) => setUserMsg(msg);

  const addProduct = async (product) => {
    const vendor = {name: product.vendor};
    const category = {name: product.category};
    try {
      const {data} = await axios.post('/api/products', product);
      insertProduct({category, vendor, ...data});
    } catch (err) {
      console.error(err);
    }
  };

  const validateVendor = (product) => {
    if (!product.vendor) {
      // TODO: Make 'Vendor required' bold. Make 'vendors' a link to /vendors
      displayUserMsg(
        'Vendor required. Go to vendors to create a vendor for this product'
      );
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setProduct({...product, [name]: value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validated = validateVendor(product);
    if (validated) {
      addProduct(product);
      closeForm();
    }
  };

  return (
    <Fragment>
      <ProductForm
        product={product}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        userMsg={userMsg}
        formButtons={
          <FormButtons
            submitText="Add"
            handleSubmit={handleSubmit}
            closeForm={closeForm}
          />
        }
      />
    </Fragment>
  );
};

export default AddProduct;
