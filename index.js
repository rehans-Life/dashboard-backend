// Express for setting up API's
import express from "express";
// Body Parser for parsing data that is recieved from frontend so you
// dont have to manually parse it yourself
import bodyParser from "body-parser";
// Mongoose for making calls to our MongoDB database
import mongoose from "mongoose";
// Cors for transferring data between browser and server and cross domain
// sharing of data.
import cors from "cors";
// Dotenv for environment variables
import dotenv from "dotenv";
// helmet for protecting our API's
import helmet from "helmet";
// Morgon for looging our API calls
import morgan from "morgan";

/* IMPORTING ROUTES */
import clientRoutes from "./routes/client.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import generalRoutes from "./routes/general.js";

/* Data Imports */

// Importing the User's Collection
import User from "./models/User.js";

// Importing the Product's Collection
import Product from "./models/Product.js";

// Importing the Product Stat's Collection
import ProductStat from "./models/ProductStat.js";

// Importing the Transactions Collection
import Transaction from "./models/Transaction.js";

// Importing the OverallStats Collection
import OverallStat from "./models/OverallStat.js";

/* Importing the Dummy Data which is to be injected inside of the
Collections */

// Importing the Arrays full of our users, products and productsStats data.
import {
  dataProductStat,
  dataUser,
  dataProduct,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";
import AffiliateStat from "./models/AffiliateStat.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* GLOBAL ROUTES */

// Every route defined inside of generalRoutes is going to
// appended to /general.

// Now in our frontend if i need to access any of the routes
// defined in generalRoutes ill access by adding /general
// in the fornt.

app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/client", clientRoutes);

/* MONGOOSE SETUP */

// If the port environment variable is Null then set the variable
// to PORT - 9000

const PORT = process.env.PORT || 9000;

// Connecting our App to our MongoDB database by using the mongo
// URL.
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // only then you start to host your app on a server
    app.listen(PORT, () => console.log(`Server Hosted on port ${PORT}`));

    // After your server is connected to your database you can send your
    // dummy data to your database.

    // insetMany method takes in an Array of Documents and inserts them
    // inside of the database.

    // Inserting the dummy data of the users into the users collection.
    // User.insertMany(dataUser);

    // Inserting the dummy data of the products into the products
    // collection
    // Product.insertMany(dataProduct);

    // Inserting the dummy data of the transactions into the
    // transactions collection
    // Transaction.insertMany(dataTransaction);

    // Inserting the dummy data of the products stats into the
    // productStats collection.
    // ProductStat.insertMany(dataProductStat);

    // Inserting the dummy data of the overall stats into the
    // overallStats collection.
    // OverallStat.insertMany(dataOverallStat);

    // Inserting the dummy data of the affiliate stats into the
    // affiliateStats collection.
    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((err) => console.log(err.message));
