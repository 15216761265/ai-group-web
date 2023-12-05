import express from "express";
import path from "path";
import history from "connect-history-api-fallback";
import http from "http";

const port = 4137;

const app = express();
app.use(history());

app.use(express.static(path.resolve(__dirname, "../dist")));

app.use("/", express.static(path.resolve(__dirname, "../dist/index.html")));

http.createServer(app).listen(port, () => {
  console.log(`🐶 http server is ready at http://localhost:${port}`);
});

export default app;
