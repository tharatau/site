import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import remarkBrk from "remark-breaks";

import { ip4 } from "./content";
import { useCLI, useGist } from "./hooks";

export function Root() {
  const { uid } = useParams();
  const { gist } = useGist(
    "aab13ebd85ad7a32d2f2890311567b8a",
    uid !== undefined && uid !== "" ? uid : "index"
  );

  const [mode, setMode] = useState<"web" | "cli">("web");

  const { history, handleCommand, pwd, pseudo, input, handleInput } = useCLI();

  return (
    <>
      {/* <span
        style={{
          position: "absolute",
          right: 10,
          top: 10,
        }}
      >
        <button
          onClick={() => setMode("web")}
          style={{
            textDecoration: mode === "web" ? "underline" : "none",
          }}
        >
          Web
        </button>
        {"/"}
        <button
          onClick={() => setMode("cli")}
          style={{
            textDecoration: mode === "cli" ? "underline" : "none",
          }}
        >
          CLI
        </button>
      </span> */}
      {mode === "web" ? (
        <ReactMarkdown children={gist} remarkPlugins={[remarkGfm, remarkBrk]} />
      ) : (
        <div>
          {history.map((command, idx) => (
            <div key={idx}>
              <span>{command}</span>
              <br />
            </div>
          ))}
          {`${pseudo}@${ip4}:${pwd}$ `}
          <input
            autoFocus={true}
            type="text"
            value={input}
            onChange={handleInput}
            onKeyDown={handleCommand}
          />
        </div>
      )}
    </>
  );
}
