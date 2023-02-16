import Link from 'next/link';

import Button from 'comps/button/button';

// ==============================================

export default function Page ({ products }) {

  // --------------------------------------------
  // --------------------------------------------

  return (
    <section id="products" className="bg-orange-200">
      <h2>Products:</h2>
        
      { products.length > 0 && products.map((product) => {

        const { id, title, body, price } = product;

        return (
          <div key={id} className="mb-4 border p-4">
            <h2>{title}</h2>
            <p>{body}</p>
            <p><strong>${price}</strong></p>

            <Link href={`/store/product/${id}`}>
              <Button>Details</Button>
            </Link>
          </div>
        );
      })}
    </section>
  );
};

// ==============================================