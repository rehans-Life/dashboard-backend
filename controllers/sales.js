import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
  try {
    // In overall stats collection we are going to have only one
    // document inside of it representing the year 2021.
    // And thats it we dont have more documents representing
    // other years
    const overallStats = await OverallStat.find();
    // Hence thats we are going to sending just that one document
    // that we have in our collection.
    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
