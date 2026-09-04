const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let chats = [
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "Namaste Bhai! Nenu Bagunnanu",
    created_at: new Date(),
  },
  {
    from: "Gudapur Koushik",
    to: "Tupakula Narender",
    msg: "Em chestunnav?",
    created_at: new Date(),
  },
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "Coding chestunna bhai",
    created_at: new Date(),
  },
  {
    from: "Gudapur Koushik",
    to: "Tupakula Narender",
    msg: "DSA practice chestunnava?",
    created_at: new Date(),
  },
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "Avunu daily practice chestunna",
    created_at: new Date(),
  },
  {
    from: "Gudapur Koushik",
    to: "Tupakula Narender",
    msg: "Enni problems solve chesav?",
    created_at: new Date(),
  },
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "Today five problems solve chesa",
    created_at: new Date(),
  },
  {
    from: "Gudapur Koushik",
    to: "Tupakula Narender",
    msg: "Super bhai",
    created_at: new Date(),
  },
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "Nuvvu em chestunnav?",
    created_at: new Date(),
  },
  {
    from: "Gudapur Koushik",
    to: "Tupakula Narender",
    msg: "MongoDB nerchukuntunna",
    created_at: new Date(),
  },
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "MongoDB easy ga unda?",
    created_at: new Date(),
  },
  {
    from: "Gudapur Koushik",
    to: "Tupakula Narender",
    msg: "Konchem practice kavali",
    created_at: new Date(),
  },
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "Practice chesthe easy avutundi",
    created_at: new Date(),
  },
  {
    from: "Gudapur Koushik",
    to: "Tupakula Narender",
    msg: "Correct bhai",
    created_at: new Date(),
  },
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "Job search ela undi?",
    created_at: new Date(),
  },
  {
    from: "Gudapur Koushik",
    to: "Tupakula Narender",
    msg: "Applications chestunna",
    created_at: new Date(),
  },
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "All the best bhai",
    created_at: new Date(),
  },
  {
    from: "Gudapur Koushik",
    to: "Tupakula Narender",
    msg: "Thank you bhai",
    created_at: new Date(),
  },
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "Resume update chesava?",
    created_at: new Date(),
  },
  {
    from: "Gudapur Koushik",
    to: "Tupakula Narender",
    msg: "Avunu update chesa",
    created_at: new Date(),
  },
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "Projects em unnayi?",
    created_at: new Date(),
  },
  {
    from: "Gudapur Koushik",
    to: "Tupakula Narender",
    msg: "MERN projects unnayi",
    created_at: new Date(),
  },
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "Nice bhai",
    created_at: new Date(),
  },
  {
    from: "Gudapur Koushik",
    to: "Tupakula Narender",
    msg: "React kuda nerchukuntunna",
    created_at: new Date(),
  },
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "Frontend strong chesko",
    created_at: new Date(),
  },
  {
    from: "Gudapur Koushik",
    to: "Tupakula Narender",
    msg: "Definitely bhai",
    created_at: new Date(),
  },
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "Sare repu kaluddam",
    created_at: new Date(),
  },
  {
    from: "Gudapur Koushik",
    to: "Tupakula Narender",
    msg: "Okay bhai take care",
    created_at: new Date(),
  },
  {
    from: "Tupakula Narender",
    to: "Gudapur Koushik",
    msg: "Good night bhai",
    created_at: new Date(),
  },
];

Chat.insertMany(chats);
