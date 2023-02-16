// NOTE: This one runs on client!
// => process.env.NEXT_PUBLIC_STOREFRONT_API_ACCESS_TOKEN
// shopify-req.js runs on server
// => process.env.GRAPHQL_SHOPIFY_STORE_URL

export default async function sendShopifyStorefrontRequest({
  query,
  variables = {},
}) {
  // ==============================================

  console.log('Cart Step 7: sendShopifyStorefrontRequest({query, variables})');

  // console.log(
  //   'CLIENT process.env.NEXT_PUBLIC_GRAPHQL_SHOPIFY_STORE_URL: ',
  //   process.env.NEXT_PUBLIC_GRAPHQL_SHOPIFY_STORE_URL
  // );

  // ==============================================

  const NEXT_PUBLIC_GRAPHQL_SHOPIFY_STORE_URL = `https://storefront-api-store.myshopify.com/api/2021-07/graphql.json`;
  const NEXT_PUBLIC_STOREFRONT_API_ACCESS_TOKEN = '3f2e1f2d329c04ce3ec673e92459f119';

  // ==============================================

  try {
    // --------------------------------------------

    const res = await fetch(
      NEXT_PUBLIC_GRAPHQL_SHOPIFY_STORE_URL
      //process.env.NEXT_PUBLIC_GRAPHQL_SHOPIFY_STORE_URL
      , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 'application/graphql'
        // Accept: 'application/json',
        'X-Shopify-Storefront-Access-Token': NEXT_PUBLIC_STOREFRONT_API_ACCESS_TOKEN,
          // process.env.NEXT_PUBLIC_STOREFRONT_API_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    // --------------------------------------------

    if (!res.ok) {
      throw new Error(res);
    }

    // --------------------------------------------

    const { data, errors } = await res.json();

    // --------------------------------------------

    if (errors) {
      console.log('GraphQL Error: errors: ', errors);
      throw new Error(errors[0].message ?? errors.message);
    }

    // --------------------------------------------

    if (!data) {
      throw new Error('No data returned from GraphQL.');
    }

    // --------------------------------------------

    return data;
  } catch (err) {
    console.log('error: ', err);
  }
  // ==============================================
}
