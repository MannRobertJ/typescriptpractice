import "reflect-metadata";
import { createKoaServer, Action } from "routing-controllers";
import PageController from "./pages/controller";
import UserController from "./users/controller";
import setupDb from "./db";
import { verify } from "./logins/jwt";
import LoginController from "./logins/controller";

const app = createKoaServer({
  controllers: [PageController, UserController, LoginController],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization;

    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ");
      return !!(token && verify(token));
    }
    return false;
  }
});
const port = process.env.PORT || 4000;
setupDb()
  .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
  .catch(err => console.error(err));
