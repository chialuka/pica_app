import multer from 'multer';

const upload = multer({
  fileFilter: (req, file, callback) => {
    const ext = file.mimetype || req.file.originalname;
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    if (!allowedExtensions.includes(ext.slice(-4))) {
      callback(new Error('Only image upload allowed'));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

export default upload;
