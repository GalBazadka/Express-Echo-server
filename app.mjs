import express from "express";
import log from "@ajar/marker";
import morgan from "morgan";

const { PORT, HOST } = process.env;

const app = express();
// console.log(app.use)

app.use(morgan("dev"));
app.use(express.json());
// console.log(morgan)

app.get("/", (req, res) => {
  res.status(200).send("Hello Express!");
});

app.get("/users", (req, res) => {
  res.status(200).send("Get all Users");
  res.status(400).send("kkkkk");
  // res.setHeader('Content-Type','application/json')
});

app.get("/search", (req, res) => {
  res
    .status(200)
    .send(
      `My favorite food is ${req.query.food} and i live in ${req.query.town}`
    );
});
// '/search?food=burger&town=ashdod'

app.get("/restaurant/:type/:location", (req, res) => {
  const { type, location } = req.params;
  res
    .status(200)
    .send(
      `Gal likes to eat ${type} food, her favorite restaurant is in ${location}.`
    );
});
// '/restaurant/Italian/Rehovot'

app.post("/pizza", (req, res) => {
  res.status(200).json(req.body);
  // res.setHeader('Content-Type','application/json')
});

app.get("/getYourMarkup", (req, res) => {
  const markup = `
    <div>
        <p>helloooo</p>
    </div>
    `;
  res.status(200).set("Content-Type", "application/json").send(markup);
});

app.get("/api", (req, res) => {
  const data = [
    { Name: "Tal", FavRestaurant: "Piato", FavTypeOfFood: "Iltalian" },
    { Name: "Gal", FavRestaurant: "Nono & Mimi", FavTypeOfFood: "Iltalian" },
    { Name: "Eden", FavRestaurant: "Hamburg", FavTypeOfFood: "Meat" },
  ];
  res.status(200).json(data);
});

app.use((req, res, next) => {
  res.status(404).send(` -404 - ${req.url} was not found.`);
});

app.listen(PORT, HOST, () => {
  log.magenta(`🌎  listening on`, `http://${HOST}:${PORT}`);
});

//------------------------------------------
//         Express Echo Server
//------------------------------------------
/* challenge instructions

     - install another middleware - morgan
        configuring app middleware like so:
        app.use( morgan('dev') );

     - define more routing functions that use
        - req.query - access the querystring part of the request url
        - req.params - access dynamic parts of the url
        - req.body - access the request body of a POST request
        
        in each routing function you want to pass some values to the server from the client
        and echo those back in the server response

    - return api json response

    - return html markup response

    - return 404 status with a custom response to unsupported routes
*/
