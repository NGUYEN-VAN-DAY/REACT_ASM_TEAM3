import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const data = [
  { name: "Jan", sales: 4000, profit: 2400 },
  { name: "Feb", sales: 3000, profit: 1398 },
  { name: "Mar", sales: 5000, profit: 2000 },
  { name: "Apr", sales: 4780, profit: 2181 },
  { name: "May", sales: 5890, profit: 2500 },
  { name: "Jun", sales: 4390, profit: 2100 },
];

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Grocery", value: 300 },
  { name: "Accessories", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const worldData = [
  { name: "USA", sales: 5000 },
  { name: "China", sales: 4000 },
  { name: "Germany", sales: 3500 },
];

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center">Dashboard</h2>

      <div className="row mt-3">
        {/* Tổng quan thống kê */}
        <div className="col-md-4">
          <div className="card text-center shadow p-3">
            <h5>Total Sales</h5>
            <h3>$45,000</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow p-3">
            <h5>Total Profit</h5>
            <h3>$12,000</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow p-3">
            <h5>Orders</h5>
            <h3>1200</h3>
          </div>
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="card shadow p-4 mt-3">
        <h4 className="text-center">Sales & Profit Chart</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#8884d8" name="Sales" />
            <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ tròn */}
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h4 className="text-center">Sales by Category</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ đường */}
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h4 className="text-center">Sales Trend</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bản đồ thế giới */}
      <div className="card shadow p-4 mt-3">
        <h4 className="text-center">Sales by Country</h4>
        <div style={{ width: "100%", height: "400px" }}>
          <ComposableMap projection="geoMercator">
            <Geographies geography="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json">
              {({ geographies }) =>
                geographies.map((geo) => {
                  const country = worldData.find((c) => c.name === geo.properties.name);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={country ? "#0088FE" : "#EAEAEC"}
                      stroke="#D6D6DA"
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
