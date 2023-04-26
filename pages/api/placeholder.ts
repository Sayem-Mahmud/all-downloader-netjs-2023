import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Funcs } from "../../src/utils/Funcs";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const text = Funcs.removeAllWeirdCharacters(
    req.query?.text?.toString() ?? ""
  );
  const file = `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" preserveAspectRatio="none">
    <defs>
        <style type="text/css">
        #holder text {
            fill: #FFFFFF;
            font-family: cursive;
            font-size: 48px;
            font-weight: 400;
          }
        </style>
    </defs>
    <g id="holder">
        <rect width="100%" height="100%" fill="#000000"></rect>
        <g>
        <text text-anchor="middle" x="50%" y="50%" dy=".3em">${text}</text>
        </g>
    </g>
    </svg>`;
  res.writeHead(200, {
    "Content-Type": "image/svg+xml",
    "Content-Length": file.length,
  });
  res.end(file);
};
