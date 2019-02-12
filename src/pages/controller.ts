import {
  JsonController,
  Get,
  Put,
  Post,
  Param,
  Body,
  HttpCode
} from "routing-controllers";
import pagesById, { Page } from "./data";

type PageList = { pages: Page[] };

@JsonController()
export default class PageController {
  @Get("/pages/:id")
  getPage(@Param("id") id: number): Page {
    return pagesById[id];
  }

  @Get("/pages")
  allPages(): PageList {
    const pageArray: Page[] = Object.keys(pagesById).map(
      page => pagesById[page]
    );
    return { pages: pageArray };
  }

  @Put("/pages/:id")
  updatePage(@Param("id") id: number, @Body() body: Partial<Page>): Page {
    console.log(`Incoming PUT body param:`, body);
    return pagesById[id];
  }

  @Post("/pages")
  @HttpCode(201)
  createPage(@Body() body: Page): Page {
    console.log(`Incoming POST body param:`, body);
    return body;
  }
}
