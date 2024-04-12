import React from "react";

function DashboardHome() {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>

      {/* Placeholder content: Replace with actual dashboard components */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Chart 1 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Sales Overview</h2>
          {/* Insert your chart component here */}
          <p>Placeholder for chart...</p>
        </div>

        {/* Chart 2 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">User Statistics</h2>
          {/* Insert your chart component here */}
          <p>Placeholder for chart...</p>
        </div>

        {/* Statistics */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Website Statistics</h2>
          <ul>
            <li>Total Users: 1000</li>
            <li>Total Orders: 500</li>
            <li>Total Revenue: $5000</li>
          </ul>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Recent Orders</h2>
          <ul>
            <li>Order 1</li>
            <li>Order 2</li>
            <li>Order 3</li>
          </ul>
        </div>

        {/* Placeholder Content 1 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Placeholder Content 1</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            fringilla velit non nisl euismod, ut fringilla justo faucibus.
          </p>
        </div>

        {/* Placeholder Content 2 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Placeholder Content 2</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            fringilla velit non nisl euismod, ut fringilla justo faucibus.
          </p>
        </div>

        {/* Placeholder Content 3 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Placeholder Content 3</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            fringilla velit non nisl euismod, ut fringilla justo faucibus.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
