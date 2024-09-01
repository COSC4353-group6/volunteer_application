import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Error handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    successful: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


app.get(
  '*',
  (req, res) =>
    // res.send(
    //   '<html><head><title>Hello, World!</title></head><body><h1>Hello, World! - Furniture store</body></html>'
    // )
    res.json(
        {
            Name:"COSC 4353 volunteer API - Group 6 ",
            Version: "1.0.0",
            Engine: "Node",
            Status: "Online"

        }
    )

);



app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`...Listening on port ${port}`);
});
