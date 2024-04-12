import React from "react";

function DashboardProducts() {
  // Dummy data for products (replace with actual data)
  const products = [
    { id: 1, name: "Product 1", price: "$10" },
    { id: 2, name: "Product 2", price: "$20" },
    { id: 3, name: "Product 3", price: "$30" },
    // Add more products as needed
  ];

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Products</h1>

      {/* Product List */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Product List
        </h2>
        <ul>
          {products.map((product) => (
            <li key={product.id} className="text-gray-700">
              <span className="font-semibold">{product.name}</span> -{" "}
              {product.price}
            </li>
          ))}
        </ul>
      </div>

      {/* Add Product Button */}
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Product
        </button>
      </div>
    </div>
  );
}

export default DashboardProducts;
