const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Order = require('./models/Order'); // ✅ Import the model

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // ✅ To serve HTML directly from public/

// ✅ MongoDB Connection
mongoose.connect('mongodb://localhost:27017/canteen-orders', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Serve HTML
app.get('/canteen', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'canteen.html'));
});
app.get('/first', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'firstpage.html'));
  });
  app.get('/ind', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// ✅ Handle Order POST
app.post('/api/order', async (req, res) => {
  try {
    const { name, phoneNumber, foodItem, quantity } = req.body;

    const newOrder = new Order({ name, phoneNumber, foodItem, quantity });
    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to place order.' });
  }
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
