const fig = require("figlet");

fig("Gudapur Koushk", function (err, data) {
  try {
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});
