import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  {
    month: 'January',
    revenue: 100000,
  },
  {
    month: 'February',
    revenue: 2000000,
  },
  {
    month: 'March',
    revenue: 30000,
  },
  {
    month: 'April',
    revenue: 4000000,
  },
  {
    month: 'May',
    revenue: 250000,
  },
  {
    month: 'June',
    revenue: 59999,
  },
  {
    month: 'July',
    revenue: 0,
  },
  {
    month: 'August',
    revenue: 0,
  },
  {
    month: 'September',
    revenue: 0,
  },
  {
    month: 'October',
    revenue: 0,
  },
  {
    month: 'November',
    revenue: 0,
  },
  {
    month: 'December',
    revenue: 0,
  },
]

const RevenueChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        title="Revenue"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="month" fill="#8884d8" />
        <Bar dataKey="revenue" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default RevenueChart
