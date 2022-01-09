const ProjectDatabaseModel =
  require("./ProjectDatabaseModel").ProjectDatabaseModel;
console.log("yo");
var dao = new ProjectDatabaseModel();
async function a() {
  await dao.connect("TestDatabase", "TestCollection");
  console.log(
    dao.addData({
      FirstField: "This sure is a value!",
      SecondField: 5,
      ThirdField: "the previos field is an int!",
      FourthField: 7.8,
    })
  );
}
a();
