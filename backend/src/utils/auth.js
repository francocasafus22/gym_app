import bcrypt from "bcrypt";

export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error.message);
  }
}

export async function checkPassword(password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
}
