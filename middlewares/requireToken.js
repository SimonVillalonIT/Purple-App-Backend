import jwt from "jsonwebtoken";
export const requireToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) throw new Error("No hay token en el header 😖😖");

    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;

    next();
  } catch (error) {
    console.error(error);

    const TokenVerificationErrors ={
        "invalid signature": "La firma del JWT no es válida😕",
        "jwt expired": "JWT expirado😅",
        "invalid token": "Token no válido😳",
        "No bearer": "Utiliza formato Bearer😡",
        "jwt malformed": "JWT formato no válido😒",
    }
    return res.status(401)
    .send({ error: TokenVerificationErrors[error.message] });
  }
};
