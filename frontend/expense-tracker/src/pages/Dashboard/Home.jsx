import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useCallback } from 'react';
import InfoCard from '../../components/Cards/InfoCard';

import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from "react-icons/io"
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransaction from '../../components/Dashboard/ExpenseTransaction';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';

const Home = () => {
    useUserAuth();

    const navigate = useNavigate();

    const[dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDashboardData = useCallback(async () => {
        if (loading) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.DASHBOARD.GET_DATA}`
            );

            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
            setError("Failed to load dashboard data. Please try again.");
        }finally {
            setLoading(false);
        };
    }, [loading]);
    useEffect(() => {
        fetchDashboardData();
        return () => {};
    }, [fetchDashboardData]);

    return(
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-red-500">{error}</p>
                        <button onClick={fetchDashboardData} className="ml-4 px-4 py-2 bg-primary text-white rounded">Retry</button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InfoCard
                                icon={<IoMdCard />}
                                label="Total Balance"
                                value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                                color="bg-primary"
                            />

                            <InfoCard
                                icon={<LuWalletMinimal />}
                                label="Total Income"
                                value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                                color="bg-orange-500"
                            />

                            <InfoCard
                                icon={<LuHandCoins />}
                                label="Total Expense"
                                value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
                                color="bg-red-500"
                            />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                            <RecentTransactions
                                transactions={dashboardData?.recentTransactions}
                                onSeeMore={()=> navigate("/expense")}
                            />

                            <FinanceOverview
                                totalBalance={dashboardData?.totalBalance || 0}
                                totalIncome={dashboardData?.totalIncome || 0}
                                totalExpenses={dashboardData?.totalExpenses || 0}
                            />

                            <ExpenseTransaction
                                transactions={dashboardData?.last30DayExpenses?.transactions || []}
                                onSeeMore={() => navigate("/expense")}
                            />
                            <Last30DaysExpenses
                                data={dashboardData?.last30DayExpenses?.transactions || []}
                            />
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>        
    );
};

export default Home
