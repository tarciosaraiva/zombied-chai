'use strict';

import express from 'express';
import { resolve } from 'path';

const assets = resolve(__dirname, 'assets');
const server = express();

server.use('/', express.static(assets));

export default server;
