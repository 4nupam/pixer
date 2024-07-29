import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    // Fetch data from local storage
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    setData(storedData);
  }, []);

  // Filter data based on search input
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedItem({ ...data[index] });
  };

  const handleSave = () => {
    const updatedData = [...data];
    updatedData[editIndex] = editedItem;
    setData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData));
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">User Information</h1>
        <p className="text-gray-600 mt-2">Search for user details by name</p>
      </header>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 w-full md:w-1/2 lg:w-1/3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {filteredData.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="p-6">
              {editIndex === index ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={editedItem.name}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="email"
                    value={editedItem.email}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="address1"
                    value={editedItem.address1}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="address2"
                    value={editedItem.address2}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="pan"
                    value={editedItem.pan}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    value={editedItem.postalCode}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="city"
                    value={editedItem.city}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditIndex(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">{item.name}</h2>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Email: </span>{item.email}
                    </p>
                     <p className="text-gray-700">
                      <span className="font-medium">Number: </span>{item.number}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Address 1: </span>{item.address1}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Address 2: </span>{item.address2}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">PAN: </span>{item.pan}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Postal Code: </span>{item.postalCode}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">City: </span>{item.city}
                    </p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
