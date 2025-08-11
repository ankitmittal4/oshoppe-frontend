// src/ColorPickerPopup.js
import React, { useState } from 'react';

const ColorPickerPopup = ({ onClose }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterSection, setShowFilterSection] = useState(true);
  const [showColorSection, setShowColorSection] = useState(true);

  const filters = [
    'Jotun Interior Special', 'Jotun Exterior Special', 'RAL colors',
    'Raomano Special Colour', 'nuove', 'ROyal velevet special color',
    'pearl special coours', 'glaze slpecial colours', 'stucco antica',
    'prestige', 'jotafloor', 'romano(lady desing)'
  ];

  const colors = [
    { id: 1, name: 'Red', description: 'Bright red color', group: 'Jotun Interior Special' },
    { id: 2, name: 'Blue', description: 'Sky blue color', group: 'Jotun Exterior Special' },
    // Add more colors here...
  ];

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredColors = colors.filter(color =>
    (selectedFilters.length === 0 || selectedFilters.includes(color.group)) &&
    (searchTerm ? color.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 h-screen w-screen-lg mx-auto overflow-auto relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>✖</button>
        <h2 className="text-2xl mb-4">Add Custom Color to your Paint</h2>

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl mb-2">Color Group Filter</h3>
            <button onClick={() => setShowFilterSection(!showFilterSection)}>
              {showFilterSection ? '▲' : '▼'}
            </button>
          </div>
          {showFilterSection && (
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter}
                  className={`px-4 py-2 border rounded ${selectedFilters.includes(filter) ? 'border-green-500 text-green-500' : 'border-gray-300'}`}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl mb-2">Select to add the color to your selected paint</h3>
            <button onClick={() => setShowColorSection(!showColorSection)}>
              {showColorSection ? '▲' : '▼'}
            </button>
          </div>
          {showColorSection && (
            <>
              <input
                type="text"
                placeholder="Search colors..."
                className="border border-gray-300 rounded p-2 w-full mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex flex-wrap gap-4">
                {filteredColors.map(color => (
                  <div key={color.id} className="border border-gray-300 rounded p-4 w-full md:w-1/3">
                    <div className="h-10 mb-2" style={{ backgroundColor: color.name.toLowerCase() }}></div>
                    <h4 className="font-bold">{color.name}</h4>
                    <p>ID: {color.id}</p>
                    <p>{color.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPickerPopup;
