import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }
    // [0] Bearer, [1] - token
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "51c5ccf771e350d742f0303ec2020af7"
        ) as IPayload;
        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not existing!", 401);
        }

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
