import { Router } from "express";

import { ProfileController } from "./controllers/ProfileController";
import { PostController } from "./controllers/PostController";
import { FollowerController } from "./controllers/FollowerController";

export const routes = Router();

// profile
routes.get("/profile", ProfileController.getAllProfiles);
routes.get("/profile/:proID", ProfileController.getProfileByID);
routes.patch("/profile/:proID", ProfileController.insertProfile);

// posts
routes.get("/post/:proID", PostController.getPostByProfileID);
routes.post("/post/:proID", PostController.insertPost);

// follower
routes.get("/follower/:proID", FollowerController.getFollowersByProID);
routes.get("/:proID", FollowerController.getFollowersData);
routes.post("/follower/:proID", FollowerController.addFollower);
routes.delete("/follower/:proID/:followerID", FollowerController.unFollow);
