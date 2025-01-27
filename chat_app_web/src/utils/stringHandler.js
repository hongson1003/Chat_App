export const stringHandler = {
  getFirstLetters: (name) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return `${names[0].charAt(0).toUpperCase()}${names[names.length - 1]
      .charAt(0)
      .toUpperCase()}`;
  },

  compareSizes: (sizes1, sizes2) => {
    const m1 = +sizes1.split('px')[0];
    const m2 = +sizes2.split('px')[0];
    if (m1 < m2) return -1;
    else if (m1 === m2) return 0;
    return 1;
  },

  getPreviewImage: (file) => {
    const image = URL.createObjectURL(file);
    return image;
  },

  getLinkDownloadFile: (url) => {
    const parts = url.split('/');
    const uploadIndex = parts.findIndex((part) => part === 'upload');
    if (uploadIndex !== -1) {
      parts.splice(uploadIndex + 1, 0, 'fl_attachment');
      const newUrl = parts.join('/');
      return newUrl;
    } else {
      return url;
    }
  },

  getDataFromStringifyFile: (stringifyFile) => {
    try {
      const file = JSON.parse(stringifyFile);
      return file;
    } catch (error) {
      return null;
    }
  },

  customizeFile: (file) => {
    const newFile = { ...file };
    delete newFile.type;
    newFile.size = `${file.size} bytes`;
    newFile.name = file.name.split('.')[0];
    const ext = file.name.split('.')[1];
    if (ext === 'docx') {
      newFile.type = FILE_TYPE.WORD;
    } else if (ext === 'xlsx') {
      newFile.type = FILE_TYPE.EXCEL;
    } else if (ext === 'pdf') {
      newFile.type = FILE_TYPE.PDF;
    }
    return newFile;
  },
};
