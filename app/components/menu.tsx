export default function Menu() {
    return (
        <nav className="h-14 w-full text-lg flex flex-column items-center content-center">
            <a href="/" className="flex-1 mx-12 hover:text-zinc-400">
                AC
            </a>
            
            <a href="https://resume.ayushmanchhabra.com/" rel="noreferrer" target="_blank" className="flex-2 mx-2 text-2sm hover:text-zinc-400">
                WEB RESUME
            </a>
            <a href="https://www.linkedin.com/in/ayushmanchhabra/" rel="noreferrer" target="_blank" className="flex-2 mx-2 text-2sm hover:text-zinc-400">
                LINKEDIN
            </a>
            <a href="https://github.com/ayushmanchhabra/" rel="noreferrer" target="_blank" className="flex-2 mx-2 text-2sm hover:text-zinc-400">
                GITHUB
            </a>
            {/* FIXME
            <a href="/blog" className="flex-2 mx-2 text-2sm hover:text-zinc-400">
                BLOG
            </a> */}
        </nav>
    );
}