import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email); 
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for(let i = 0; i< Math.min(words.length, 2); i++){
        initials += words[i][0];
    }

    return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart
      ? `${formattedInteger}.${fractionalPart}`
      : formattedInteger;
}

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        amount:item?.amount,
    }));

    return chartData;
}

// export const prepareIncomeBarChartData = (data = []) => {
//     const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

//     const chartData = sortedData.map((item) => ({
//         month: moment(item?.date).format('Do MMM'),
//         amount: item?.amount,
//         source: item?.source,
//     }));

//     return chartData;
// }

// src/utils/helper.js  (add/replace this function)

export const prepareIncomeBarChartData = (transactions = []) => {
    if (!transactions || transactions.length === 0) {
        console.log("No transactions for chart");
        return [];
    }

    
    const grouped = transactions.reduce((acc, item) => {
        const key = item.source || "Other";   

        if (!acc[key]) {
            acc[key] = 0;
        }
        acc[key] += Number(item.amount) || 0;
        return acc;
    }, {});

    return Object.entries(grouped).map(([category, amount]) => ({
        category,
        amount: Math.round(amount)
    }));
};

// export const prepareExpenseBarChartData = (transactions = []) => {
//     if (!transactions || transactions.length === 0) {
//         console.log("No transactions for chart");
//         return [];
//     }

    
//     const grouped = transactions.reduce((acc, item) => {
//         const key = item.category || "Other";   

//         if (!acc[key]) {
//             acc[key] = 0;
//         }
//         acc[key] += Number(item.amount) || 0;
//         return acc;
//     }, {});

//     return Object.entries(grouped).map(([category, amount]) => ({
//         category,
//         amount: Math.round(amount)
//     }));
// };