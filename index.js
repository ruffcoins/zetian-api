const express = require('express');
require('./src/db/mongoose');
const userRouter = require('./src/routes/user');
const customerRouter = require('./src/routes/customer');
const serviceRouter = require('./src/routes/service');
const saleRouter = require('./src/routes/sale');
const expenseRouter = require('./src/routes/expense');
const employeeRouter = require('./src/routes/employee');
const dashboardRouter = require('./src/routes/dashboard');

const app = express()
const port = process.env.PORT || 3000

var http = require("http");
setInterval(function () {
    http.get("http://zeitan.herokuapp.com");
}, 300000); // every 5 minutes (300000)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

app.use(userRouter);
app.use(customerRouter);
app.use(serviceRouter);
app.use(saleRouter);
app.use(expenseRouter);
app.use(employeeRouter);
app.use(dashboardRouter);


module.exports = {
    app
};

