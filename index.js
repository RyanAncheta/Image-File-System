const express = require('express');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const upload = require('./middlewares/fileStorage');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app
    .route('/upload')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, 'views', 'upload.html'));
    })
    .post(upload.single("file"), (req, res) => {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        res.send(`File uploaded successfully:  ${req.file.path}`);
    });

app
    .route("/upload-multiple")
    .get((req, res) => {
        res.sendFile(path.join(__dirname, "views", "upload-multiple.html"));
    })
    .post(upload.array("files", 100), (req, res) => {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded');
        }
        const filePaths = req.files.map(file => file.path);
        res
            .status(200)
            .send(`Files uploaded successfully: ${filePaths.join(", ")}`);
    });

app.get("/fetch-single", (req, res) => {
    let upload_dir = path.join(__dirname, "uploads");

    let uploads = fs.readdirSync(upload_dir);
    console.log(uploads);

    if (uploads.length == 0) {
        return res.status(503).send({
            message: "No images",
        });
    }
    let max = uploads.length - 1;
    let min = 0;

    let index = Math.round(Math.random() * (max - min) + min);
    let randomImage = uploads[index];

    res.sendFile(path.join(upload_dir, randomImage));
});

app.get("/random-images", (req, res) => {
    const count = parseInt(req.query.count) || 1;
    const upload_dir = path.join(__dirname, "uploads");
    const uploads = fs.readdirSync(upload_dir);

    if (uploads.length == 0) {
        return res.status(404).send('No files found');
    }

    const randomFiles = [];
    for (let i = 0; i < count; i++) {
        randomFiles.push(uploads[Math.floor(Math.random() * uploads.length)]);
    }
    res.json(randomFiles);
});

app.get("/gallery", (req, res) => {
    const upload_dir = path.join(__dirname, "uploads");
    const uploads = fs.readdirSync(upload_dir);

    if (uploads.length == 0) {
        return res.status(404).send('No files found');
    }
    res.json(uploads);
});

app.get("/gallery-pagination", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const upload_dir = path.join(__dirname, "uploads");
    const uploads = fs.readdirSync(upload_dir);

    if (uploads.length == 0) {
        return res.status(404).send('No files found');
    }

    const paginatedFiles = uploads.slice((page - 1) * limit, page * limit);
    res.json({
        page,
        limit,
        total: uploads.length,
        data: paginatedFiles
    });
});

app.get("/single", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "single.html"));
});

app.get("/multiple-random", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "multiple-random.html"));
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
