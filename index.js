var faker = require("faker");
var axios = require("axios");
fs = require("fs");

faker.locale = "es";

let imgDog = [];

const getImgDog = async () => {
  let res = await axios.get("https://dog.ceo/api/breeds/image/random/50");
  imgDog = res.data.message;
};

const saveFile = (json) => {
  const data = JSON.stringify(json, null,  " ");
  fs.writeFileSync("db.json", data);
};

const init = async () => {
  await getImgDog();
  const db = { dogs: [], comments: [] };
  
  imgDog.forEach((img, index) =>
    db.dogs.push({
      id: index + 1,
      img,
      name: faker.name.firstName(),
      email: faker.internet.email(),
      like: faker.random.number(),
    })
  );

  const length = db.dogs.length;

  for (let Dogid = 1; Dogid <= length; Dogid++) {
    const cantCommentaries = Math.random() * 10;
    for (let indice = 1; indice <= cantCommentaries; indice++) {
      db.comments.push({
        Dogid,
        id: indice,
        commentary: faker.lorem.sentence(),
        user: faker.internet.userName(),
      });
    }
  }

  saveFile(db);
};

init();