import { useEffect, useState } from "react";
import { useSQLite } from "react-sqlite-hook";

const Home = () => {
  const sqlite = useSQLite();
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({});

  const saveData = async () => {
    let database = await sqlite.createConnection(
      "db_reactvite",
      false,
      "no-encryption",
      1
    );
    await database.open();
    let query = "INSERT INTO users (id,name) VALUES (?,?);";
    let values = [1, "Butterfly Valve"];
    let res = await database.run(query, values);
    if (res.changes.changes !== 1 || res.changes.lastId !== 1) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveData();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getRecord = async () => {
    try {
      let database = await sqlite.createConnection(
        "db_reactvite",
        false,
        "no-encryption",
        1
      );
      await database.open();
      await database.query(`CREATE TABLE IF NOT EXISTS users (
                          id INTEGER PRIMARY KEY NOT NULL,
                          name TEXT NOT NULL);`);
      let res = await database.query("SELECT * FROM users");
      setRecords(res.values);
      // await sqlite.closeConnection("db_reactvite");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecord();
  }, [sqlite]);

  return (
    <div className="h-screen w-screen bg-gray-100 p-2">
      {records.map((record) => {
        return <div key={record.id}>{record.name}</div>;
      })}
      <form onSubmit={handleSubmit} className="bg-white">
        <div>
          <label>Name</label>
          <input onChange={handleChange} name="name" />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Home;
