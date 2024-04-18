import { Router } from 'express';
import UserService from './service/UserService';
import { Auth } from './middleware/Auth';
import NoteService from './service/NoteService';

const router = new Router();

router.get('/status', function (req, res) {
    res.json({'ok': true});
});

router.post('/register', UserService.register);
router.post('/login', UserService.login);

router.get('/notes', Auth, NoteService.all);
router.get('/notes/:id', Auth, NoteService.show);
router.post('/notes', Auth, NoteService.create);
router.put('/notes/:id', Auth, NoteService.update);
router.delete('/notes/:id', Auth, NoteService.delete);

export default router;