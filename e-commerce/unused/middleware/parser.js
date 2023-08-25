const parser = (req, res, next) => {
  if (req.method === "POST") {
    req.on('data', data => {
      const parsed = data.toString("utf8").split("&");
      const formData = {};
      for (let pair of parsed) {
        const [key, value] = pair.split("=");
        formData[key] = value;
      }
      req.body = formData;
      next();
    });
  } else {
    next();
  }
};

// router.post("/", parser, (req, res) => {
//   console.log(req.body);
//   res.send("Account created!");
// });