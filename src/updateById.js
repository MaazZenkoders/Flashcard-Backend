const { writeData, readData } = require("./fs");

function sendErrorResponse(res, statusCode, message) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: message }));
  }
  
  function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }

function updateData(req, res) {
    if (req.method !== 'PUT') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      return;
    }
  
    const id = parseInt(req.url.split('/')[2]);
    let body = '';
  
    req.on('data', chunk => {
      body += chunk.toString();
    });
  
    req.on('end', () => {
      const newData = JSON.parse(body);
      readData((err, data) => {
        if (err) {
          sendErrorResponse(res, 500, 'Internal Server Error');
          return;
        }
  
        const index = data.findIndex(item => item.id === id);
        if (index !== -1) {
          newData.id = id;
          data[index] = newData;
          writeData(data, err => {
            if (err) {
              sendErrorResponse(res, 500, 'Internal Server Error');
              return;
            }
            sendResponse(res, 200, newData);
          });
        } else {
          sendErrorResponse(res, 404, 'Data not found');
        }
      });
    });
  }

module.exports = {updateData};
