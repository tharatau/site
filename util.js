import fs from "node:fs";

await getBlogMetadata();

async function getBlogMetadata () {
    const files = await fs.promises.readdir("./content");

    let metadata = [];

    for (const fileName of files) {
        const buffer = await fs.promises.readFile(`./content/${fileName}`);
        const content = buffer.toString();
        const array = content.split("\n\n");
        metadata.push({
            date: fileName,
            title: array[0]
        });
    }

    await fs.promises.writeFile("./app/assets/blog.json", JSON.stringify(metadata.reverse()));
}