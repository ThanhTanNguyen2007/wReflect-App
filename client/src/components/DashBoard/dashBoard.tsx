import React,{ PureComponent } from 'react'
import { Column } from '@ant-design/charts';
import { BarChart, Bar, PieChart,Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const DashBoard =()=>{
    const data = [
        {
          name: 'Open',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Pending',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Resolved',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Closed',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
       
      ];
    return(
        <div style={{background:"white",height:"100%",marginTop:20}}>
        <ResponsiveContainer width="50%" height="50%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey='pv' fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
     
      </div>
        
    )
}
export default DashBoard;