const mongoose = require('mongoose');
const { uri, clientOptions } = require('./configNoSql');

async function connectNoSql() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'.italic
        .bgBrightGreen
    );
  } catch (err) {
    console.log('🚀 ~ connectNoSql ~ err:', err);
  }
}
module.exports = connectNoSql;
