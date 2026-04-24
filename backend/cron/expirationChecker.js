const cron = require('node-cron');
const subsModel = require('../models/subsModel');

cron.schedule('0 9 * * *', async () => {
  console.log("Lejáratok ellenőrzése...");

  try {
    const expiring = await subsModel.getExpiringSubscriptions(7);

    if (expiring.length > 0) {
      console.log("Lejáró szolgáltatások:", expiring);
    }
  } catch (err) {
    console.error(err);
  }
});