const EXPRESS = require("express");
require("dotenv").config();
const app = EXPRESS();
const taskRouter = require("./routes/task");
let port = process.env.PORT || 4000;
const dbConnect = require("./startup/dbConnnect");

app.use(EXPRESS.json());
app.use(EXPRESS.static('./public'))
app.use("/api/v1/tasks", taskRouter);
const start = async () => {
  try {
    await dbConnect();
    app.listen(port, () => {
      console.log(`Server is up and running at ${port}`);
    });
  } catch (err) {
    throw new Error(err);
  }
};

start()

