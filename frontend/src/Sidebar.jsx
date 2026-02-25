import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import logo from "./assets/logo-512.png";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [groupedData, setGroupedData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080");
    setGroupedData(response.data.section);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetch("/SidebarContent.txt")
  //     .then((res) => res.text())
  //     .then((rawText) => {
  //       const lines = rawText
  //         .split("\n")
  //         .map((l) => l.trim())
  //         .filter((l) => l !== "");

  //       const result = [];
  //       let currentSection = null;

  //       for (let i = 0; i < lines.length; i++) {
  //         const currentLine = lines[i];
  //         const nextLine = lines[i + 1];
  //         const isNextNumber = nextLine && !isNaN(nextLine);

  //         if (isNextNumber) {
  //           // It's a content/number pair - add to the current section
  //           if (currentSection) {
  //             currentSection.items.push({
  //               content: currentLine,
  //               number: nextLine,
  //             });
  //           }
  //           i++;
  //         } else {
  //           // It's a new Topic - create a new section object
  //           currentSection = { topic: currentLine, items: [] };
  //           result.push(currentSection);
  //         }
  //       }
  //       setGroupedData(result);
  //     });
  // }, []);

  return (
    <div className="w-screen flex bg-slate-900">
      <div
        className={`flex transition-transform duration-500 ease-in-out ${
          expanded ? "translate-x-0" : "-translate-x-80"
        }`}
      >
        <aside
          className={`flex justify-left h-screen w-80 bg-zinc-800 px-3 transform overflow-y-auto
        }`}
        >
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
              <button className="text-white hover:underline p-0 bg-dark border-none">
                Show all
              </button>
              <button className="text-white hover:underline p-0 bg-transparent border-none">
                Hide all
              </button>
            </div>
            <div>
              <form className="max-w-md mx-auto bg-gray-400 rounded-lg">
                <label
                  for="search"
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
              {groupedData?.map((section, index) => (
                <div key={index}>
                  <p className="text-white">{section.title}</p>
                </div>
                // <div key={index}>{Data(section.title, section.submenu)}</div>
              ))}
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
    </div>
  );
}

function Data(topic, datas) {
  return (
    <>
      {/* <button className="text-white mx-1">
        {topic}
      </button> */}
      <div className="flex gap-2">
        {/* Hidden checkbox acts as the state holder */}
        <input type="checkbox" id="strike-toggle" className="peer hidden" />
        <label
          htmlFor="strike-toggle"
          className="text-white cursor-pointer px-1 peer-checked:line-through"
        >
          {topic}
        </label>
      </div>
      <ul className="grid grid-cols-2">
        {datas.map((data, i) => (
          <button
            key={i}
            className="flex justify-between bg-gray-700 rounded-lg px-1 m-1 gap-2"
          >
            <p className="truncate">{data.content}</p>
            <p>{data.text}</p>
          </button>
        ))}
      </ul>
    </>
  );
}

// export function SidebarItem({ icon, text, active, alert }) {
//   const { expanded } = useContext(SidebarContext);

//   return (
//     <li
//       className={`
//         relative flex items-center py-2 px-3 my-1
//         font-medium rounded-md cursor-pointer
//         transition-colors group
//         ${
//           active
//             ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
//             : "hover:bg-indigo-50 text-gray-600"
//         }
//     `}
//     >
//       {icon}
//       <span
//         className={`overflow-hidden transition-all ${
//           expanded ? "w-52 ml-3" : "w-0"
//         }`}
//       >
//         {text}
//       </span>
//       {alert && (
//         <div
//           className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
//             expanded ? "" : "top-2"
//           }`}
//         />
//       )}

//       {!expanded && (
//         <div
//           className={`
//           absolute left-full rounded-md px-2 py-1 ml-6
//           bg-indigo-100 text-indigo-800 text-sm
//           invisible opacity-20 -translate-x-3 transition-all
//           group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
//       `}
//         >
//           {text}
//         </div>
//       )}
//     </li>
//   );
// }

{
  /* 
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
              </div>
              <MoreVertical size={20} />
            </div>
          </div> */
}
