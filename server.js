import app from "./app.js";
import dbConnection from "./DbConfig/dbConfig.js";

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  await dbConnection();
  console.log(`Server is running on Port ${PORT}`);
});
