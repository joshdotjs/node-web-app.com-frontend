import Layout from "comps/_layout/layout";

import Page from "comps/__pages/store/__page-store";

// ==============================================

export default function Root({ products_SSR }) {

  // --------------------------------------------

  return (
    <Layout name="checkout" restrict="user">
      <Page { ...{ products_SSR } }/>
    </Layout>
  );

  // --------------------------------------------
}

// ==============================================

export async function getStaticProps() { // enable SSR

  const url = `${process.env.API_URL}/api/products`;
  const resp = await fetch(url);
  const products_SSR = await resp.json();

  console.log('products: ', products_SSR);

  return {
    props: { products_SSR },
    revalidate: 1 * 60, // enable ISR (update every 1-min)
  };
}

// ==============================================
