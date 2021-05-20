import mongo from "mongodb";

import { Logger } from "./libs/log";

import { IConfig } from "./interfaces/Config";
const config: IConfig = require("../config/config.json");

import { IProfile } from "./interfaces/Profile";
import { IPost } from "./interfaces/Post";
import { IFollower } from "./interfaces/Follower";

let client: mongo.MongoClient;
let db: mongo.Db;

let profileCollection: mongo.Collection<IProfile>;
let postCollection: mongo.Collection<IPost>;
let followerCollection: mongo.Collection<IFollower>;

try {
  (async () => {
    const inst = await mongo.connect(config.mongoUrl, {
      connectTimeoutMS: 5000,
      keepAlive: true,
      numberOfRetries: 3,
      poolSize: 50,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    client = inst;
    db = client.db("dove");

    profileCollection = db.collection("profile");
    postCollection = db.collection("post");
    followerCollection = db.collection("follower");
  })();
} catch (error) {
  Logger.log(`Mongo connection error:\n${error}`, "error");
}

// Profile starts here

export const getAllProfiles = async () => {
  try {
    return await profileCollection.find().toArray();
  } catch (error) {
    Logger.log(`mongo:getAllProfiles -> ${error}`, "error");
    return Promise.reject(error.errmsg);
  }
};

export const getProfileByID = async (proID: string) => {
  try {
    let result = await profileCollection.find({ _id: proID }).toArray();
    return result;
  } catch (error) {
    Logger.log(`mongo:getProfileByID -> ${error}`, "error");
    return Promise.reject(error.errmsg);
  }
};

export const insertProfile = async (proID: string, profileData: IProfile) => {
  try {
    return await profileCollection.updateOne(
      { _id: proID },
      {
        $set: {
          name: profileData.name,
          email: profileData.email,
          photoUrl: profileData.photoUrl,
        },
      },
      { upsert: true }
    );
  } catch (error) {
    Logger.log(`mongo:insertProfile -> ${error}`, "error");
    return Promise.reject(error.errmsg);
  }
};

// Profile ends here

// Post starts here
export const getPostsByProfileID = async (proID: string) => {
  try {
    let result = await postCollection.find({ profileID: proID }).toArray();
    return result;
  } catch (error) {
    Logger.log(`mongo:getPostsByProfileID -> ${error}`, "error");
    return Promise.reject(error.errmsg);
  }
};

export const insertPost = async (proID: string, post: any) => {
  try {
    const postData: IPost = {
      profileID: proID,
      post: post,
      postDate: new Date(),
    };
    let result = await postCollection.insertOne(postData);
    return result.ops;
  } catch (error) {
    Logger.log(`mongo:insertPost -> ${error}`, "error");
    return Promise.reject(error.errmsg);
  }
};
// Post ends here

// follower starts here
export const getFollowersByProID = async (proID: string) => {
  try {
    let result = await followerCollection
      .aggregate([
        { $match: { profileID: proID } },
        { $unset: ["profileID"] },
        {
          $lookup: {
            from: "profile",
            localField: "followerID",
            foreignField: "_id",
            as: "followerData",
          },
        },
        {
          $lookup: {
            from: "post",
            localField: "followerID",
            foreignField: "profileID",
            as: "postsData",
          },
        },
      ])
      .toArray();
    return result;
  } catch (error) {
    Logger.log(`mongo:getFollowersByProID -> ${error}`, "error");
    return Promise.reject(error.errmsg);
  }
};

export const addFollowers = async (profileID: string, followerID: string) => {
  try {
    const follower: IFollower = {
      profileID: profileID,
      followerID: followerID,
    };
    await followerCollection.insertOne(follower);
    return await followerCollection
      .aggregate([
        { $match: { profileID: profileID, followerID: followerID } },
        { $unset: ["profileID"] },
        {
          $lookup: {
            from: "profile",
            localField: "followerID",
            foreignField: "_id",
            as: "followerData",
          },
        },
        {
          $lookup: {
            from: "post",
            localField: "followerID",
            foreignField: "profileID",
            as: "postsData",
          },
        },
      ])
      .toArray();
  } catch (error) {
    Logger.log(`mongo:addFollowers -> ${error}`, "error");
    return Promise.reject(error.errmsg);
  }
};

export const followersData = async (proID: string) => {
  try {
    let result = await followerCollection
      .aggregate([
        { $match: { followerID: proID } },
        {
          $lookup: {
            from: "profile",
            localField: "profileID",
            foreignField: "_id",
            as: "followersData",
          },
        },
      ])
      .toArray();
    return result;
  } catch (error) {
    Logger.log(`mongo:getProfileData -> ${error}`, "error");
    return Promise.reject(error.errmsg);
  }
};

export const unFollow = async (profileID: string, followerID: string) => {
  try {
    return await followerCollection.deleteOne({
      profileID: profileID,
      followerID: followerID,
    });
  } catch (error) {
    Logger.log(`mongo:addFollowers -> ${error}`, "error");
    return Promise.reject(error.errmsg);
  }
};
// follower ends here
