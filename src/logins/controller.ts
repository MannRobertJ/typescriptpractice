import { IsString } from "class-validator";
import {
  JsonController,
  Post,
  Body,
  BadRequestError
} from "routing-controllers";
import User from "../users/entity";
import { sign } from "./jwt";

class AuthenticatePayload {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

@JsonController()
export default class LoginController {
  @Post("/logins")
  async authenticate(@Body() { email, password }: AuthenticatePayload) {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.id || !(await user.checkPassword(password)))
      throw new BadRequestError("Incorrect email or password");

    const jwt = sign({ id: user.id });
    return { jwt };
  }
}
