'use strict'

const http = require('http')
const fs = require('fs')

module.exports = {
  downloadFile: (url, file) => {
    return new Promise((resolve) => {
      const stream = fs.createWriteStream(file);

      http.get(url, (response) => {
        response.pipe(stream);

        stream.on('finish', () => {
          stream.close(() => resolve())
        })
      });
    })
  }
};
