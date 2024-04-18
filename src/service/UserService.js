import User from '../model/User';
import bcrypt from "bcrypt";
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

class UserService {
    async register(req, res) {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        return res.json(name);
    }

    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({'error': 'Email or password is required'});
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({'error': 'Email or password is invalid' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({'error': 'Email or password is invalid'});
            }

            if (!result) {
                return res.status(400).json({'error': 'Email or password is invalid'});
            }

            const token = sign({
                email: user.email
            }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES,
                subject: user.id
            });

            return res.json({ token });
        })
    }
}

export default new UserService();