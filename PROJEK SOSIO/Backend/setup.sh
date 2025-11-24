#!/bin/bash

echo "Membuat struktur folder backend..."

mkdir -p src/config
mkdir -p src/controllers
mkdir -p src/middlewares
mkdir -p src/models
mkdir -p src/routes
mkdir -p src/utils
mkdir -p src/locales

echo "Membuat file-file backend..."

touch src/index.js
touch src/config/cloudinary.js
touch src/config/db.js

touch src/controllers/reportController.js
touch src/controllers/claimController.js

touch src/middlewares/uploadMiddleware.js
touch src/middlewares/moderationMiddleware.js
touch src/middlewares/languageMiddleware.js

touch src/models/Report.js
touch src/models/Claim.js

touch src/routes/reportRoutes.js
touch src/routes/claimRoutes.js

touch src/utils/textModeration.js
touch src/utils/photoModeration.js
touch src/utils/matchAnswers.js

touch src/locales/en.json
touch src/locales/id.json

touch README.md

echo "Membuat file package.json..."

cat <<EOF > package.json
{
  "name": "lost-and-found-backend",
  "version": "1.0.0",
  "description": "Backend untuk website Lost and Found (MERN Stack)",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "cloudinary": "^1.41.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.0",
    "express": "^4.18.2",
    "express-fileupload": "^1.4.0",
    "i18n": "^0.15.1",
    "mongoose": "^7.5.0",
    "multer": "^1.4.5",
    "multer-storage-cloudinary": "^4.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
EOF

echo "Selesai! 🎉"
echo "Sekarang jalankan: npm install"