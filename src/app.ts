import fs from 'fs';
import { IncomingMessage, ServerResponse } from 'http';
import path from 'path';

export const app = (req: IncomingMessage, res: ServerResponse) => {
  console.info('request ', req.url);

  /** parse all valid routes and provide the filepath */
  let filePath = '.' + req.url;
  if (filePath === './' || filePath === './index.html') {
    filePath = getFilePath('index.html');
  } else if (filePath === './index.js') {
    filePath = getFilePath('index.js');
  } else if (filePath === './favicon.ico') {
    filePath = getFilePath('favicon.ico');
  } else if (filePath === './style.css') {
    filePath = getFilePath('style.css');
  } else {
    if (filePath.match(/.\/403.html/)) {
      filePath = getFilePath('403.html');
    } else {
      filePath = getFilePath('404.html');
    }
  }

  /** set the correct Content-Type for response */
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.ico': 'image/x-icon',
    '.js': 'text/javascript',
    '.json': 'application/json'
  };
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  /** open file and send response */
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        fs.readFile('./404.html', (_, content404) => {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content404, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end(
          'Sorry, check with the site admin for error: ' + error.code + ' ..\n'
        );
        res.end();
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
};

/** resolve the filepath for the filename */
function getFilePath(filename: string) {
  return path.resolve(__dirname, '../' + `/public/${filename}`);
}
