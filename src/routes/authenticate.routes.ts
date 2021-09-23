import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRotes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRotes.post("/sessions", authenticateUserController.handle);

export { authenticateRotes };
