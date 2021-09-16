const mongoose = require('mongoose');

mongoose
  .connect(`${process.env.DB_CONNECTION}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connected');
  })
  .catch((e) => {
    console.error(`Error in Connecting Database`, e);
  });
