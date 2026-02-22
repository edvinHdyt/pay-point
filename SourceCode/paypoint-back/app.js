const app = require('./src/routes/api');
const port = 3000;
require('./src/database/conn');

app.listen(port, () => {
    console.log(`Paypoint app listening on port http://127.0.0.1:${port}`);
})