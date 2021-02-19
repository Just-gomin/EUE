import routes from "../routes";

export const getDataInput = (req, res) => {
  console.log(req.query);
  res.status(200).send("<p>OK</p>");
};
