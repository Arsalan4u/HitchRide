import multer from "multer";
import path from "path";
import fs from "fs";

// Create folder if it doesn't exist
const uploadPath = "uploads/vehicleDocs";
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

// File filter (only images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error("Only image files (jpeg, jpg, png, webp) are allowed"));
    }
};

// Multer config
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// Middleware to handle vehicle documents
const uploadVehicleDocs = upload.fields([
    { name: "vehiclePhoto", maxCount: 1 },
    { name: "drivingLicence", maxCount: 1 },
    { name: "dashcamPhoto", maxCount: 1 },
]);

export { uploadVehicleDocs};
