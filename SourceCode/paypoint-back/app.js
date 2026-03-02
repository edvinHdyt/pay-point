import app from './src/routes/api.js';
const port = 3000;
import './src/database/conn.js'

app.listen(port, () => {
    console.log(`Paypoint app listening on port http://127.0.0.1:${port}`);
})