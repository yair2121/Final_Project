const ProjectDatabaseModel =
  require("./ProjectDatabaseModel").ProjectDatabaseModel;
console.log("yo");
var dao = new ProjectDatabaseModel();
var base = {
  FirstField: "",
  SecondField: 5,
  ThirdField: "",
  FourthField: 7.8,
};
i = 0;
function makeData() {
  i = i + 1;
  base.FirstField += "a";
  base.SecondField++;
  base.ThirdField += "b";
  base.FourthField++;
  return JSON.parse(JSON.stringify(base));
}
async function ini() {
  return await dao.connect("TestDatabase", "TestCollection");
}
async function testCreate() {
  console.log(dao.insertOne(makeData()));
  dao.insertMany([makeData(), makeData(), makeData(), makeData()]);
}

async function testRead() {
  q1 = { SecondField: { $gt: 8 } };
  q2 = { FourthField: 12.8 };
  console.log(await dao.findOne(q1));
  console.log(await dao.findOne(q2));
  console.log(await dao.findMany(q1).toArray());
  console.log(await dao.findMany(q2).toArray());
}

async function testUpdate() {
  filter = { SecondField: { $gt: 8 } };
  update = {
    $set: {
      FirstField: "UPDATED ONLY THIS",
    },
  };
  update2 = {
    $set: {
      ThirdField: "UPDATED THIS AMONG OTHERS",
    },
  };
  console.log(dao.updateOne(filter, update));
  console.log(dao.updateOne(filter, update2));
}
ini().then(() => {
  testRead();
  testUpdate();
});
// testCreate();
