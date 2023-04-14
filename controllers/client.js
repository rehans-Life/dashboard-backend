import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
  try {
    // Going to return an array consisting of all the product
    // documents in our products collection.
    const products = await Product.find();

    // Since on the dashboard we want to show the product stats
    // as well when we are showing off the products therefore
    // im going to combine the each product document with its
    // corresponding product stats document as well.

    // So Im going to map through each product document
    // and then make a api call within the map function for each
    // product document to get its stats document and then
    // im going to combine both the documents and add it to
    // the new mapped array

    // Since im going to make api calls within the map function so
    // I need the callback function to be an asynchronus function
    // so therefore I need the map function to wait for each
    // of the asynchronus functions to execute for that im using
    // Promise.all which is going to wait for all the asychronus
    // calls to finish and then only return the mapped array.

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const productStats = await ProductStat.findOne({
          productId: product._id,
        });
        return {
          ...product._doc,
          stats: productStats,
        };
      })
    );

    // Sending the products along with the stats extracted from the
    // collections to as response to the frontend.
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    // Users with 'user' role are considered our customers
    // while admins and superAdmins control and manage the
    // dashboard.

    // Using the select method we can specify which fields of the
    // documents that we want and what are the ones we do not want.

    // In our case we are not including the password field in the
    // documents that we get.

    const customers = await User.find({ role: "user" }).select("-password");

    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // Getting the data sent from the frontend to determine the page
    // were on in our datagrid, how many transactions do they want
    // to show in one page of the data grid and also according to which
    // field do they want the data to be sorted by.
    // and also give them the data as per their searches made as well.

    // Frontend is going to send us pageNo which by default is set to
    // 1

    // The number of transactions that to be shown in one page by
    // default its set to 20

    // They are also going to send us an object containing by which
    // field they want to sort the data by and also do they want it
    // to be sorted in descending or ascending order.

    // FORMAT: {field:"Field_Name",sort:"desc" or "asc"}

    const { pageNo = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // We are going to create a function that returns an object which is
    // going to contain the field name as key and its value would be
    // 1 or -1 on the basis of weather the user wants the data to be
    // sorted in ascending order which is 1 or descending order which
    // is -1.

    // This object is going to be passed in to the sort method.
    // sort({'field_name':1 / -1})

    const generateSort = () => {
      // The object we get is going to be stringified.
      const sortParsed = JSON.parse(sort);
      const sortedFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortedFormatted;
    };

    // If sort exists we run our generate sort method which
    // is going to return us the object which we can pass in
    // our sort method which its going to use to our
    // documents by

    // If they havent passed any information on the basis of
    // how they want the data to be sorted set the variable
    // to an empty object.

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    // The skip method is going to help us skip documents
    // on the basis of the page we are on and therefore
    // show unique documents on each page of the grid.

    // For Example On pafe Zero we skip zero documents on page one
    // we skip first 20 documents. And we get the documents indexed
    // from 21 to 40 Cause limit is set to 20

    // On Page two (2*20=40) we skip the first 40 documents.
    // And we get the documents indexed from 41 to 60.

    // And it makes sense to skip 40 cause from 21 to 40
    // we already showed on page 1 now we wanna show documents
    // from 41 to 60 on page 2.

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(pageNo * pageSize)
      .limit(pageSize);

    // Counts the total number of documents in our transactions
    // collection
    const total = await Transaction.countDocuments({
      name: { $regex: search, options: "i" },
    });
    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    // We now have to format our users in way i can represent
    // them in the nivo map chart

    // For this nivo charts requires us to have an array of objects where there
    // is a ID property which has the country code and a value property
    // which has the number of the users which are of that country.

    // So for example: {id:"BHD",value:233} this is how each object should
    // look like where id is the country code and value is the number of users
    // located in that country.

    // But the country code nivo requires is a three letter country code but in our
    // users information the country codes are in two characters so we are basically
    // going to use a package that is going ot convert all the country codes for us
    // from two to three.

    // So by using the reduce function im going to create one big object with
    // the country codes mapped to the amount of users located in that coutnry.

    // mappedLocatiosn = {
    //  BHD:2343,
    //  AR:21212,
    //  USA:121213,
    //  CNI:210212
    // }

    const mappedLocations = users.reduce((acc, { country }) => {
      // Converting the ISO2 country code to ISO3 which is what nivo charts wants
      // from us.
      const countryCodeISO3 = getCountryIso3(country);

      // Checking to see if the country code is already in our accumulating object
      // or not
      if (!acc[countryCodeISO3]) {
        // If it isnt then add it as a key
        acc[countryCodeISO3] = 0;
      }
      // Incrementing the value of that particular country code to which our current user
      // belongs too.
      acc[countryCodeISO3] += 1;

      return acc;
    }, {});

    // I need to format those key value pairs into their own seperate objects as per
    // nivo charts requirements
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, value]) => ({
        id: country,
        value,
      })
    );
    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
