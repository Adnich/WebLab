const Trip = require('../models/trip');

// GET /trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trips', error: err.message });
  }
};

// ✅ GET /trips/:id (TREBA za edit formu)
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found.' });
    }
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trip', error: err.message });
  }
};

// POST /trips
exports.addTrip = async (req, res) => {
  try {
    const { id, destination, duration, agencyId, imageUrl } = req.body;

    // ✅ agencyId je obavezan
    if (!id || !destination || !duration || !agencyId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    await Trip.create({ id, destination, duration, agencyId, imageUrl });
    res.status(201).json({ message: 'Trip added successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding trip', error: err.message });
  }
};

// PUT /trips/:id
exports.updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { destination, duration, agencyId, imageUrl } = req.body;

    const trip = await Trip.findByPk(id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found.' });
    }

    trip.destination = destination;
    trip.duration = duration;
    trip.agencyId = agencyId;
    trip.imageUrl = imageUrl;
    await trip.save();

    res.json({ message: 'Trip updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating trip', error: err.message });
  }
};

// DELETE /trips/:id
exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findByPk(id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found.' });
    }
    await trip.destroy();
    res.json({ message: 'Trip deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting trip', error: err.message });
  }
};
