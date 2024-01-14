import fetch from "node-fetch";
import fs from "fs";
const url = 'http://localhost:1323';

// Make a fetch request with the "stream" option
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Assuming the response is a stream, you can pipe it to a file or process it as needed
    const outputStream = fs.createWriteStream('output.txt');
    response.body.pipe(outputStream);

    // If you want to process the data in chunks, you can listen for 'data' events
    response.body.on('data', chunk => {
      // Process each chunk of data
      console.log(chunk.toString());
    });

    // If you want to perform actions when the stream ends
    response.body.on('end', () => {
      console.log('Stream ended');
    });

    // If there are errors in the stream
    response.body.on('error', err => {
      console.error(`Error in stream: ${err.message}`);
    });
  })
  .catch(error => {
    console.error('Fetch error:', error.message);
  });
