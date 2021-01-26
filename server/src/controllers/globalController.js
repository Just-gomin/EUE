export const getHome = (req, res) => {
  res.render("home", { pagename: "Home" });
};
