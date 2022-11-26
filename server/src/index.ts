import express, { Express } from 'express';
import { router } from "./routes/app";
import { DbService } from "./services/db_service";

const port = 8000;
const app: Express = express();
app.use('/api', router);
DbService.init();

app.listen(port, () => {
    console.log("Server is running at", "http://localhost:" + port)
});


