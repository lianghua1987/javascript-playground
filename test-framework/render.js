import {JSDOM} from 'jsdom';
import path from 'path';

let render = async (fileName) => {

  const filePath = path.join(process.cwd(), fileName);

  const dom = await JSDOM.fromFile(filePath, {
    runScripts: "dangerously",
    resources: 'usable'
  });

  return new Promise((resolve, reject) => {
    dom.window.document.addEventListener('DOMContentLoaded', () => {
      resolve(dom);
    });
  });
};

export default render;