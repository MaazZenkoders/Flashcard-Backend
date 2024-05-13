const http = require('http');
const {getData} = require('./src/getData')
const {postData} = require('./src/postData')
const {updateData} = require('./src/updateById')
const {deleteData} = require('./src/deleteById')

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/data') {
    getData(req, res);
  }
  else if (req.method === 'POST' && req.url === '/data') {
    postData(req, res);
  }
  else if (req.method === 'PUT' && req.url.startsWith('/data/')) {
    updateData(req, res);
  }
  else if (req.method === 'DELETE' && req.url.startsWith('/data/')) {
    deleteData(req, res);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
