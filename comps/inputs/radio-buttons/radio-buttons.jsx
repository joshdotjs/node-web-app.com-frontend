import { useEffect } from "react";

// ==============================================
// name="sizes"  options={['sm', 'lg']}    selected={category}  setSelected={setCategory}
export default function RadioButtons({ name, options, selected, setSelected }) {

  // --------------------------------------------

  // const options = ['sm', 'lg'];
  // const [selected, setSelected] = useState('');

  useEffect(() => {
    console.log('selected: ', selected);
  }, [selected]);


  // --------------------------------------------

  return (
    <div className="my-4">
      <div className={`inline py-2 px-4 ml-4`}>{name}: </div>
      {
        options.map((option, idx) => {
          console.log('selected: ', selected, '\toption: ', option);
          const key = `radio-${idx}`;
          return (
            <div key={key} onClick={() => setSelected(option)} className={`border inline py-2 px-4 cursor-pointer ml-4 ${selected === option ? 'bg-green-300' : ''}`}>{option}</div>
          );
        })
      }
    </div>
  );

  // --------------------------------------------
}

// ==============================================