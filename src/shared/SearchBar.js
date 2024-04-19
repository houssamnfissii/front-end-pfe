import { FaSearch } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

const SearchBar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [city, setCity] = useState('');

  const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier'];

  const handleSearch = () => {
    // Handle search functionality
    console.log('Searching...');
    console.log('City:', city);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center">
      <select
  value={city}
  onChange={(e) => setCity(e.target.value)}
  className="w-full md:w-64 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 md:mb-0 md:mr-2 appearance-none"
  style={{ fontSize: '16px' }}
>
  <option value="" disabled className="text-sm">Select City</option>
  {cities.map((city) => (
    <option key={city} value={city} className="text-sm">
      {city}
    </option>
  ))}
</select>

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className="w-full md:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 md:mb-0 md:mr-2"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          className="w-full md:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 md:mb-0 md:mr-2"
        />
        <button
          onClick={handleSearch}
          className="w-full md:w-auto mb-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          <FaSearch className="inline-block mr-2" />
          Search
        </button>
      </div>
    </div>
  );
};
export default SearchBar;