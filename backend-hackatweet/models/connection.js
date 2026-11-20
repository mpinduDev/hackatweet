const mongoose = require('mongoose');

const connectionString = process.env.CONNECTION_STRING;

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Base de données connectée'))
  .catch((error) =>
    console.error('Erreur de connexion à la base :', error.message),
  );
