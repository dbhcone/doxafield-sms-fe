import fs from 'fs';
import config from 'config';

const APPROOT = <string> config.get('APPROOT');

const deletePhoto = (fileName?: string) => {
//   const url = new URL(`/public/uploads/${fileName}`, APPROOT);
  
  fs.unlink(`backend/public/uploads/${fileName}`, (err: NodeJS.ErrnoException | null) => {
    if (err) {
      console.log(err.name, err.code, err.message);
      return false;
    } else {
      return true;
    }
  });
};

export { deletePhoto };
