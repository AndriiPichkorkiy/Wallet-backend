const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type("html").send(html));
app.get("/test", (req, res) =>
  res.json({ message: "Hello test adress", code: 1337 })
);

app.listen(port, () =>
  console.log(
    `Server app listening on port ${port}!\n LET'S DO AWESOME PROJECT!`
  )
);

const html = `
    <body style="background-color: orange; height: 100vh;">
        <h1> S.W.A.T. Team </h1>
    </body>
`;
