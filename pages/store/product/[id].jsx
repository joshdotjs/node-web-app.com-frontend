import Layout from "comps/_layout/layout";
import Page from "comps/__pages/store/product/_product";

// ==============================================

export default function Root({ product_SSR, variants_SSR }) {

  console.log('product_SSR: ', product_SSR);
  console.log('variants_SSR: ', variants_SSR);

  // --------------------------------------------

  // console.clear();
  // console.log('router', router);
  // console.log('router.pathname: ', router.pathname);
  // console.log('router.query', router.query);

  // --------------------------------------------

  return (
    <Layout>
      <Page product={product_SSR} variants={variants_SSR} />   
    </Layout>
  );

  // --------------------------------------------
}

// ==============================================

export async function getStaticPaths() {

  const url = `${process.env.API_URL}/api/products`;
  const resp = await fetch(url);
  const products = await resp.json();
  // console.log('products: ', products);

  const ids = products.map((product) => product.id);
  const paths_with_params = ids.map((id) => ({ params: { id: String(id) } }));
  // console.log('paths_with_params: ', paths_with_params);

  return {
    paths: [
      // { params: { id: '1' } }, 
      // { params: { id: '2' } },
      ...paths_with_params
    ],
    fallback: false, // can also be true or 'blocking'
  }
}

// ==============================================

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {

  const { params } = context;
  const id = params.id;
  console.log('id: ', id);


  const url = `${process.env.API_URL}/api/products/${id}`;
  const resp = await fetch(url);
  const { product, variants } = await resp.json();

  console.log('product: ', product);
  console.log('variants: ', variants);


  return {
    // Passed to the page component as props
    props: { 
      product_SSR: product,
      variants_SSR: variants,
     },
  }
}

// ==============================================