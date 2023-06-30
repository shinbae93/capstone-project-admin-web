// số gia sư -> line chart
// số học viên -> line chart
// doanh thu -> bar chart

import RevenueChart from './RevenueChart'

const Dashboard = () => {
  return (
    <div>
      <div className="p-10">
        <p className="mb-5 font-semibold text-2xl">Revenue</p>
        <RevenueChart />
      </div>
    </div>
  )
}

export default Dashboard
