const fs = require('fs');
const express = require('express');
const multer = require('multer');
const csv = require('csvtojson');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());
app.post('/upload', upload.single('fileInput'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileType = req.body.fileType;

  if (fileType === 'csv') {
    // Process CSV file
    csv()
      .fromFile(file.path)
      .then((jsonObj) => {
        const sortedData = jsonObj.sort((a, b) => b.Popularity - a.Popularity);
        console.log('Processed CSV data:', sortedData);
        res.json(sortedData);
      });
  } else if (fileType === 'json') {
    // Process JSON file
    const jsonData = JSON.parse(fs.readFileSync(file.path, 'utf8'));
    const products = jsonData.products;
    const productArray = Object.keys(products).map((key) => products[key]);
    const sortedData = productArray.sort((a, b) => parseInt(b.popularity) - parseInt(a.popularity));
    console.log('Processed JSON data:', sortedData);
    res.json(sortedData);
  } else {
    res.status(400).send('Unsupported file type.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
