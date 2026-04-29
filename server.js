const http = require("http");
const fs = require("fs"); // fs-file system module to read files from the server
const path = require("path");

const PORT = 3000;

// Helper function to serve HTML files
const serveFile = (filePath, res, statusCode = 200) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Server Error");
    } else {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/" || url === "/index") {
    serveFile(path.join(__dirname, "pages", "index.html"), res);
  } else if (url === "/about") {
    serveFile(path.join(__dirname, "pages", "about.html"), res);
  } else if (url === "/contact") {
    serveFile(path.join(__dirname, "pages", "contact.html"), res);
  } else if (url === "/style.css") {
    // Serve CSS
    fs.readFile(path.join(__dirname, "public", "style.css"), (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  } else {
    serveFile(path.join(__dirname, "pages", "404.html"), res, 404);
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});