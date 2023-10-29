import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';

if (process.argv[2] === undefined) {
	console.log('Usage: node local.mjs [build|serve]')
} else if (process.argv[2] === "build") {
	build();
} else if (process.argv[2] === "serve") {
	serve();
}

function parse(content, css) {
	let article_arr = [];
	let article_str = '';
	let article_title = '';

	article_arr = content.toString().split('\n');

	article_title = article_arr[0].slice(2)

	for (let i = 0; i < article_arr.length; i++) {
		if (i > 0) {
			if (article_arr[i] === '') {
				article_str += `<br/>`;
			} else {
				article_str += `<p>${article_arr[i]}</p>`;
			}
		}
	}

	article_str = `
	<style>
		${css}
	</style>
    <article>
        <h1>${article_title}</h1>
        ${article_str}
    </article>
    `;
	return article_str;
}

function build() {
	const articles = [
		"2022-08-09",
		"index"
	];

	const css = fs.readFileSync('./local.css').toString();
	for (const article of articles) {
		const article_md = fs.readFileSync(`./content/${article}.md`).toString();
		const article_html = parse(article_md, css);
		const html = `
		<html>
			<head>
				<title>Ayushman Chhabra</title>
			</head>
		
			<body>
				${article_html}
			</body>
		</html>
		`;

		if (fs.existsSync('./static') === false) {
			fs.mkdirSync('./static');
	
		}	
		fs.writeFileSync(`./static/${article}.html`, html);
	}
}

function serve() {
	const server = http.createServer({}, (req, res) => {
		let file_path = '.' + req.url;
		if (file_path === './') {
			file_path = './2022-08-09.md';
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
				if (path.extname(file_path) === '.md') {
					const css = fs.readFileSync('./local.css').toString();
					res.writeHead(200, { 'Content-Type': 'text/html' });
					res.end(parse(content, css));
				}
			}
		});
	});

	server.listen(4000, console.log('Server is running on port 4000'));
}
