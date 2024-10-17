global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
global.ReadableStream = require("readable-stream").Readable;

require("dotenv").config({ path: ".env.local" });

console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID); // 環境変数の値を出力して確認
