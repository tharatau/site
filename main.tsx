import React from "vsx";

import posts from './posts/index';

import "./main.css";

function App(): Element {

    return (
        <div>
            <article>
                <h3>Ayushman Chhabra</h3>
                <p>
                    Economics student turned software developer turned security analyst.
                </p>
                <p>
                    Interested in music, literature and fitness.
                </p>
                <p>
                    Occassionally touches grass.
                </p>
            </article>
            <br />{"-x-"}<br /><br />
            {posts.map((post) => (
                <article>
                    <h3>{post.name}</h3>
                    <span><b>Published:</b> {post.date.published} <b>Updated:</b> {post.date.updated}</span>
                    <p>
                        {post.content.split("\n").map((para) => (
                            <p>{para}</p>
                        ))}
                    </p>
                    <br />
                    <h4>References: </h4>
                    <p>
                        {post.reference.map((ref: string) => (
                            <a href={ref}>{ref}</a>
                        ))}
                    </p>
                </article>
            ))}
        </div>
    );
}

document.getElementById("root")?.appendChild(<App />);
