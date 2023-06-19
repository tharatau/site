const RELEASE: boolean = false;

if (RELEASE === false) {
  new EventSource("/esbuild").addEventListener("change", () =>
    location.reload()
  );
}

const root: HTMLElement | null = document.getElementById("root");

const text: string = `
    Hi, I'm Ayush.\n
    Software Developer.\n`;

if (root !== null) {
    let i = 0;

    setInterval(() => {
        if (i < text.length) {

            if (text[i] === "\n") {
                document.getElementById("root").innerHTML += "<br>";
            }

            document.getElementById("root").innerHTML += text[i];
            i++;
        }
    }, 150);

}
