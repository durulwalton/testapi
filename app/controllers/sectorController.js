const express = require('express');
const router = express.Router();
const db = require('./../models/index');
router.get('/', (req, res) => {
    var appMessage, appData, appStatus;
    db.sector.findAll({
        attributes: ['id', 'name', 'parentid', "status"],
        where: {
            status: 1
        }
    }).then(function (thisData) {
        appStatus = true;
        appMessage = 'Success';
        appData = thisData;
    }).catch(function (err) {
        console.log(err);
        appStatus = false;
        appMessage = `Can't process your request now! Please Try again later.`;
        appData = [];
    }).then(function () {
        res.send(JSON.stringify({
            'appStatus': appStatus,
            'appMessage': appMessage,
            'appData': appData
        }));
    });
})
router.post('/', function (req, res) {
    var appStatus,
        appMessage,
        appData,
        formData = {
            name: req.body.name, // Mandatory
            parentid: req.body.parentid, // Mandatory
            created_by: req.body.created_by,
            status: req.body.status,
        };
    db.sector.create(formData).then((thisData) => {
        appStatus = true;
        appMessage = "Sector Added Successfully.";
        appData = thisData
    }).catch(function (err) {
        console.log(err);
        appStatus = false;
        appMessage = `Can't process your request now! Please Try again later.`;
        appData = [];
    }).then(function () {
        res.send(JSON.stringify({
            'appStatus': appStatus,
            'appMessage': appMessage,
            'appData': appData
        }));
    });
})
router.put('/:id', async (req, res) => {

})
router.delete('/:id', async (req, res) => {

})
router.get('/:id', async (req, res) => {

})
module.exports = router;