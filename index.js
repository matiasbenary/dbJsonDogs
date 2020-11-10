var faker = require("faker");
var axios = require("axios");
fs = require("fs");

faker.locale = "es";

let imgDog = [];

const getImgDog = async () => {
  const candDogs = 20;  
  const res = await axios.get("https://dog.ceo/api/breeds/image/random/"+candDogs);
  imgDog = res.data.message;
};

const saveFile = (json) => {
  // mode debug const data = JSON.stringify(json, null,  " ");
  const data = JSON.stringify(json);
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

  for (let dogId = 1; dogId <= length; dogId++) {
    const cantCommentaries = Math.random() * 4 + 1 ;
    for (let indice = 1; indice <= cantCommentaries; indice++) {
      db.comments.push({
        dogId,
        id: indice,
        commentary: faker.lorem.sentence(),
        user: faker.internet.userName(),
      });
    }
  }

  saveFile(db);
};

init();
