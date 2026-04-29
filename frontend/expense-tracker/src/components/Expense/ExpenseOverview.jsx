import React from 'react'
import { LuPlus } from "react-icons/lu"
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/helper'
import { useState } from 'react'
import { useEffect } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';

const ExpenseOverview = ({ transactions, onAddExpense }) => {
    const [chartData, setCharData] = useState([])
    //console.log("transactions:", transactions);
    //console.log("chartData:", chartData);
    useEffect(() => {
      const result = prepareExpenseBarChartData(transactions);
      console.log("chart result: ", result);
      setCharData(result);

      return () => {};
    }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className='text-lg'>Expense Overview</h5>
          <p className='text-xs text-gray-400 mt-0.5'>
            Track your earning over time and analyze your expense trend
          </p>
        </div>

        <button className='add-btn' onClick={onAddExpense}>
          <LuPlus className='text-lg' />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData}/>
      </div>
    </div>
  )
}

export default ExpenseOverview