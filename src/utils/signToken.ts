import jwt from "jsonwebtoken";

// Assurez-vous d'importer ce type si vous l'utilisez depuis un autre fichier
interface TokenPayload {
  id: string;
}

export function signToken(id: string): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in your environment variables");
  }

  const payload: TokenPayload = { id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
}
