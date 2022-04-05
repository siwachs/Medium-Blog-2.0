import Link from 'next/link'

function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 z-10 border-b-[1px] border-black bg-blue-200 p-4 text-sm lg:p-3 xl:p-4">
      {/* Container */}
      <div className="mx-auto flex items-center justify-between md:max-w-3xl lg:max-w-4xl">
        {/* Logo */}
        <div className="flex items-center space-x-5">
          <div>
            <Link href="/">
              <img
                className="w-36 cursor-pointer object-contain lg:w-40 xl:w-48"
                alt=""
                src="/logo.svg"
              ></img>
            </Link>
          </div>

          {/* Menu Mobile First Design*/}
          <div className="hidden items-center space-x-5 md:inline-flex">
            <h3 className="cursor-pointer font-semibold xl:text-lg">About</h3>
            <h3 className="cursor-pointer font-semibold xl:text-lg">Contact</h3>
            <h3 className="cursor-pointer rounded-full border border-white bg-black px-3 py-1 font-semibold text-white xl:text-lg">
              Follow
            </h3>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-5">
          <h3 className="hidden cursor-pointer text-sm font-semibold sm:inline-flex xl:text-lg">
            Sign In
          </h3>
          <h3 className="cursor-pointer rounded-full border border-white bg-black px-3 py-2 text-sm font-semibold text-white xl:text-lg">
            Get started
          </h3>
        </div>
      </div>
    </header>
  )
}

export default Header
