import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useState } from 'react'

const Income = () => {

    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const [openAddIncomeModal, setOpenAddIncomeModel] = useState(second);
    return(
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModel(true)}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Income