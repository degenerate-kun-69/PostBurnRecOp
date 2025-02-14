import { Router } from "express";
import { signup, signin } from "../Controllers/auth.controller.js";
import { getUser, getUsers } from "../Controllers/user.controller.js";

const UserRouter = Router();

UserRouter.get("/users", getUsers);

UserRouter.get("/:id", getUser);

UserRouter.post("/", signup);
UserRouter.post("/signin", signin);
UserRouter.put("/:id", (req, res) => {
  res.send({ title: "Update User" });
});

UserRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete User" });
});

export default UserRouter;
