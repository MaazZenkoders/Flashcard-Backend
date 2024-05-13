const { readData, writeData } = require('./fs')

function deleteData(req, res) {
    const id = parseInt(req.url.split('/')[2]);
    readData((err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
        return;
      }
      const newData = data.filter(item => item.id !== id);
      writeData(newData, err => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Data deleted successfully' }));
      });
    });
  }

module.exports = {deleteData}