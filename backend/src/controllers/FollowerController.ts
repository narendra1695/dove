import { Request, Response } from "express";
import { HttpStatusCode as httpStatusCodes } from "../libs/HttpStatusCode";
import { Logger } from "../libs/log";
import {
  addFollowers,
  followersData,
  getFollowersByProID,
  unFollow,
} from "../mongo";
import { IFollower } from "../interfaces/Follower";

export class FollowerController {
  static getFollowersByProID = async (_: Request, res: Response) => {
    const proID: string = _.params.proID;
    if (!proID) {
      Logger.log(
        "FollowerController::getFollowersByProID -> Invalid profile ID provided",
        "error"
      );
      return res.status(httpStatusCodes.BAD_REQUEST).end();
    }
    try {
      const result: IFollower[] = await getFollowersByProID(proID);
      Logger.log(
        `FollowerController::getFollowersByProID -> Fetching followers data of the given profile ID`
      );
      return res.status(httpStatusCodes.OK).send(result);
    } catch (error) {
      Logger.log(
        `FollowerController::getFollowersByProID -> Failed to fetch followers data of the given profile ID`,
        "error"
      );
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  };

  static getFollowersData = async (_: Request, res: Response) => {
    const proID: string = _.params.proID;
    if (!proID) {
      Logger.log(
        "FollowerController::getProfileData -> Invalid profile ID provided",
        "error"
      );
      return res.status(httpStatusCodes.BAD_REQUEST).end();
    }
    try {
      const result = await followersData(proID);
      console.log(result);
      Logger.log(
        `FollowerController::getProfileData -> Fetching profile data of the given ID`
      );
      return res.status(httpStatusCodes.OK).send(result);
    } catch (error) {
      Logger.log(
        `FollowerController::getProfileData -> Failed to fetch profile data of the given ID`,
        "error"
      );
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  };

  static addFollower = async (_: Request, res: Response) => {
    const proID: string = _.params.proID;
    const followerID = _.body.followerID;
    if (!proID || !followerID) {
      Logger.log(
        "FollowerController::addFollower -> Invalid profile ID or follower ID provided",
        "error"
      );
      return res.status(httpStatusCodes.BAD_REQUEST).end();
    }
    try {
      const result = await addFollowers(proID, followerID);
      Logger.log(`FollowerController::addFollower -> Follower added`);
      return res.status(httpStatusCodes.CREATED).send(result);
    } catch (error) {
      Logger.log(
        `FollowerController::addFollower -> Failed to add follower`,
        "error"
      );
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  };

  static unFollow = async (_: Request, res: Response) => {
    const proID: string = _.params.proID;
    const followerID = _.params.followerID;
    if (!proID || !followerID) {
      Logger.log(
        "FollowerController::unFollow -> Invalid profile ID or follower ID provided",
        "error"
      );
      return res.status(httpStatusCodes.BAD_REQUEST).end();
    }
    try {
      await unFollow(proID, followerID);
      Logger.log(`FollowerController::unFollow -> Follower removed`);
      return res.status(httpStatusCodes.OK).end();
    } catch (error) {
      Logger.log(
        `FollowerController::unFollow -> Failed to remove follower`,
        "error"
      );
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  };
}
