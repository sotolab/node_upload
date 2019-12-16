
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "upload/")
    },
    filename: function (req, file, callback) {
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "-" + Date.now() + extension);
    }
});

// 1. 미들웨어 등록
let upload = multer({
    storage: storage
});


module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index.html')
    });
    app.get('/about', function (req, res) {
        res.render('about.html');
    });

    // 뷰 페이지 경로
    app.get('/show', function (req, res, next) {
        res.render("board")
    });

    // 2. 파일 업로드 처리
    app.post('/upload/create', upload.single("imgFile"), function (req, res, next) {
        // 3. 파일 객체
        let file = req.file

        // 4. 파일 정보
        let result = {
            originalName: file.originalname,
            size: file.size,
        }

        console.log("result: " , result)

        // res.json(result);
        // res.render('index.html')
        res.redirect("/")
    });

}