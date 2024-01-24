import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Menu } from "~/components";
import metadata from "~/assets/blog.json";

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    if (params.date) {
        const response = await fetch(`https://raw.githubusercontent.com/ayushmanchhabra/ayushmanchhabra/main/content/${params.date}`);
        const text = await response.text();
        const array = text.split("\n");
        return json({
            title: array[0],
            content: array.slice(1),
        });
    } else {
        return null;
    }
};

export default function Blog() {

    const article = useLoaderData<typeof loader>();

    return (
        <div>
            <Menu />
            {article && (
                <>
                    <article className="mx-10">
                        <span className="text-3xl">{article?.title}</span>
                        <br /><br />
                        <span>{article?.content.map((sentence, idx) => {
                            return (
                                <p key={idx} className="mx-0">{sentence}</p>
                            );
                        })}</span>
                    </article>
                    <br />
                    <hr className="mx-10 border-2 " />
                </>
            )}

            <div className="m-10 flex flex-col">
                {metadata.map((item, idx) => {
                    return (
                        <a className="m-2 hover:text-zinc-600" key={idx} href={`/blog/${item.date}`}>{item.title}</a>
                    );
                })}
            </div>
        </div>
    );
}
