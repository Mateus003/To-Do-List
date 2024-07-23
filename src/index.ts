import express, { Application } from 'express';
import mustacheExpress from 'mustache-express';
import path from 'path';
import bodyParser from 'body-parser';
const app: Application = express();

import db from '../src/db/db'; 

app.use(express.static(path.join(__dirname, '../public')));

app.set('views', path.join(__dirname, 'views'));

import tasksRoutes from './routes/taskRoutes';

import memberRoutes from './routes/memberRoutes';

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded())
app.use('/member', memberRoutes);
app.use('/tasks', tasksRoutes);


db.sync()
  .then(() => {
    app.listen(process.env.PORT)
  })
  .catch((err: Error) => console.log(err));
