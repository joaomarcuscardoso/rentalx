import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

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
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not existing!", 401);
        }

        // sobreescrever o express
        request.user = {
            id: user_id,
        };
        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
