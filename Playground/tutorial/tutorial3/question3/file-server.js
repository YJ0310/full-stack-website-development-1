import http from "http";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { MIMEType } from "util";

export class File_Server {
  /**
   *
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {String} filename
   * @param {String} file_path
   * @param {String} [content_type=null]
   * @param {String} [data=null]
   */
  constructor(
    req = null,
    res = null,
    filename = null,
    file_path = null,
    content_type = null,
    data = null
  ) {
    (this.req = req),
      (this.res = res),
      (this.filename = filename),
      (this.file_path = file_path),
      (this.content_type = content_type),
      (this.data = data);
  }
  // Utilities MIME types
  MIMEType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };
  async hello_world() {
    await this.server_hello_world(`Hello World`);
  }
  /**
   *
   * @param {String} content
   * @param {Number} PORT
   */
  async server_hello_world(content, PORT = 3000) {
    const server = http.createServer((req, res) => {
      res.writeHead(200, { "content-type": `text/plain` });
      res.end(content);
    });
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  }
  async file_server_example() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const server = http.createServer((req, res) => {
      let file_path = path.join(__dirname, `public`, req.url);

      fs.stat(file_path, (err, stats) => {
        if (err) {
          res.writeHead(404, { "content-type": "plain/text" });
          res.end(`File Not Found`);
          console.error(`Error:`, err);
        }
        if (stats.isDirectory()) {
          file_path = path.join(file_path, `about.html`);
        }
        fs.readFile(file_path, (err, data) => {
          if (err) {
            res.writeHead(404, { "content-type": "text/plain" });
            res.end(`File not Found`);
            console.error(`Error:`, err);
            return;
          }
          res.writeHead(200, { "content-type": "text/html" });
          res.end(data);
          //   console.log(data.toString())
        });
      });
    });
    server.listen(3000, () => {
      console.log(`Server is Running on http://localhost:3000`);
    });
    this.on_error(server);
  }
  /**
   *
   * @param {http.Server} server
   * @returns {String}
   */
  async on_error(server) {
    server.on(`error`, (error) => {
      console.error(`Server Error: `, error);
      return error;
    });
  }
  async command_line_application() {
    // get command line arguments
    const args = process.argv.slice(2);
    // const command = args[0];
    // const filename = args [1];
    const [command, filename] = args;
    switch (command) {
      case `create`:
        if (filename) {
          try {
            await fs.promises.writeFile(filename, ``);
            console.log(`${filename} Create Successfully`);
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log(`Please provide a file name`);
        }
        break;
      case `read`:
        if (filename) {
          try {
            const content = await fs.promises.readFile(filename, `utf-8`);
            console.log(content);
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log(`Please provide a file name`);
        }
        break;
      default:
        console.log(`Available commands: create, read`);
    }
  }
  async process_object() {
    this.environment_variable();
    console.log(process.argv);
    console.log(process.env.NODE_ENV);
    console.log(process.cwd());
    console.log(process.pid);
    process.exit();
  }
  async environment_variable() {
    dotenv.config();
    // set environment variables
    process.env.NODE_ENV = `development`;
    process.env.PORT = `3000`;

    // using dotenv package for .env files

    const port = process.env.NODE_ENV || 3000;
    const dbUrl = process.env.DATABASE_URL || `mongodb://localhost:27017/myapp`;
  }
  /**
   *
   * @param {String} filename
   * @returns {String} dirname
   */
  async get_dirname(filename = import.meta.url) {
    const base = import.meta.url;
    const __filename = fileURLToPath(new URL(filename, base));
    const __dirname = dirname(__filename);
    return __dirname;
  }
  /**
   *
   * @param {http.IncomingMessage} req
   */
  async basic_setup(req) {
    const port = 3000;
    const publicDir = await this.get_dirname();

    this.log_request(req);
  }
  // Request Logger
  /**
   *
   * @param {http.IncomingMessage} req
   */
  async log_request(req) {
    const port = 3000;
    const publicDir = await this.get_dirname();
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
  }
  async serveFile() {
    this.file_path = path.join(
      await this.get_dirname(this.filename),
      `public`,
      this.filename
    );
    const ext = await path.extname(this.file_path);
    /**
     * @type {String}
     */
    this.content_type = this.MIMEType[ext] || "application/octet-stream";

    // Staring read and write file
    await this.read_and_write_function();
  }

  async read_and_write_function() {
    try {
      this.data = await fs.promises.readFile(this.file_path);
      await this.res.writeHead(200, {
        "content-type": this.content_type,
        "content-length": this.data.length,
      });
      await this.res.end(this.data);
    } catch (error) {
      this.handler_error(error);
    }
  }
  async serveFileInfo() {
    const { filename } = this;
    try {
      this.file_path = path.join( await this.get_dirname(this.filename),
        `public`,
        this.filename
      );
      await console.log(this.file_path);

      const stats = await fs.promises.stat(this.file_path);
      const ext = await path.extname(this.file_path);
      this.res.writeHead(200, {
        "content-type": "application/json",
      });

      this.res.end(
        JSON.stringify({
          name: filename,
          size: stats.size,
          modified: stats.mtime.toISOString(),
          type: this.MIMEType[ext] || `unknown`,
          existsSync: true,
        })
      );
    } catch (error) {
      return this.res.end(
        JSON.stringify({
          name: filename,
          existsSync: false,
          error: `File Not File`,
        })
      );
    }
  }
  /**
   *
   * @param {} err
   */
  async handler_error(err) {
    if (err.code === `ENOENT`) {
      this.res.writeHead(404, { "content-type": "text/plain" });
      this.res.end(`404 File Not Found`);
    } else {
      this.res.writeHead(500, { "content-type": "text/plain" });
      this.res.end(`500 Internal Server Error`);
    }
  }
  async create_server_and_handle_routes() {
    const server = http.createServer(async (req, res) => {
      this.req = req;
      this.res = res;
      await this.log_request(req);
      const parts = await req.url.split(`/`);
      this.filename = parts[2];

      if (req.method === `GET` && parts[1] === `files`) {
        await this.serveFile();
      } else if (req.method === `GET` && parts[1] === `info`) {
        await this.serveFileInfo();
      } else {
        this.res.writeHead(404, { "content-type": "text/plain" });
        this.res.end(`404 Route Not Found`);
      }
    });
    server.listen(3000, async () => {
      console.log(`Server is running on http://localhost:3000`);
      // print all possible website
      await this.print_all_list();
    });
  }
  async print_all_list() {
    const file_path = `C:/Users/yinji/Documents/VS_code/Full_Stack_Website_Developer/Playground/tutorial/tutorial3/question3`;
    const entries = await fs.promises.readdir(file_path);
    const folder = [];
    const files = [];
    const type = [`files`, `info`];
    for (const entry of entries) {
      const full_path = await path.join(file_path, entry);
      const stats = await fs.promises.stat(full_path);
      if (stats.isDirectory()) {
        folder.push(entry);
        const file = await fs.promises.readdir(full_path);
        files.push(file);
      }
    }
    let count = 0;
    for (let j = 0; j < type.length; j++) {
      for (let index = 0; index < folder.length; index++) {
        const file = files[index];
        for (const file_element of file) {
          count++;
          console.log(
            `Link ${count}: http://localhost:3000/${type[j]}/${file_element}`
          );
        }
      }
    }
    // for (file of )
  }
}

new File_Server().create_server_and_handle_routes();
