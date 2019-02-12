import "reflect-metadata";
import { createKoaServer } from "routing-controllers";
import PageController from "./pages/controller";

const app = createKoaServer({
  controllers: [PageController]
});

app.listen(4000, () => console.log("4000"));
