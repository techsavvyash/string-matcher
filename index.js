const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Fuse = require('fuse.js');


const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 3000;

const districtDivision = {
  "Ajmer": "Jaipur",
  "Alwar": "Bharatpur",
  "Anoopgarh": "Sri Ganganagar",
  "Balotara": "Jodhpur",
  "Banswara": "Udaipur",
  "Baran": "Kota",
  "Barmer": "Jodhpur",
  "Beawar": "Jaipur",
  "Bharatpur": "Bharatpur",
  "Bhilwara": "Bhilwara",
  "Bikaner": "Bikaner",
  "Bundi": "Kota",
  "Chittorgarh": "Bhilwara",
  "Churu": "Bikaner",
  "Dausa": "Jaipur",
  "Deeg": "Bharatpur",
  "Dholpur": "Bharatpur",
  "Didwana-Kuchaman": "Sikar",
  "Dudu": "Jaipur",
  "Dungarpur": "Udaipur",
  "Gangapur city": "Bharatpur",
  "Hanumangarh": "Sri Ganganagar",
  "Jaipur": "Jaipur",
  "Jaipur Rural": "Jaipur",
  "Jaisalmer": "Bikaner",
  "Jalore": "Jalore",
  "Jhalawar": "Kota",
  "Jhunjhunu": "Sikar",
  "Jodhpur": "Jodhpur",
  "Jodhpur Rural": "Jodhpur",
  "Karauli": "Bharatpur",
  "Kekri": "Jaipur",
  "Khairthal-Tijara": "Jaipur",
  "Kota": "Kota",
  "Kotputli-Behror": "Jaipur",
  "Nagaur": "Sikar",
  "Neem Ka Thana": "Sikar",
  "Pali": "Jalore",
  "Phalodi": "Jodhpur",
  "Pratapgarh": "Udaipur",
  "Anupgarh": "Sri Ganganagar",
  "Didwana Kuchaman": "Sikar",
  "Gangapur City": "Bharatpur",
  "Rajsamand": "Bhilwara",
  "Salumber": "Udaipur",
  "Sanchore": "Jalore",
  "Sawai Madhopur": "Bharatpur",
  "Shahpura": "Bhilwara",
  "Sikar": "Sikar",
  "Sirohi": "Jalore",
  "Sri Ganganagar": "Sri Ganganagar",
  "Tonk": "Jaipur",
  "Udaipur": "Udaipur"
}



app.post('/match-string', (req, res) => {
    const { inputString } = req.body;

    if (typeof inputString !== 'string') {
        return res.status(400).send({ error: 'Invalid input' });
    }

    const fuse = new Fuse(Object.keys(districtDivision), {
        includeScore: true,
        threshold: 0.3
    });

    const result = fuse.search(inputString);

    if (result.length > 0) {
        return res.send({ division: districtDivision[result[0].item] });
    } else {
        return res.status(404).send({ error: 'No match found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});