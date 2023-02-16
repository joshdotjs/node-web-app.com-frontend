import { useEffect } from "react";

// ==============================================

export default function RadioButtons({ name, options, set, setSet }) {

  // -options:    array of options to choose from.
  // -set:        set of chosen options.
  // -setSet:     function setting the external chosen set.

  // --------------------------------------------

  // const options = ['sm', 'lg'];
  // const [set, setSet]   = useState(new Set());
  useEffect(() => {
    console.log('set: ', set);
  }, [set]);

  // --------------------------------------------

  const handleOption = (option) => () => {

    setSet(prev => {
      if (prev.has(option)) {
        const clone = new Set([...prev]);
        clone.delete(option);
        return clone;
      }
      else {
        const clone = new Set([...prev]);
        clone.add(option);
        return clone;
      }
    });

  };

  // --------------------------------------------

  return (
    <div className="my-4">
      <div className={`inline py-2 px-4 ml-4`}>{name}: </div>
      {
        options.map((option, idx) => {

          const key = `check-${idx}`;

          return (
            <div key={key}  onClick={handleOption(option)} className={`border inline py-2 px-4 cursor-pointer ml-4 ${set.has(option) ? 'bg-blue-300' : ''}`}>{option}</div>
          );
        })
      }
    </div>
  );

  // --------------------------------------------
}

// ==============================================