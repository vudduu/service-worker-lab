const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3030;

app.use(express.static('./public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/user-data', (req, res) => {
  res.json({ user: 'carl 2', name: 'Carl 2' });
});

app.get('/api/user-list', (req, res) => {
  res.json({ userList: [{ name: 'Carl' }, { name: 'Jose' }, { name: 'Maria' }, { name: 'Luisa' }] });
});

app.listen(port, () => {
  console.log('todo list RESTful API server started on: ' + port);
});
