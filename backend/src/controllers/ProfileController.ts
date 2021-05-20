import { Request, Response } from "express";
import { HttpStatusCode as httpStatusCodes } from "../libs/HttpStatusCode";
import { Logger } from "../libs/log";
import { IProfile } from "../interfaces/Profile";
import { getAllProfiles, getProfileByID, insertProfile } from "../mongo";

export class ProfileController {
  static getAllProfiles = async (_: Request, res: Response) => {
    try {
      const result = await getAllProfiles();
      Logger.log(`ProfileController::getAllProfiles -> Fetching all profiles`);
      return res.status(httpStatusCodes.OK).send(result);
    } catch (error) {
      Logger.log(
        `ProfileController::getAllProfiles -> Failed to fetch all profiles`,
        "error"
      );
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  };

  static getProfileByID = async (_: Request, res: Response) => {
    const proID: string = _.params.proID;
    if (!proID) {
      Logger.log(
        "ProfileController::getProfileByID -> Invalid profile ID provided",
        "error"
      );
      return res.status(httpStatusCodes.BAD_REQUEST).end();
    }
    try {
      const result: IProfile[] = await getProfileByID(proID);
      Logger.log(
        `ProfileController::getProfileByID -> Fetching profile data of the given ID`
      );
      return res.status(httpStatusCodes.OK).send(result);
    } catch (error) {
      Logger.log(
        `ProfileController::getProfileByID -> Failed to fetch profile data of the given ID`,
        "error"
      );
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  };

  static insertProfile = async (_: Request, res: Response) => {
    const proID: string = _.params.proID;
    const profileData = _.body.profile;
    if (!proID || !profileData) {
      Logger.log(
        "ProfileController::insertProfile -> Invalid profile ID or data provided",
        "error"
      );
      return res.status(httpStatusCodes.BAD_REQUEST).end();
    }
    try {
      const result = await insertProfile(proID, profileData);
      Logger.log(`ProfileController::insertProfile -> Operation complete`);
      return res.status(httpStatusCodes.CREATED).end();
    } catch (error) {
      Logger.log(
        `ProfileController::insertProfile -> Failed to complete the operation`,
        "error"
      );
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  };
}
