import fs from 'node:fs';
import { readFile } from 'node:fs/promises';
import http from 'node:http';
import process from 'node:process';

if (process.argv[2] === undefined) {
	console.log('Usage: node local.mjs [build|serve]')
} else if (process.argv[2] === "build") {
	build();
} else if (process.argv[2] === "serve") {
	serve();
}

function parse(content) {
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
		"2023-11-01",
	];

	for (const article of articles) {
		const article_md = fs.readFileSync(`./content/${article}.md`).toString();
		const article_html = parse(article_md);
		const html = `
<html>
	<head>
		<title>Ayushman Chhabra</title>
		<link rel="stylesheet" href="./local.css" />
	</head>
		
	<body>
		${article_html}
	</body>
</html>`;

		if (fs.existsSync('./docs') === false) {
			fs.mkdirSync('./docs');
		}
		fs.writeFileSync(`./docs/${article}.html`, html);
	}

	fs.writeFileSync('./docs/CNAME', 'ayushmanchhabra.com');
	fs.cpSync('./local.css', './docs/local.css');
	fs.cpSync('./local.html', './docs/index.html');
}

function serve() {
	const server = http.createServer({}, async (req, res) => {
		let file_path = './docs' + req.url;
		if (file_path === './docs/') {
			file_path = './docs/index.html';
		}

		try {
			const content = await readFile(file_path);
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(content.toString());
		} catch (error) {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.end(error);
		}
	});

	server.listen(4000, console.log('Server is running on port 4000'));
}
