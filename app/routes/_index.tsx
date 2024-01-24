import Profile from "~/content/profile.jpeg";

export default function Index() {
  return (
    <div className="">
      <nav className="h-14 w-full text-lg flex flex-column items-center content-center">
        <span className="flex-1 mx-2">
          AC
        </span>
        <a href="#" className="flex-2 mx-2 text-2sm hover:text-zinc-400">
          RESUME
        </a>
        <a href="#" className="flex-2 mx-2 text-2sm hover:text-zinc-400">
          PROJECTS
        </a>
        <a href="#" className="flex-2 mx-2 text-2sm hover:text-zinc-400">
          BLOG
        </a>
      </nav>

      <section className="grid grid-rows-2 md:grid-cols-2 gap-2 m-4 flex items-center justify-center">
        <img
          alt="Profile"
          className="h-72 w-72 md:h-96 md:w-96 rounded-full m-5"
          src={Profile}
        />

        <div>
          <span className="text-6xl m-5">
            Software Developer
          </span>

          <br /><br />

          <span className="text-3xl text-zinc-600">
            I build highly <b>responsive</b>, <b>accessible</b> and <b>performant</b> websites.
          </span>

          <br /><br />

          <span className="text-3xl text-zinc-600">
            I am <b>product focused</b> and possess in-depth knowledge and intuition of <b>web fundamentals</b>.
          </span>

          <br /><br />

          <span className="text-3xl text-zinc-600">
            Shoot me an <a href="mailto:info@ayushmanchhabra.com" className="underline hover:text-zinc-400">email</a> if you think we should meet.
          </span>
        </div>
      </section>
    </div>
  );
}
