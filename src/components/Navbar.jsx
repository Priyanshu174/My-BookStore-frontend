import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  var links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },

    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const [Nav, setNav] = useState("hidden");
  if (isLoggedIn === false) {
    links.splice(2);
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }
  if (role === "admin") {
    links.splice(3, 1);
  }

  return (
    <>
      <nav
        className="relative flex w-full flex-nowrap items-center justify-between text-black py-2 font-semibold  lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="ms-2  w-3/6 lg:w-1/6">
            <Link
              to="/"
              className="flex text-2xl font-semibold items-center justify-center hover:scale-105 transition-all duration-200 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="none"
                viewBox="0 0 40 40"
                className=" mx-2"
              >
                <path
                  fill="#F06225"
                  d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"
                ></path>
                <path
                  fill="#F06225"
                  d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                ></path>
              </svg>{" "}
              BookHeaven
            </Link>
          </div>
          <div className=" w-1/6 block  lg:hidden">
            <button
              className="block border-0 bg-transparent px-2  hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0  lg:hidden"
              type="button"
              onClick={() => setNav(Nav === "hidden" ? "block" : "hidden")}
            >
              <span className="[&>svg]:w-7 [&>svg]:stroke-white ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
                </svg>
              </span>
            </button>
          </div>

          <div className="5/6 hidden lg:block">
            <div className="flex items-center">
              {links.map((items, i) => (
                <>
                  {items.title === "Profile" ||
                  items.title === "Admin Profile" ? (
                    <div
                      className=" rounded  hover:cursor-pointer font-normal   hover:scale-105 px-3 py-1 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300  bg-orange-600"
                      key={i}
                    >
                      <Link to={`${items.link}`} className="text-normal">
                        {items.title}
                      </Link>
                    </div>
                  ) : (
                    <div
                      className="mx-3 hover:text-orange-600  rounded transition-all duration-300 hover:cursor-pointer"
                      key={i}
                    >
                      <Link to={`${items.link}`} className="text-normal">
                        {items.title}{" "}
                      </Link>
                    </div>
                  )}
                </>
              ))}
              {isLoggedIn === false && (
                <>
                  <Link
                    to="/login"
                    className="rounded border hover:scale-105  border-orange-600 px-3 py-1 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-200"
                  >
                    LogIn
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded font-normal hover:scale-105   bg-orange-600 px-3 py-1 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-200"
                  >
                    SignUp
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className={`5/6 ${Nav} lg:hidden bg-zinc-800  text-white px-12`}>
        <div className="flex flex-col items-center">
          {links.map((items, i) => (
            <>
              {items.title === "Profile" || items.title === "Admin Profile" ? (
                <div
                  className=" rounded  hover:cursor-pointer border border-orange-600 px-3 py-1 my-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
                  key={i}
                >
                  <Link
                    to={`${items.link}`}
                    className="text-normal"
                    onClick={() => setNav("hidden")}
                  >
                    {items.title}
                  </Link>
                </div>
              ) : (
                <div
                  className="mx-3 hover:text-blue-300  rounded transition-all duration-300 hover:cursor-pointer my-3"
                  key={i}
                >
                  <Link
                    to={`${items.link}`}
                    className="text-normal"
                    onClick={() => setNav("hidden")}
                  >
                    {items.title}{" "}
                  </Link>
                </div>
              )}
            </>
          ))}
          {isLoggedIn === false && (
            <>
              <Link
                to="/login"
                className="rounded border border-orange-600 px-3 py-1 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
              >
                LogIn
              </Link>
              <Link
                to="/signup"
                className="rounded  bg-orange-600 px-3 py-1 my-4 md:my-0 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
