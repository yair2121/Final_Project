const ProjectDatabaseModel =
  require("../../Database/ProjectDatabaseModel").ProjectDatabaseModel;
const dao = new ProjectDatabaseModel();

describe("Test CRUD operations with ProjectDatabaseModel", () => {
  beforeAll(async () => {
    await dao.connect("TestDatabase", "TestCollection");
    await dao.insertOne({ dummy: "dummy" });
  });
  afterEach(async () => {
    {
    }
  });
  afterAll(() => {
    dao.close();
  });
  test("Should add sample data and read it", async () => {
    test_data = {
      game_time: "16:20",
      player_ids: [1, 2, 3, 4],
      turns: {
        turn1: "5",
        turn2: "7",
      },
    };
    dao.insertOne(JSON.parse(JSON.stringify(test_data)));
    q1 = { game_time: { $eq: "16:20" } };
    read_data = JSON.parse(JSON.stringify(await dao.findOne(q1)));
    delete read_data["_id"];
    expect(JSON.stringify(read_data)).toBe(JSON.stringify(test_data));
  });
  test("Should update sample data and read it", async () => {
    test_data = {
      game_time: "16:20",
      player_ids: [1, 2, 3, 4],
      turns: {
        turn1: "5",
        turn2: "7",
      },
    };
    dao.insertOne(JSON.parse(JSON.stringify(test_data)));
    test_data = {
      game_time: "16:59",
      player_ids: [1, 2, 3, 4],
      turns: {
        turn1: "5",
        turn2: "7",
      },
    };
    filter = { game_time: { $eq: "16:20" } };
    update = { $set: { game_time: "16:59" } };
    await dao.updateOne(filter, update);
    filter = { game_time: { $eq: "16:59" } };
    read_data = await JSON.parse(JSON.stringify(await dao.findOne(filter)));
    delete read_data["_id"];
    expect(JSON.stringify(read_data)).toBe(JSON.stringify(test_data));
  });
  test("Should clear everything but dummy, then add multiple entries and read with filters", async () => {
    await dao.deleteMany({ dummy: { $exists: false } });
    test_data = [
      {
        game_time: "16:59",
        player_ids: [1, 2, 3, 4],
        turns: {
          turn1: "5",
          turn2: "7",
        },
      },
      {
        game_time: "17:22",
        player_ids: [4, 2, 6, 1],
        turns: {
          turn1: "20",
          turn2: "13",
        },
      },
      {
        game_time: "17:23",
        player_ids: [8, 1, 5, 9],
        turns: {
          turn1: "1",
        },
      },
    ];
    await dao.insertMany(test_data);
    filter = { player_ids: 1 };
    filter2 = { player_ids: 2 };
    filter3 = { player_ids: 9 };
    filter4 = { player_ids: 0 };
    c1 = await dao.findMany(filter).count(); //3
    c2 = await dao.findMany(filter2).count(); //2
    c3 = await dao.findMany(filter3).count(); //1
    c4 = await dao.findMany(filter4).count(); //0
    expect([c1, c2, c3, c4]).toEqual([3, 2, 1, 0]);
  });
  test("Should add done: true to everything but dummy", async () => {
    filter = { dummy: { $exists: false }, done: { $exists: false } };
    update = { $set: { done: true } };
    await dao.updateMany(filter, update);
  });
  test("Should clear collection", async () => {
    dao.deleteMany({});
    count = await dao.findMany({}).count();
    expect(count).toBeFalsy();
  });
});
