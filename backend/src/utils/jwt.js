import jwt from "jsonwebtoken";

export function createToken(payload) {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "14d",
    });
    return token;
  } catch (error) {
    console.log(error.message);
  }
}
