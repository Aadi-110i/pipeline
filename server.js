const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello from the CI/CD Pipeline! The Docker container is running successfully.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
