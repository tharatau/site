import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ip4 } from "./content";

export function useGist(uuid: string, name: string) {
  const [gist, setGist] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/gists/${uuid}`)
      .then((res) => res.json())
      .then((data) => {
        setGist(data["files"][`${name}.md`]["content"]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { gist, loading };
}

export function useCLI() {
  const [history, setHistory] = useState<string[]>([]);
  const [cmd, setCmd] = useState<string>("");
  const [pwd, setPwd] = useState<string>("/");
  const [pseudo, setPsuedo] = useState<string>("ayush");
  const [input, setInput] = useState<string>("");

  const { uid } = useParams();

  const { gist } = useGist(
    "aab13ebd85ad7a32d2f2890311567b8a",
    uid !== undefined && uid !== "" ? uid : "index"
  );

  const handleInput = (event: any) => {
    setInput(event.target.value);
  };

  const handleCommand = (event: any) => {
    if (event.key === "Enter") {
      if (event.target.value === "cat blog") {
        setHistory([...history, `${pseudo}@${ip4}:${pwd}$ ${input}`, ...gist]);
      } else if (event.target.value === "clear") {
        setHistory([]);
      } else if (event.target.value === "exit") {
        close();
      } else if (event.target.value === "help") {
        setHistory([
          ...history,
          `${pseudo}@${ip4}:${pwd}$ ${input}`,
          `My name is ${pseudo} and this is my blog.`,
          `Here is how to navigate it:`,
          ``,
          `cat blog: print the blog`,
          `clear: clear the terminal`,
          `exit: close the terminal`,
          `help: list of valid commands in this terminal emulator`,
          `pwd: print the current working directory`,
        ]);
      } else if (event.target.value === "pwd") {
        setHistory([...history, `${pseudo}@${ip4}:${pwd}$ ${input}`, pwd]);
      } else {
        setHistory([
          ...history,
          `${pseudo}@${ip4}:${pwd}$ ${input}`,
          `${input}: command not found`,
          `if you don't know what to do, type 'help'`,
        ]);
      }
      setInput("");
    }
  };

  return {
    history,
    setHistory,
    cmd,
    setCmd,
    handleCommand,
    pwd,
    setPwd,
    pseudo,
    setPsuedo,
    input,
    setInput,
    handleInput,
  };
}
