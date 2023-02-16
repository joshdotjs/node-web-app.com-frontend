import sendShopifyStorefrontRequest from '../graph-ql';

// ==============================================

const gql = String.raw;

const create_cart_mutation = gql`
  mutation CreateCart {
    cartCreate {
      cart {
        checkoutUrl
        id
      }
    }
  }
`;

// ==============================================

export default async function createCart() {
  // --------------------------------------------

  // console.log('createCart()');

  const data = await sendShopifyStorefrontRequest({
    query: create_cart_mutation,
    variables: {},
  });

  console.log('createCart() -- data: ', data);

  // --------------------------------------------

  return {
    cart_id: data?.cartCreate?.cart?.id,
    checkout_url: data?.cartCreate?.cart?.checkoutUrl,
    estimated_cost: null,
    lines: [],
  };

  // --------------------------------------------
}

// ==============================================