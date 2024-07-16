import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = "token.01010101";

const generateToken = (id: number) => {
  const jwt = sign({ id }, JWT_SECRET, {
    expiresIn: "48h",
  });
  return jwt;
};

const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
};

const tokenInfo = (jwt: string) => {
    const decoded = verify(jwt, JWT_SECRET) as { id: number; iat: number; exp: number };
    return decoded.id ;
};

export { generateToken, verifyToken, tokenInfo };
