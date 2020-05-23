import express, { Router} from 'express';
import { signup, signin, profile } from '../controllers/auth.controllers';
import { JwtMiddleware } from '../utils/jwtRepository';
const jwtVerify = new JwtMiddleware().jwtVerify;

const router: Router = express();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', jwtVerify, profile);

export default router;
