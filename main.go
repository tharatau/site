package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	files, err := os.ReadDir("./content")
	if err != nil {
		fmt.Println(err)
	}

	var articles string
	for _, file := range files {

		date := file.Name()

		buffer, _ := os.ReadFile("./content/" + date)
		content := strings.Split(string(buffer), "\n")
		title := content[0]
		body := content[2:]

		var article string

		for i := 0; i < len(body); i++ {
			if body[i] == "" {
				article += "<br/>"
			} else {
				article += fmt.Sprintf("<p>%s</p>\n\t\t", body[i])
			}
		}

		html := fmt.Sprintf(`
<html>
	<head>
		<title>Ayushman Chhabra</title>
		<link rel="stylesheet" href="./local.css" />
	</head>
				
	<body>
		<h1>%s</h1><br/>
		%s
	</body>
</html>`, title, article)

		os.WriteFile("./docs/"+date+".html", []byte(html), 0755)
		articles += fmt.Sprintf("<br><p><a href='./%s.html'>%s</a></p>\n\t\t\t", date, title)
	}

	index := fmt.Sprintf(`
<html>

	<head>
		<title>Ayushman Chhabra</title>
		<link rel="stylesheet" href="./local.css" />
	</head>
	
	<body>
	
		<article>
			<h1>notes, essays, poems</h1><br/>
			%s
		</article>
	</body>
	
</html>
	`, articles)

	os.WriteFile("./docs/index.html", []byte(index), 0755)

	css, err := os.ReadFile("./local.css")
	if err != nil {
		fmt.Println(err)
	}

	os.WriteFile("./docs/local.css", css, 0755)

}
