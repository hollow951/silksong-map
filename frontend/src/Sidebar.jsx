import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import logo from "./assets/logo-512.png";

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [groupedData, setGroupedData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080");
    setGroupedData(response.data.section);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showAll = () => {
    const updated = {};
    groupedData.forEach((section) => {
      updated[section.title] = {};
      section.submenu.forEach((item) => {
        updated[section.title][item.content] = false;
      });
    });
    setCheckedItems(updated);
  };

  const hideAll = () => {
    const updated = {};
    groupedData.forEach((section) => {
      updated[section.title] = {};
      section.submenu.forEach((item) => {
        updated[section.title][item.content] = true;
      });
    });
    setCheckedItems(updated);
  };

  const toggleItem = (sectionTitle, itemContent) => {
    setCheckedItems((prev) => ({
      ...prev,
      [sectionTitle]: {
        ...prev[sectionTitle],
        [itemContent]: !prev[sectionTitle]?.[itemContent],
      },
    }));
  };

  const toggleSection = (section) => {
    const allChecked = section.submenu.every(
      (item) => checkedItems[section.title]?.[item.content],
    );

    const updatedSection = {};

    section.submenu.forEach((item) => {
      updatedSection[item.content] = !allChecked;
    });

    setCheckedItems((prev) => ({
      ...prev,
      [section.title]: updatedSection,
    }));
  };

  const Data = ({ groupedData }) => {
    return groupedData.map((section, index) => {
      const allChecked = section.submenu.every(
        (item) => checkedItems[section.title]?.[item.content],
      );

      return (
        <div key={index}>
          <button
            onClick={() => toggleSection(section)}
            className={`text-white mx-1 `}
          >
            {section.title}
          </button>

          <ul className="grid grid-cols-2">
            {section.submenu.map((item, i) => {
              const isChecked =
                checkedItems[section.title]?.[item.content] || false;

              return (
                <li
                  key={i}
                  onClick={() => toggleItem(section.title, item.content)}
                  className={`flex justify-between bg-gray-700 rounded-lg px-1 m-1 gap-2 cursor-pointer
              ${isChecked ? "line-through opacity-50" : ""}`}
                >
                  <p className="truncate">{item.content}</p>
                  <p>{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <div
      className={`flex transition-transform duration-500 ease-in-out ${
        expanded ? "translate-x-0" : "-translate-x-80"
      }`}
    >
      <aside className="flex justify-start h-screen w-80 bg-zinc-800 px-3 overflow-y-auto">
        <nav className="h-full flex flex-col bg-dark shadow-sm space-y-3">
          <div className="p-4 pb-2 flex justify-between items-center">
            <a href="">
              <img src={logo} className={`hover w-75`} alt="" />
            </a>
          </div>
          <div className="flex text-center text-gray-300 text-lg">
            <p>Hollow Knight: Silksong Interactive Map</p>
          </div>
          <div className="flex justify-evenly space-x-2 mx-2">
            <a href="">
              <img src="" alt="" className="w-10 h-10 rounded-lg bg-dark" />
            </a>
            <a href="">
              <img src="" alt="" className="w-10 h-10 rounded-lg bg-dark" />
            </a>
            <a href="">
              <img src="" alt="" className="w-10 h-10 rounded-lg bg-dark" />
            </a>
          </div>
          <div className="flex justify-evenly border-y-1 border-white py-2">
            <button
              onClick={showAll}
              className="text-white hover:underline p-0 bg-dark border-none"
            >
              Show all
            </button>
            <button
              onClick={hideAll}
              className="text-white hover:underline p-0 bg-transparent border-none"
            >
              Hide all
            </button>
          </div>
          <div>
            <form className="max-w-md mx-auto bg-gray-400 rounded-lg">
              <label
                htmlFor="search"
                className="block mb-2.5 text-sm font-medium text-heading sr-only"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-body"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  className="block w-full p-3 ps-9 bg-neutral-secondary-medium 
                    border border-default-medium text-heading text-sm rounded-base 
                    focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                  placeholder="Search"
                  required
                />
                <button
                  type="button"
                  className="absolute end-1.5 bottom-1.5 text-white bg-slate-700
                    hover:bg-mist-900 box-border border border-none 
                    focus:ring-4 focus:ring-brand-medium shadow-xs 
                    font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div>
            <Data groupedData={groupedData} />
          </div>
        </nav>
      </aside>
      <button
        onClick={() => setExpanded((curr) => !curr)}
        className="border-1 flex justify-center items-center rounded-lg bg-gray-500 h-10 w-10 hover:border-white"
      >
        {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
      </button>
    </div>
  );
}
