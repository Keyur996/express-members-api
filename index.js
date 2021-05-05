const express = require('express'),
    path = require('path');
// logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Make Router in Use 
app.use('/api/members', require('./routes/api/members'));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server is started on ${PORT}`));