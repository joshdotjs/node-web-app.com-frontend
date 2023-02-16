import { useEffect, useState } from "react";

import CheckBoxes from "comps/inputs/check-boxes/check-boxes";
import RadioButtons from 'comps/inputs/radio-buttons/radio-buttons';

import { authFetch } from "util/fetch";
import { lg, lr } from "util/log";

// ==============================================

export default function CreateProduct() {

  // --------------------------------------------

  const [title, setTitle] = useState('');
  const [body, setBody]   = useState('');
  const [price, setPrice] = useState(0);

  const categories = ['shirts', 'shoes'];
  const [category, setCategory] = useState('');

  // -Each row in variants corresponds to one permutation of the chosen options ({sizes}, {colors})
  const [variants, setVariants] = useState([]);
  // [
  //    { sizes: 'sm',  color: 'red',  qty: 1 },
  //    { sizes: 'sm',  color: 'blue', qty: 1 },
  //    { sizes: 'lg',  color: 'blue', qty: 1 },
  // ]

  // -Options. The variants are created from all permuations of these options.
  const [sizes, setSizes]   = useState(new Set());
  const [colors, setColors] = useState(new Set());

  // -Update variants (CONSIDER AVOIDING useEffect!)
  useEffect(() => {

    const sizes_arr = Array.from(sizes);
    const colors_arr = Array.from(colors);

    console.log('sizes_arr: ', sizes_arr, '\tcolors_arr: ', colors_arr);

    let variants = [];
    for (let i = 0; i < sizes_arr.length; ++i) {
      for (let j = 0; j < colors_arr.length; ++j) {
        variants.push({ size: sizes_arr[i], color: colors_arr[j], qty: 0 });
      }
    }
    setVariants(variants);

  }, [sizes, colors]);

  // --------------------------------------------

  useEffect(() => {
    console.log('variants: ', variants);
  }, [variants]);

  // --------------------------------------------

  const handler = async () => {

    console.log('body: ', {
      title,
      body,
      price,
      category,
      variants,
    });

    // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;
    const url = '/api/products';
    const [data, error] = await authFetch({
      url: url, 
      method: 'POST', 
      body: {
        title,
        body,
        price,
        category,
        variants,
      },
    });

    if (error) {
      alert('TODO: Unauthorization Notification...');
    }
    if (!error) {
      lg('SUCCESS');
    }

  };

  // --------------------------------------------

  const enabled = () => {

    // let all_variants_non_zero_qty = true;
    // // variants.forEach(variant => {
    // //   if (variant.qty < 1) {
    // //     all_variants_non_zero_qty = false;
    // //   }
    // // });

    const category_non_empty = category !== '';

    return title.length > 0 && body.length > 0 && price > 0 && sizes.size > 0 && colors.size > 0 && category_non_empty;
  };

  // FLOW:
  //  -User selects set of {sizes}, {colors} from list (cannot add/remove options).
  //  -Table is generated for all permutations of {sizes} & {colors}.
  //  -Each row (each permuation) has the user set the quantity (price is set on the product).

  // --------------------------------------------

  return (
    <>
      {/* - - - - - - - - - - - - - - - - - - */}

      <h1 className="underline text-xl mb-4 text-orange-300">Create Product</h1>

      {/* - - - - - - - - - - - - - - - - - - */}

      <div className="mb-8">
        <label htmlFor="title">Title: </label>
        <input id="title" className="mr-8" onChange={(e) => setTitle(e.target.value)} value={title} />

        <label htmlFor="body">Body: </label>
        <input id="body" className="mr-8" onChange={(e) => setBody(e.target.value)} value={body} />

        <label htmlFor="price">Price: </label>
        <input id="price" onChange={(e) => setPrice(Number(e.target.value))} value={price} />
      </div>

      {/* - - - - - - - - - - - - - - - - - - */}

      <div className="mb-8">
        <h2 className="text-md mb-4 text-blue-300">Classification</h2>
        <RadioButtons name="category" options={categories} selected={category}  setSelected={setCategory} />
      </div>

      {/* - - - - - - - - - - - - - - - - - - */}


      <div className="mb-8">
        <h2 className="text-md mb-4 text-blue-300">Options</h2>
        <CheckBoxes name="sizes"  options={['sm', 'lg']}    set={sizes}  setSet={setSizes}  />
        <CheckBoxes name="colors" options={['red', 'blue']} set={colors} setSet={setColors} />
      </div>

      {/* - - - - - - - - - - - - - - - - - - */}

      <div className="mb-8">
        <h2 className="text-md mb-4 text-blue-300">Variants</h2>
        {variants.length > 0 && variants.map((variant, idx) => {

          const key = `variant-${idx}`;

          return (
            <div key={key} className="py-1">
              <div className="inline">
                <span>Size: {variant.size}</span>
                <span className="ml-8">Color: {variant.color}</span>
              </div>

              
              <div className="ml-8 inline">
                <label htmlFor="qty">Quantity: </label>
                <input 
                  id="qty" 
                  onChange={(e) => {
                    setVariants((prev_variants) => {
                      const clone = [...prev_variants];
                      clone[idx].qty = Number(e.target.value);
                      return clone;
                    });
                  }}
                  value={variant?.qty} 
                />
              </div>

            </div>
          );
        })}
      </div>

      {/* - - - - - - - - - - - - - - - - - - */}

      <div 
        onClick={handler} 
        className={`border inline py-2 px-4 cursor-pointer my-8`} 
        style={{
          pointerEvents: enabled() ? 'auto' : 'none',
          opacity:       enabled() ? 1 : 0.3,
        }}
      >
        Submit
      </div>

      {/* - - - - - - - - - - - - - - - - - - */}

      <hr className="border-dashed  border-2  my-8" />

      {/* - - - - - - - - - - - - - - - - - - */}
    </>
  );

  // --------------------------------------------
}

// ==============================================