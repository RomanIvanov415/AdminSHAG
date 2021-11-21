import React, {useEffect, useState} from 'react';

import { getSales } from 'http/statisticAPI';

import { Line } from 'react-chartjs-2';
import { Col, Row } from 'reactstrap';



export default function Statistic() {
  const [months, setMonths] = useState(['','','','','','']);
  const [sales, setSales] = useState([0,0,0,0,0,0]);
  const [quantity, setQuantity] = useState([0,0,0,0,0,0]);


  const salesData = {
    labels: months,
    datasets: [
      {
        label: '# of Votes',
        data: sales,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const salesOptions = {
    legend: {
        display: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const ordersData = {
    labels: months,
    datasets: [
      {
        label: '# of Votes',
        data: quantity,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const ordersOptions = {
    legend: {
        display: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  useEffect(() => {
    getSales().then(res => {
      setMonths(res.months);
      setQuantity(res.quantity);
      setSales(res.sales);
    })
  }, [])

    return (
        <div className="content">
            <Row>
                <Col lg="12">
                <h1>Sales</h1>
                    <Line data={salesData} options={salesOptions} height={60}/>
                </Col>
                <Col lg="12">
                <h1>Orders</h1>
                    <Line data={ordersData} options={ordersOptions} height={60}/>
                </Col>
            </Row>
        </div>
    )
}
