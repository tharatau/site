import fs from 'node:fs';
import http from 'node:http';

const server = http.createServer({}, (req, res) => {
 	let file_path = '.' + req.url;
	if (file_path === './') {
		file_path = './index.html';
	}
	fs.readFile(file_path, (error, content) => {
		if (error) {
			if (error.code === 'ENOENT') {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end('404 Not Found');
			} else {
				res.writeHead(500, { 'Content-Type': 'text/html' });
				res.end('500 Internal Server Error');
			}
		} else {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(content, 'utf-8');
		}
	});
});

server.listen(4000, console.log('Server is running on port 4000'));

