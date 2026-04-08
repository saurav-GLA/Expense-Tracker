import React, { useState } from 'react'

const Last30DaysExpenses = ({data}) => {
  
  const [chartData, setChartData] = useState(data || []);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg"> Last 30 Days Expenses</h5>
      </div>
      <p>Total transactions: {chartData.length}</p>
    </div>
  )
}

export default Last30DaysExpenses
