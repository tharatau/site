import fsp from 'node:fs/promises';
import http from 'node:http';
import process from 'node:process';

if (process.argv[2] === undefined) {
	console.info('Usage: node local.mjs [serve]')
} else if (process.argv[2] === "serve") {
	serve();
}

function serve() {
	const server = http.createServer({}, async (req, res) => {
		let file_path = './docs' + req.url;
		if (file_path === './docs/') {
			file_path = './docs/index.html';
		}

		try {
			const content = await fsp.readFile(file_path);
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(content.toString());
		} catch (error) {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.end(error.toString());
		}
	});

	server.listen(4000, console.info('Server is running on port 4000'));
}
