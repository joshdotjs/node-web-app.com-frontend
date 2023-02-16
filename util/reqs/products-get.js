import sendShopifyStorefrontRequest from '../graph-ql';

// ==============================================

export default async function getProducts() {

  const query = "{products(first: 3) { edges { node { id title } } } }";
  
  const data = await sendShopifyStorefrontRequest({
    query
  });

  const products = data.products.edges.map(({node}) => ({ id: node.id, title: node.title}));
  
  return products;
}

// ==============================================