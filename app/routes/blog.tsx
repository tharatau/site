import type { LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import { Menu } from "~/components";
import metadata from "~/assets/blog.json";

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    if (params.date) {
        const response = await fetch(`https://raw.githubusercontent.com/ayushmanchhabra/ayushmanchhabra/main/content/${params.date}`);
        const text = await response.text();
        return text.split("\n\n");
    } else {
        return null;
    }
};

export default function Blog() {

    const article = useLoaderData<typeof loader>();

    return (
        <div>
            <Menu />
            <div>
                <div>{article}</div>
            </div>
            <div className="m-10 flex flex-col">

                {metadata.map((item, idx) => {
                    return (
                        <a className="hover:text-zinc-600" key={idx} href={`/blog/${item.date}`}>{item.title}</a>
                    );
                })}
            </div>
        </div>
    );
}
