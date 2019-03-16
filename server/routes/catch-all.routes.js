const router = require('express').Router();
const path = require('path');

router.all('*', function(req, res) {
  console.log('hitting catch-all');
  res.sendFile(path.join(__dirname, '../../public/dist/public/index.html'));
});

module.exports = router;