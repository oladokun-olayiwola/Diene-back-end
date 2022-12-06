import jwt from 'jsonwebtoken'
const createJWT = (payload: string) => {
    const token = jwt.sign({payload}, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
}

const validateToken = (token: string) => {
    jwt.verify(token, process.env.JWT_SECRET as string)
}

export {createJWT, validateToken}