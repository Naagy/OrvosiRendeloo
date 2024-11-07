const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { days: getDays() });
});

app.get('/day/:day', (req, res) => {
  const day = req.params.day;
  const schedule = getScheduleForDay(day);
  res.render('schedule', { day, schedule });
});

app.get('/book/:day/:time', (req, res) => {
    const { day, time } = req.params;
    res.render('booking', { day, time });
});

app.post('/book/:day/:time', (req, res) => {
    const { day, time } = req.params;
    const { name, phone } = req.body;
  
    if (!name || !phone) {
      return res.send("Minden mezőt ki kell tölteni!");
    }
  
    res.render('confirmation', { day, time, name, phone });
});

function getDays() {
  return ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"];
}

function getScheduleForDay(day) {
  const schedule = [];
  const times = ['08:00', '09:00', '10:00', '11:00'];
  const doctors = [
    { name: 'Dr. Kovács János', specialty: 'Ortopédia' },
    { name: 'Dr. Tóth Zoltán', specialty: 'Szemészet' },
    { name: 'Dr. Nagy Erika', specialty: 'Sebészet' },
    { name: 'Dr. Szabó László', specialty: 'Pszichiátria' }
  ];

  times.forEach((time, index) => {
    schedule.push({
      time: time,
      doctor: doctors[index].name,
      specialty: doctors[index].specialty
    });
  });

  return schedule;
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
