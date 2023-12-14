import React, { useEffect, useState, useRef } from 'react';
import PostService from '@/services/PostService';
import Chart from 'chart.js/auto';

const UserPostCountPage = () => {
    const [userPostCounts, setUserPostCounts] = useState([]);
    const chartRef = useRef(null);
  
    const fetchData = async () => {
      try {
        const data = await PostService.getUserPostCounts();
        console.log('Data from getUserPostCounts:', data);
        setUserPostCounts(data.userPostCounts);
      } catch (error) {
        console.error('Error fetching user post counts:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []); 
  
    useEffect(() => {
      renderChart();
  
      return () => destroyChart();
    }, [userPostCounts]);
  
    const renderChart = () => {
      destroyChart();
  
      const ctx = document.getElementById('userPostChart');
      chartRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: userPostCounts.map(user => user.username),
          datasets: [
            {
              data: userPostCounts.map(user => user.postCount),
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
      });
    };
  
    const destroyChart = () => {
      if (chartRef.current && typeof chartRef.current.destroy === 'function') {
        chartRef.current.destroy();
      }
    };
  
    return (
      <div>
        <h1>Posts per user</h1>
        <div className="chart-container">
          <canvas id="userPostChart" width="400" height="400"></canvas>
        </div>
      </div>
    );
  };
  
  export default UserPostCountPage;