const express = require('express');
const app = express();

const port = 3000;


app.use(express.static('public'));
app.listen(port, () => {
    process.stdout.write(`Server is listen on port ${port}`);
});
