import Link from "next/link";
import Layout from "comps/_layout/layout";

// ==============================================

function Page() {

  // --------------------------------------------

  return (
    <>
      
      <ul>
        <ul>
          <li className="admin">
            <Link href="/admin/orders">orders</Link>
          </li>
          <li className="admin">
            <Link href="/admin/products">products</Link>
          </li>
          <li className="admin">
            <Link href="/admin/users">users</Link>
          </li>
        </ul>
      </ul>

    </>
  );

  // --------------------------------------------
}

// ==============================================

export default function Root() {

  // --------------------------------------------

  return(
    <Layout name="admin" restrict="admin">
      <Page />
    </Layout>
  );
}

// ==============================================