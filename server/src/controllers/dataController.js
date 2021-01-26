import routes from "../routes";

export const getDataInput = (req, res) => {
  res.render("datainput", { pagename: "Data Input" });
};

export const postDataInput = (req, res) => {
  res.redirect(routes.home);
};
