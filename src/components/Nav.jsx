import gsap from "gsap";
import { useRef, useState, useEffect, createRef } from "react";
import Toggle from "./Toggle";
import { FaSearch } from "react-icons/fa";

const Nav = () => {
  const items = [
    {
      name: "Home",
      color: "#f44336",
      href: "#",
    },
    {
      name: "About",
      color: "#e91e63",
      href: "#",
    },
    {
      name: "Be a writer",
      color: "#9c27b0",
      href: "#",
    },
    {
      name: "Talk to us",
      color: "#673ab7",
      href: "#",
    },
    // {
    //   name: "Interface",
    //   color: "#3f51b5",
    //   href: "#",
    // },
  ];
  //   const Menu = ({items}) => {
  const $root = useRef();
  const $indicator1 = useRef();
  const $indicator2 = useRef();
  const $items = useRef(items.map(createRef));
  const [active, setActive] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const animate = () => {
    const menuOffset = $root.current.getBoundingClientRect();
    const activeItem = $items.current[active].current;
    const { width, height, top, left } = activeItem.getBoundingClientRect();

    const settings = {
      x: left - menuOffset.x,
      y: top - menuOffset.y,
      width: width,
      height: height,
      backgroundColor: items[active].color,
      ease: "elastic.out(.7, .7)",
      duration: 0.8,
    };

    gsap.to($indicator1.current, {
      ...settings,
    });

    gsap.to($indicator2.current, {
      ...settings,
      duration: 1,
    });
  };

  useEffect(() => {
    animate();
    window.addEventListener("resize", animate);

    return () => {
      window.removeEventListener("resize", animate);
    };
  }, [active]);
  const toggleDarkModes = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
    // document.documentElement.classList.toggle("dark");
    console.log("Dark Mode State:", !darkMode);
    console.log("html Element Classes:", document.documentElement.classList);
  };

  // const openSearch = () => {
  //   setSearchOpen((prev) => !prev);
  // };
  return (
    <div className=" flex items-center justify-between bg-emerald-200 dark:bg-yellow-400 px-12 py-3">
      <div className="">
        <h1 className=" dark:text-red-600">LOGO</h1>
      </div>
      <div ref={$root} className="menu">
        {items.map((item, index) => (
          <a
            key={item.name}
            ref={$items.current[index]}
            className={`item ${active === index ? "active" : ""}`}
            onMouseEnter={() => {
              setActive(index);
            }}
            href={item.href}
          >
            {item.name}
          </a>
        ))}
        <div ref={$indicator1} className="indicator" />
        {/* <div ref={$indicator2} className="indicator" /> */}
      </div>
      {/*  */}
      <div className=" flex items-center gap-4">
        {/* <div>toggle</div> */}
        <div
          className=" border border-black rounded-full px-1 py-1"
          onClick={toggleDarkModes}
        >
          <Toggle />
        </div>
        <div
          className="  border relative border-black rounded-full cursor-pointer px-2 bg-white py-2"
          onClick={() => setSearchOpen((prevMode) => !prevMode)}
        >
          <FaSearch className=" w-3 h-3" />
        </div>
        {/*  */}
        {searchOpen && (
          <div className=" w-[300px]  rounded-xl absolute top-14 right-14 z-50 px-4 py-4 shadow-md shadow-emerald-500  bg-slate-500">
            <h1>Search Topics</h1>
            <div className=" flex items-center gap-4 mt-4">
              <input
                type="search"
                name="search"
                placeholder="Enter Keyword"
                className=" bg-transparent outline-none border border-gray-400 rounded-3xl px-3 py-2"
              />
              <div className=" bg-black px-2 py-2 rounded-lg ">
                <FaSearch className=" text-white" />
              </div>
            </div>
          </div>
        )}
        <div>toggle</div>
      </div>
    </div>
  );
};

export default Nav;
