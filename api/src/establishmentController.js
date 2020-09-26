Establishment = require('./establishmentModel');

// GET /establishment
exports.get = function (req, res) {
    Establishment.find(function (err, establishments) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({
                message: 'Success',
                data: establishments
            });
        }
    });
};

// POST /establishment
exports.post = function (req, res) {
    Establishment.findOne({name : req.body.name}, function (err, establishment) {
        if (err) {res.send(err);}
        else {
           if (establishment) {
               console.log(establishment)
               res.json({
                   message: 'Establishment already exists'
               });
           }
           else {
               let establishment = new Establishment();
               establishment.name = req.body.name;
               establishment.sector = req.body.sector;
               establishment.country = req.body.country;
               establishment.type = req.body.type;
               establishment.save(function (err) {
                   if (err) {
                       res.json(err);
                   }
                   else {
                       res.json({
                           message: 'Success',
                           data: establishment
                       });
                   }
               });
           }
        }
    });
};

// DELETE /establishment/:id
exports.delete = function (req, res) {
    Establishment.remove({
        _id: req.params.id
    }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({
                status: "success",
                message: 'Success'
            });
        }
    });
};

// PUT /post/:id
exports.update = function (req, res) {
    Establishment.findById(req.params.id, function (err, establishment) {
        if (err) {
            res.send(err);
        }
        else {
            try {
                establishment.name = req.body.name ? req.body.name : establishment.name;
                establishment.sector = req.body.sector ? req.body.sector : establishment.sector;
                establishment.country = req.body.country ? req.body.country : establishment.country;
                establishment.type = req.body.type ? req.body.type : establishment.type;

                establishment.save(function (err) {
                    if (err) {
                        res.json(err);
                    }
                    res.json({
                        message: 'Success',
                        data: establishment
                    });
                });

            }
            catch (e) {
                res.json(e);

            }
        }
    });
};
