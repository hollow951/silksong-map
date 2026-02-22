import Bar from "./Bar/ComponentBar";
import { useState } from "react";
import SidebarBtn from "./assets/arrow-circle-left-svgrepo-com.svg";

function App() {
  const [show, setShow] = useState(true);

  return (
    <div className="d-flex">
      {show && <Bar />}
      <div className="flex-fill p-4 position-relative" style={{ height: "300px" }}>
        <button
          className="btn btn-primary btn-sidebar bg-transparent text-body border-0 position-absolute top-0 start-0"
          onClick={() => setShow(!show)}
        >
          <img src={SidebarBtn} alt="My picture" width={40} />
        </button>
        <h1>Main Content</h1>
      </div>
    </div>
  );
}

export default App;
