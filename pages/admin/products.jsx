import Layout from "comps/_layout/layout";
import CreateProduct from "comps/__pages/admin/create-product";
import ModifyProduct from "comps/__pages/admin/modify-product";

// ==============================================

function Page() {
  // --------------------------------------------

  return (
    <>
      <CreateProduct />

      {/* Update & Delete */}
      <ModifyProduct />
    </>
  );

  // --------------------------------------------
}

// ==============================================

export default function Root() {

  // --------------------------------------------

  return(
    <Layout name="admin--products" restrict="admin">
      <Page />
    </Layout>
  );
}

// ==============================================