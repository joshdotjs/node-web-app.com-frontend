import sendShopifyStorefrontRequest from '../graph-ql';

// ==============================================

const add_to_cart_mutation = gql`
  mutation AddToCart($cart_id: ID!, $variant_id: ID!, $quantity: Int!) {
    cartLinesAdd(
      cartId: $cart_id
      lines: [{ quantity: $quantity, merchandiseId: $variant_id }]
    ) {
      cart {
        checkoutUrl
        estimatedCost {
          totalAmount {
            amount
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              estimatedCost {
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    id
                    height
                    width
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

// ==============================================

export default async function addToCart({ cart_id, variant_id, quantity }) {
  // --------------------------------------------

  // console.log('updateCart()');

  const data = await sendShopifyStorefrontRequest({
    query: add_to_cart_mutation,
    variables: { cart_id, variant_id, quantity },
  });

  console.log('addToCart() -- data: ', data);

  // --------------------------------------------

  return data;

  // --------------------------------------------
}

// ==============================================
