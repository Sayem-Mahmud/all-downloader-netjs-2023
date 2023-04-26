import { NextApiRequest, NextApiResponse } from "next";
const request = require("request");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.query?.url?.toString() ?? "";
  // const name = (req.query?.name?.toString() ?? "").split(" ").join("-")
  res.setHeader("Content-Disposition", `attachment`);

  request
    .get(url, { encoding: null, highWaterMark: 256 * 1024 })
    .on("error", (err) => {
      console.log(err);
      res.status(500).send("Internal server error");
    })
    .pipe(res);
};
