const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrity/create", async (req, res, next) => {
  try {
    /*     console.log(req.body); */
    const { name, occupation, catchPhrase } = req.body;
    /* descostruindo o objeto,
       será passado em ordem (title: 0, author: 1, etc) */
    const createdCelebrity = await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    });
    // os nomes no objeto acima tem de bater com os nomes no module
    // e tem que bater com os names do form do hbs
    //console.log("new celebrity was created", createdCelebrity);
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

router.get("/celebrities", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities: allCelebrities });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
