// NODE MODULES
const express = require('express');
const cors = require('cors');

// FILE IMPORTS, CONSTANTS
const actionRouter = require('./routes/actionRoutes');
const projectRouter = require('./routes/projectRoutes');
const PORT = 5000;
const server = express();

// MIDDLEWARE
server.use(express.json());
server.use(cors());

// ROUTES
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

// START THE SERVER
server.listen(PORT, () => console.log('Listening on port 5000.'));