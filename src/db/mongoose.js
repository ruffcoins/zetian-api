const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then((success) => console.log('Connection to mongoose successfull'))
    .catch((err) => console.log('ould not connect to mongoose ', err));
