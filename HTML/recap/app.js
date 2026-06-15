let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
  let res = await getFacts();

  document.getElementById("output").innerText = res;
});

let url = "https://catfact.ninja/fact";
async function getFacts() {
  try {
    let res = await axios.get(url);
    return res.data.fact;
  } catch (err) {
    console.log("error-", err);
  }
}
