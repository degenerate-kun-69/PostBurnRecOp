import { Router } from "express";
import { signup, signin } from "../Controllers/auth.controller.js";

const UserRouter = Router();



UserRouter.post("/", signup);
UserRouter.post("/signin", signin);
UserRouter.put("/:id", (req, res) => {
  res.send({ title: "Update User" });
});

UserRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete User" });
});

export default UserRouter;
