const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./database');

const Traveler = require('./models/traveler');
const Trip = require('./models/trip');
const Agency = require('./models/agency');

Agency.hasMany(Trip, { foreignKey: "agencyId" });
Trip.belongsTo(Agency, { foreignKey: "agencyId" });

const travelerRoutes = require('./routes/travelerRoutes');
const tripRoutes = require('./routes/tripRoutes');
const agencyRoutes = require('./routes/agencyRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/travelers', travelerRoutes);
app.use('/trips', tripRoutes);
app.use('/agencies', agencyRoutes);


sequelize.sync({ alter: true })
    .then(() => {
        console.log(' Modeli sinhronizirani sa bazom podataka.');
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(` Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Greška pri sinhronizaciji modela:', err);
    });
