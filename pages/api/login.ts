import type { NextApiRequest, NextApiResponse } from "next";

import { UserFinder } from "@/src/Domain/User/Service/UserFinder";

import { JWT } from "@/src/Auth/JWT";

async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405);
  }
  let viewData: any = {};
  const dataBody: any = req.body;
  // const data = req.query;
  let username = (dataBody.username ?? "").toString();
  let password = (dataBody.password ?? "").toString();

  if (username !== "" || password !== "") {
    const userFinder = new UserFinder();
    const jwt = new JWT();
    const user = await userFinder.checkLogin(username, password);
    const token = jwt.createToken(user);
    if (user && token) {
      viewData.message = "Login Successful";
      viewData.error = false;
      viewData.token = token;
      viewData.user = user;
      return res.status(200).send(viewData);
    } else {
      return res.status(401).send("error login");
    }
  } else {
    return res.status(400).send("error login");
  }
}

export default login;
