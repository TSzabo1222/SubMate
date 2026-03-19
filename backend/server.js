const express = require('express');
const cors = require('cors');

const subRoutes = require('./routes/subRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', subRoutes);

app.listen(3000, () => {
  console.log('Backend fut: http://localhost:3000');
});
