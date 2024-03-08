let shortid = require("shortid");

class Api {
  constructor(image, title, price, sport, color, type, gender) {
    this.id = shortid();
    this.image = image;
    this.title = title;
    this.price = price;
    this.sport = sport;
    this.color = color;
    this.type = type;
    this.gender = gender;
  }
}

let a = new Api(
    "../src/components/images/products/fan-shirt/31b5yX8crEL._SL500_-removebg-preview.png",
    "blue fan shirt",
    200,
    "all",
    "blue",
    "shirt",
    "male"
  );