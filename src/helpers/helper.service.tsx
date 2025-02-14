import Constant from "../utils/constant";

/**
 * Uploads a file to a cloud storage service using FormData.
 * @param {any} file - The file to be uploaded.
 * @returns {Promise<string>} A Promise that resolves to the URL of the uploaded file.
 */
export const uploadFile = async (file: any) => {
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('cloud_name', process.env.REACT_APP_CLOUDNARY_NAME ?? '');
    formdata.append('upload_preset', process.env.REACT_APP_CLOUDNARY_PRESET_NAME ?? '');
    

    const res = await fetch('https://api.cloudinary.com/v1_1/zudu/upload', {
        method: 'post',
        mode: 'cors',
        body: formdata
    });

    const json = await res.json();
    return `${json?.secure_url?.split('project-image/')[1]}`;
};

/**
 * Constructs a Cloudinary URL using the environment variables REACT_APP_CLOUDINARY_URL,
 * REACT_APP_CLOUDINARY_NAME, and REACT_APP_CLOUDINARY_SUBFOLDER.
 * @returns {string} The constructed Cloudinary URL.
 */
export  const getCloudinaryUrl =  (process.env.REACT_APP_CLOUDNARY_URL || '') +
(process.env.REACT_APP_CLOUDNARY_NAME || '') +
(process.env.REACT_APP_CLOUDNARY_SUBFLODER || '');



/**
    * Object containing valid thumbnail upload formats and their corresponding constants.
    * @type {Object}
    */
export const uploadThumNailValid = {
    "image/png": Constant.UPLOAD_THUMBNAIL_VALID.PNG,
    "image/jpg": Constant.UPLOAD_THUMBNAIL_VALID.JPG,
    "image/jpeg": Constant.UPLOAD_THUMBNAIL_VALID.JPEG,
    "image/svg+xml": Constant.UPLOAD_THUMBNAIL_VALID.SVG,
    "image/webp": Constant.UPLOAD_THUMBNAIL_VALID.WEBP,
  };   