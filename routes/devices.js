const deviceRoutes = (app, fs) => {

    // variables
    const dataPath = './data/devices.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // GET ALL DEVICES
    app.get('/devices', (req, res) => {
        try {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                let completeData = JSON.parse(data);
                const filters = req.query;
                const filteredData = completeData.filter(device => {
                    let isValid = true;
                    for (key in filters) {
                      filters[key] = (filters[key] === 'true') ? true : filters[key];
                      isValid = (isValid && (!filters[key] || device[key] == filters[key]));
                      
                    }
                    return isValid;
                });
                res.send(filteredData);
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('There is an error');
        }
    });

    // FILTER BY SAME LOCATION
    app.get('/devices/location/:id', (req, res) => {
        try {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
    
                let completeData = JSON.parse(data);
                const location = req.params["id"];
                const filteredData = completeData.filter(device => device.location == location);
                res.send(filteredData);
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('There is an error');
        }
    });

    // CREATE
    app.post('/devices', (req, res) => {
        try {
            readFile(data => {
                let completeData = JSON.parse(data);
                completeData.push(req.body);
                let newData = JSON.stringify(completeData);
    
                writeFile(JSON.stringify(newData, null, 2), () => {
                    res.status(200).send('New device added');
                });
            }, true);
        } catch (error) {
            console.log(error);
            res.status(500).send('There is an error');
        }
    });


    // UPDATE
    app.put('/devices/:id', (req, res) => {
        try {
            readFile(data => {
                const deviceId = req.params["id"];
                let completeData = JSON.parse(data);
                const index = completeData.map(device => device.id).indexOf(deviceId);
                completeData[index] = req.body;
                let newData = JSON.stringify(completeData);
    
                writeFile(JSON.stringify(newData, null, 2), () => {
                    res.status(200).send(`Device id:${deviceId} updated`);
                });
            }, true);
        } catch (error) {
            console.log(error);
            res.status(500).send('There is an error');
        }
    });


    // DELETE
    app.delete('/devices/:id', (req, res) => {
        try {
            readFile(data => {

                const deviceId = req.params["id"];
                let completeData = JSON.parse(data);
                const updatedData = completeData.filter(device => device.id != deviceId);
                let newData = JSON.stringify(updatedData);
    
                writeFile(JSON.stringify(newData, null, 2), () => {
                    res.status(200).send(`Device id:${deviceId} removed`);
                });
            }, true);
        } catch (error) {
            console.log(error);
            res.status(500).send('There is an error');
        }
    });

};

module.exports = deviceRoutes;