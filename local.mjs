import fsp from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';

if (process.argv[2] === undefined) {
	console.info('Usage: node local.mjs [build|serve]')
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
	return { article_title, article_str };
}

async function build() {

	let articles = [];

	fsp.mkdir('./docs', {
		recursive: true,
	});

	const content_dir = await fsp.readdir('./content');

	for await (const file_path of content_dir) {
		const buffer = await fsp.readFile(`./content/${file_path}`);
		const { article_title, article_str } = parse(buffer.toString());
		articles.push({
			content: article_str,
			date: path.basename(file_path, '.md'),
			path: file_path,
			title: article_title,
		});

		const htmlTemplate = `
<html>
	<head>
		<title>${article_title}</title>
		<link rel="stylesheet" href="./local.css" />
	</head>
				
	<body>
		${article_str}
	</body>
</html>`;

		await fsp.writeFile(`./docs/${path.basename(file_path, '.md')}.html`, htmlTemplate);
	}

	articles.reverse();

	await fsp.writeFile('./docs/CNAME', 'ayushmanchhabra.com');
	await fsp.cp('./local.css', './docs/local.css');

	let articlesTemplate = ``;

	for await (const article of articles) {
		articlesTemplate += `<br><p><a href="./${article.date}.html">${article.title}</a></p>\n`
	}

	let indexTemplate = `
<html>

	<head>
		<title>Ayushman Chhabra</title>
		<link rel="stylesheet" href="./local.css" />
	</head>
	
	<body>
	
		<article>
			<h1>notes, essays, poems</h1><br/>
${articlesTemplate}
		</article>
	</body>
	
</html>
	`;

	await fsp.writeFile('./docs/index.html', indexTemplate);

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
