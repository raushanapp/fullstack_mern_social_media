import express  from"express";
import cors  from"cors";
import bodyParser  from"body-parser";
import multer  from"multer";
import helmet  from"helmet";
import morgan  from"morgan";
import path  from"path";
import {fileURLToPath}  from "url";
import dotenv from"dotenv"
import connectDB from "./config/db.js";
import { register } from "./controllers/auth.js";
import atuhRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js";
// configruation
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// if need dotenv then config
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// file storage

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });
// console.log(upload);

// routes with files

app.post("/auth/api/register",upload.single("picture"),register)

// routes
app.use("/auth", atuhRoutes);
app.use("/users", userRoutes);

// port number
const PORT = process.env.PORT || 2200;

// connect database

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server running port ${PORT}`);
        console.log("database connected")
    } catch (error) {
        console.log(error.message);
    }
});
// export app
export default app;