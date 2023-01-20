require('dotenv').config();
const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URL;

const connectDB = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage().then(() => {
        mongoose
          .connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true })
          .then((res, err) => {
            if (err) return reject(err);
            resolve();
          });
      });
    } else {
      mongoose.set('strictQuery', false);
      mongoose
        .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((res, err) => {
          console.log('MongoDB Connected');
          if (err) return reject(err);
          resolve();
        });
    }
  });
};

const close = () => {
  return mongoose.disconnect();
};
module.exports = { connectDB, close };
