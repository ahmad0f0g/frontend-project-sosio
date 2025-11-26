@echo off
echo Membuat struktur folder...

REM Membuat folder
mkdir src
mkdir src\config
mkdir src\controllers
mkdir src\middlewares
mkdir src\models
mkdir src\routes
mkdir src\utils
mkdir src\locales

echo Membuat file-file...

REM Membuat file kosong
type nul > src\index.js
type nul > src\config\cloudinary.js
type nul > src\config\db.js
type nul > src\controllers\reportController.js
type nul > src\controllers\claimController.js
type nul > src\middlewares\uploadMiddleware.js
type nul > src\middlewares\moderationMiddleware.js
type nul > src\middlewares\languageMiddleware.js
type nul > src\models\Report.js
type nul > src\models\Claim.js
type nul > src\routes\reportRoutes.js
type nul > src\routes\claimRoutes.js
type nul > src\utils\textModeration.js
type nul > src\utils\photoModeration.js
type nul > src\utils\matchAnswers.js
type nul > src\locales\en.json
type nul > src\locales\id.json
type nul > README.md

echo Membuat package.json...

(
echo {
echo   "name": "lostfound-backend",
echo   "version": "1.0.0",
echo   "main": "src/index.js",
echo   "type": "module",
echo   "scripts": {
echo     "start": "nodemon src/index.js"
echo   },
echo   "dependencies": {
echo     "express": "^4.18.2",
echo     "mongoose": "^7.0.0",
echo     "multer": "^1.4.5",
echo     "cors": "^2.8.5",
echo     "dotenv": "^16.0.0",
echo     "cloudinary": "^1.37.2",
echo     "i18n": "^0.15.1"
echo   },
echo   "devDependencies": {
echo     "nodemon": "^3.0.0"
echo   }
echo }
) > package.json

echo Struktur backend selesai dibuat!
pause