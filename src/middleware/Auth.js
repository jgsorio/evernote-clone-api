import { config } from 'dotenv';
import { verify } from 'jsonwebtoken';
config();

export const Auth = async (req,res,next) => {
    if (!req.headers['authorization']) {
        return res.status(401).send('Not authorized');
    }

     verify(req.headers['authorization'], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send(err);
        }

        if (!decoded) {
            return res.status(401).send('Not authorized');
        }

        req.userId = decoded.sub;
        next();
    });
}
