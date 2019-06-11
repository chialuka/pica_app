import express, { Router } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import routes from './routes';

dotenv.config();

const { PORT } = process.env;

const app = express();

const router = Router();

router.options('/', cors());

routes(router);

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use(passport.initialize());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`We make magic on port ${PORT}`);
});
