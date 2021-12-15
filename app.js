// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/fruitsDB", {
//   useNewUrlParser: true,
// });

// const fruitSchema = new mongoose.Schema({
//   name: String,
//   rating: {
//     type: Number,
//     min: 1,
//     max: 10,
//   },
//   review: String,
// });

// const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit({
//   rating: 10,
//   review: "Peaches are so yummy!",
// });

// fruit.save();

// const personSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
// });

// const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: "John",
//   age: 37,
// });

// // person.save();

// // const kiwi = new Fruit({
// //   name: "Kiwi",
// //   rating: 10,
// //   review: "The best fruit!",
// // });

// // const orange = new Fruit({
// //   name: "Orange",
// //   rating: 4,
// //   review: "Too sour for me",
// // });

// // const banana = new Fruit({
// //   name: "Banana",
// //   rating: 3,
// //   review: "Weird texture",
// // });

// // Fruit.insertMany([kiwi, orange, banana], function (err) {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log("Successfully saved all the fruit to fruitsDB");
// //   }
// // });

// Fruit.find(function (err, fruits) {
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close();
//     fruits.forEach(function (fruit) {
//       console.log(fruit.name);
//     });
//   }
// });

const mongoose = require("mongoose");

// Call async main function declared below and catch any errors at the end.
main();

// Go read this for a better understanding of async and await:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
async function main() {
  await mongoose.connect("mongodb://localhost:27017/fruitsDB");

  // Creating the Schema.
  const fruitSchema = new mongoose.Schema({
    name: {
      // Validator
      type: String,
      required: [true, "Fruits must have a name."],
    },
    rating: {
      // Validator
      type: Number,
      min: 1,
      max: 10,
      // min: [1, "min >= 1"],
      // max: [10, "max <= 10"],
    },
    review: String,
  });

  // Compiling Schema into a Model.
  const Fruit = mongoose.model("Fruit", fruitSchema);

  // Create a fruit document with properties and behaviors as declared in our Schema.
  const fruit = new Fruit({
    name: "mango",
    rating: 10,
    review: "sweet!",
  });
  // Save fruit document. Remember to comment it after the first time you launch app.js.
  // await fruit.save();

  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema,
  });

  // const strawberry = new Fruit({
  //   name: "strawberry",
  //   rating: 10,
  //   review: "sour and sweet!",
  // });

  // await strawberry.save();

  const cherry = new Fruit({
    name: "cherry",
    rating: 9,
    review: "too sweet!",
  });

  await cherry.save();

  const Person = mongoose.model("Person", personSchema);

  Person.updateOne(
    { _id: "61b356d3237a959a397bc130" },
    { favouriteFruit: cherry },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully updated the document.");
      }
    }
  );

  // const person = new Person({
  //   name: "Elly",
  //   age: 24,
  //   favouriteFruit: strawberry,
  // });

  // const person = new Person({
  //   name: "John",
  //   age: 37,
  // });

  // await person.save();

  // Person.deleteMany({}, function (err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Successfully deleted all matched documents.");
  //   }
  // });

  // Fruit.updateOne(
  //   { _id: "61b306fcf27ea646dbb26f04" },
  //   { name: "Watermelon" },
  //   function (err) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("Successfully updated the document.");
  //     }
  //   }
  // );

  // Fruit.deleteOne({ _id: "61b3315dffc9537cb2ed2c4e" }, function (err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Successfully deleted the document.");
  //   }
  // });

  // Find all the fruits inside fruits collection with mongoose .find({}, callback).
  Fruit.find((err, fruits) => {
    if (err) {
      console.log(err);
    } else {
      // Close connection to database!
      mongoose.connection.close();
      // Console log all the fruit names inside fruits collection.
      fruits.forEach((fruit) => {
        console.log(fruit.name);
      });
    }
  });
}
// end of async main func.
