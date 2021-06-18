const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then((success) => console.log('Connection to mongo successfull'))
    .catch((err) => console.log('Could not connect to mongo ', err));
