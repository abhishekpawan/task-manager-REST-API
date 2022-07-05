const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://abhishekpawan:dNZBydLgbiAmLUEj@abhishekcluster.jbajcze.mongodb.net/task-app(nodejscourse)?retryWrites=true&w=majority');

    console.log(`MongoDb connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
 