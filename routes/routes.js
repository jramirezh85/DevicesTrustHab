// import other routes
const deviceRoutes = require('./devices');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    // other routes
    deviceRoutes(app, fs);

};

module.exports = appRouter;