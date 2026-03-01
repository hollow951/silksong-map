import Sidebar from "./Sidebar.jsx";
import Map from "./map.jsx";

export default function App() {
  return (
    <div>
      <div className="relative overflow-hidden">
        <Map />
      </div>
      <div className="absolute left-0 top-0">
        <Sidebar />
      </div>
    </div>
  );
}
