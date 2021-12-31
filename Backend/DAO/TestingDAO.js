const ProjectDatabaseModel =
  require("./ProjectDatabaseModel").ProjectDatabaseModel;

var dao = new ProjectDatabaseModel();
dao.connect("TestDatabase", "TestCollection");
