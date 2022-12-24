const express = require('express');
const router = express.Router();
const db = require('./../models/index');
const auth = require('../middleware/auth');
const { Sequelize } = db;
const { Op } = Sequelize;
router.get('/', auth, (req, res) => {
    var appMessage, appData, appStatus;
    db.userSector.findAll({
        attributes: ['id', 'name', 'sectorid', "isaggreterms", "status"],
        where: {
            [Op.or]: [
                { userid: req.user.id },
                { status: 1 }
            ]
        },
        // include: [{
        //     attributes: ['id', 'name'],
        //     model: db.sector
        // }]
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
router.post('/', auth, function (req, res) {
    var appStatus,
        appMessage,
        appData,
        formData = {
            name: req.body.name, // Mandatory
            sectorid: req.body.sectorid, // Mandatory
            userid: req.user.id, // Mandatory
            isaggreterms: req.body.isaggreterms,
            created_by: req.body.created_by,
            status: req.body.status,
        };
    db.userSector.create(formData).then((thisData) => {
        appStatus = true;
        appMessage = "Sector Selected Successfully.";
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

router.put('/:id',auth, async (req, res) => {
    var appStatus,
        appMessage,
        appData,
        formData = {
            name: req.body.name, // Mandatory
            sectorid: req.body.sectorid, // Mandatory
            userid: req.user.id, // Mandatory
            isaggreterms: req.body.isaggreterms,
            updated_by: req.body.updated_by,
            status: req.body.status,
        };
    db.userSector.update(formData, {
        where: {
            id: req.params.id
        },
    }).then((thisData) => {
        appStatus = true;
        appMessage = "Sector Updated Successfully.";
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
router.delete('/:id', async (req, res) => {

})
router.get('/:id', async (req, res) => {

})
module.exports = router;