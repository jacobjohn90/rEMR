var express = require('express');
var router = express.Router();
const { DoctorModel } = require('../db/schema')

/* GET users listing. */
router.get('/', function (req, res) {
  DoctorModel.find().then((doctors) => {
    res.json({ doctors })
  })
    .catch((err) =>
      console.log('Error getting to /doctors on Express. Error is: ' + err))
});

router.get('/:id', (req, res) => {
  DoctorModel.findById(req.params.id).then((doctor) => {
    res.send({ doctor })
  })
})

router.post('/', (req, res) => {
  const newDoctor = new DoctorModel(req.body)
  newDoctor.save().then((doctor)=> {
    res.send(doctor)
  })
})

module.exports = router;
