import { Request, Response } from "express";
import { HttpStatusCode as httpStatusCodes } from "../libs/HttpStatusCode";
import { Logger } from "../libs/log";
import { getPostsByProfileID, insertPost } from "../mongo";
import { IPost } from "../interfaces/Post";

export class PostController {
  static getPostByProfileID = async (_: Request, res: Response) => {
    const proID: string = _.params.proID;
    if (!proID) {
      Logger.log(
        "PostController::getPostByProfileID -> Invalid profile ID provided",
        "error"
      );
      return res.status(httpStatusCodes.BAD_REQUEST).end();
    }
    try {
      const result: IPost[] = await getPostsByProfileID(proID);
      Logger.log(
        `PostController::getPostByProfileID -> Fetching posts data of the given profile ID`
      );
      return res.status(httpStatusCodes.OK).send(result);
    } catch (error) {
      Logger.log(
        `PostController::getPostByProfileID -> Failed to fetch posts data of the given profile ID`,
        "error"
      );
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  };

  static insertPost = async (_: Request, res: Response) => {
    const proID: string = _.params.proID;
    const post = _.body.post;
    if (!proID || !post) {
      Logger.log(
        "PostController::insertPost -> Invalid profile ID or data provided",
        "error"
      );
      return res.status(httpStatusCodes.BAD_REQUEST).end();
    }
    try {
      const result = await insertPost(proID, post);
      Logger.log(`PostController::insertPost -> Post added`);
      return res.status(httpStatusCodes.CREATED).send(result);
    } catch (error) {
      Logger.log(
        `PostController::insertPost -> Failed to add the post`,
        "error"
      );
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  };
}
