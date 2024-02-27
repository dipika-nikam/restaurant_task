import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hashSync(password, saltRounds);  
  return hashedPassword;
};

export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  try {
    const match = await bcrypt.compareSync(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};