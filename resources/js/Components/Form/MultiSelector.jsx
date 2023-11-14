import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

export default function MultiSelector({
  id,
  route,
  className,
  selectedItems = [],
  setSelectedItems
  }) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [matchingMultis, setMatchingMultis] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchMatchingMultis() {
      if (debouncedSearchTerm.length < 2) return ;
      const response = await fetch(`${route}?q=${debouncedSearchTerm}`);
      const multis = await response.json();
      const filteredTags = multis.filter(mult => !selectedItems.includes(mult));
      setMatchingMultis(filteredTags);
    }

    debouncedSearchTerm ? fetchMatchingMultis() : setMatchingMultis([])
  }, [debouncedSearchTerm]);

  function handleItemSelect(multi) {
    setSelectedItems(multi);
    setSearchTerm('');
    setMatchingMultis([]);
  }

  function handleItemRemove(multi) {
    setSelectedItems(multi, false);
  }

  useEffect(()=>{
    selectedItems.map(element => {
      <SelectedItemsList selectedItems={element} onRemove={handleItemRemove} />
    });
  },[])

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          id={id}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`flex p-3 rounded-md text-sm border-gray-300 mx-auto border w-full ${className}`}
        />
        {matchingMultis.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            {matchingMultis.map(multi => (
              <div
                key={multi.id}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                onClick={() => handleItemSelect(multi)}
              >
                {multi.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <SelectedItemsList selectedItems={selectedItems} onRemove={handleItemRemove} />
    </div>
  );
}

function SelectedItemsList({ selectedItems, onRemove }) {
  return (
    <ul className='my-2'>
      {selectedItems.map(multi => (
        <li key={multi.id} className="inline-block px-2 py-1 bg-blue-200 text-sm rounded-md mr-2 mb-2">
          {multi.name}{' '}
          <button type="button" onClick={() => onRemove(multi)}>
            &times;
          </button>
        </li>
      ))}
    </ul>
  );
}
