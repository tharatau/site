export default function Menu() {
    return (
        <nav className="h-14 w-full text-lg flex flex-column items-center content-center">
            <a href="/" className="flex-1 mx-2 hover:text-zinc-400">
                AC
            </a>
            <a href="#" className="flex-2 mx-2 text-2sm hover:text-zinc-400">
                RESUME
            </a>
            <a href="#" className="flex-2 mx-2 text-2sm hover:text-zinc-400">
                PROJECTS
            </a>
            <a href="/blog" className="flex-2 mx-2 text-2sm hover:text-zinc-400">
                BLOG
            </a>
        </nav>
    );
}