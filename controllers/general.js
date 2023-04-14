import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import OverallStat from "../models/OverallStat.js";
// Defining our handler function for our /user/:id route.
export const getUser = async (req, res) => {
  try {
    // Getting the id param out of the route.
    const { id } = req.params;

    // Getting the User from the User's collection whose id is equal
    // to the id given in the param.
    const user = await User.findById(id);

    // We then return the user in response to making the API Call
    res.status(200).json(user);
  } catch (error) {
    // If any error occurs then we return a error 404 and also
    // a json object containing the error message
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // I will comment once i know what this is for.
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-03-15";

    // Getting 50 most recent transactions from the transactions
    // collection.

    // Since time is stored in nano seconds hence by sorting in desending
    // order i will be able to bring the lastest ones in that start cause
    // there nano seconds is probably greater.

    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    // Grabbing the information of a specific date from the overall stats
    // collection the date im going to be grabbing the data of is going to
    // on the basis of the dummy data.
    const overallStat = await OverallStat.findOne({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat;

    // Grabbing the november statistics from the monthly data.

    // This is going to iterate through all the months data and grab the one
    // whose month attribute is equal to novemeber. ezz.

    const thisMonthStats = overallStat.monthlyData.find(
      ({ month }) => month === currentMonth
    );

    // Grabbing the daily object from the collection whose data attribute is equal
    // the dummy date that we have set in the variable.

    const todayStats = overallStat.dailyData.find(
      ({ date }) => date === currentDay
    );

    res
      .status(200)
      .json({
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
        thisMonthStats,
        todayStats,
        transactions,
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
