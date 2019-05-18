import multer from 'multer';

const upload = multer({
  fileFilter: (req, file, callback) => {
    const ext = req.file.originalname;
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    if (!allowedExtensions.includes(ext)) {
      callback(new Error('Only image upload allowed'));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

export default upload;
