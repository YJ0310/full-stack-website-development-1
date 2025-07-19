import { extname } from "path";
import { createServer, IncomingMessage, ServerResponse } from "http";
import {} from "url";
import { File_Server } from "./../file-server.js";
import { readFile, stat } from "fs/promises";
import { MIMEType } from "util";

export default class serveFile {
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
    req,
    res,
    filename,
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

}

new serveFile().create_server_and_handle_routes();