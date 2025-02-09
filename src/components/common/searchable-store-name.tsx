import { useState } from "react";

// Define the store type
interface Store {
  id: string;
  name: string;
}

// Define the props type for the component
interface SearchableStoreDropdownProps {
  storeList: Store[];
  setSelectedStore: (storeName: string) => void;
}

const SearchableStoreDropdown: React.FC<SearchableStoreDropdownProps> = ({
  storeList,
  setSelectedStore,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // Handle user input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter stores based on user input
    if (value.trim() === "") {
      setFilteredStores([]);
      setShowDropdown(false);
    } else {
      const filtered = storeList.filter((store: Store) =>
        store.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStores(filtered);
      setShowDropdown(true);
    }
  };

  // Handle store selection
  const handleSelectStore = (storeName: string) => {
    setSearchTerm(storeName);
    setSelectedStore(storeName);
    setShowDropdown(false); // Hide dropdown after selection
  };

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Store Name:
      </label>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search for a store..."
        onFocus={() => setShowDropdown(true)}
      />

      {/* Dropdown suggestions */}
      {showDropdown && filteredStores.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-40 overflow-y-auto">
          {filteredStores.map((store: Store) => (
            <li
              key={store.id}
              className="p-2 cursor-pointer hover:bg-blue-100"
              onClick={() => handleSelectStore(store.name)}
            >
              {store.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableStoreDropdown;
