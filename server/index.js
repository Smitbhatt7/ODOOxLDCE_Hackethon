const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@test.com' && password === 'Admin123!') {
    return res.json({
      email,
      name: 'Admin',
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
    });
  }

  if (email === 'user@test.com' && password === 'User123!') {
    return res.json({
      email,
      name: 'User',
      role: 'user',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
    });
  }

  return res.status(401).json({ error: 'Invalid email or password' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
