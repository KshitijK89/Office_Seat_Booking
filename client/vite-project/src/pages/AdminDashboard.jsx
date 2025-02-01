import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import seatService from '../services/seatService';
import resourceService from '../services/resourceService';

Chart.register(...registerables);

const AdminDashboard = () => {
  const [seatData, setSeatData] = useState({ available: 0, occupied: 0 });
  const [resourceData, setResourceData] = useState({ power: 0, water: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const seats = await seatService.getSeats();
      const resources = await resourceService.getResourceUsage();
      
      // Calculate seat utilization
      const available = seats.filter(s => s.status === 'available').length;
      const occupied = seats.filter(s => s.status === 'occupied').length;
      setSeatData({ available, occupied });

      // Mock resource data (replace with API later)
      setResourceData({
        power: resources.power || 1500, // kWh
        water: resources.water || 2000, // gallons
      });
    };
    fetchData();
  }, []);

  // Seat utilization chart
  const seatChartConfig = {
    labels: ['Available', 'Occupied'],
    datasets: [{
      label: 'Seats',
      data: [seatData.available, seatData.occupied],
      backgroundColor: ['#90EE90', '#FF7276'],
    }],
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="analytics-section">
        <h2>Seat Utilization</h2>
        <Bar data={seatChartConfig} />
        <h2>Resource Consumption (Mock Data)</h2>
        <p>Power: {resourceData.power} kWh</p>
        <p>Water: {resourceData.water} gallons</p>
      </div>
    </div>
  );
};

export default AdminDashboard;