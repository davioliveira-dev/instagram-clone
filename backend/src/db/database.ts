import mongoose from 'mongoose';

function createDatabaseConnection() {
  function start() {
    const dbUrl = process.env.DB_URL || '';

    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
        .catch((error: { message: any; }) => console.log(error.message))
        .then(() => console.log('Connected to database'));
  }

  return {
    start,
  };
}

export default createDatabaseConnection;
