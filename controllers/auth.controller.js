import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();

    //Generar JWT

    return res.json({ ok: true });
  } catch (error) {
    console.log(error.code);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe este usuario🙄😶" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user)
      return res.status(403).json({ error: "El usuario no existe 😐😐" });

    const responsePassword = await user.comparePassword(password);
    if (!responsePassword)
      return res.status(403).json({ error: "Contraseña Incorrecta 🤒🤒" });


    //Generar JWT
    const token = jwt.sign({uid: user.id}, process.env.JWT_SECRET)


    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};
