import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as _ from "underscore";
export const jwtSecret = process.env.JWT_SECRET || "";

const authenticate = async (token: string) => {
  // @ts-ignore
  return jwt.verify(token, jwtSecret);
};

// export const authHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers["x-access-token"];
//   if (!token) return res.status(401).send("Auth header required!");

//   const payload = await authenticate(token as string).catch((e) => {
//     return res.status(401).send("invalid token");
//   });
//   Object.assign(req, payload);

//   next();
// };

export const loginRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(401).send("Auth header required!");
  next()
};
export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"];
  const payload = await authenticate(token as string).catch((e) => {
    return res.status(401).send("invalid token");
  });
  Object.assign(req, payload);
  console.log("##########", payload)
  next()
};

declare global {
  namespace Express {
    interface Request {
      id?: string;
      email?: string;
    }
  }
}
