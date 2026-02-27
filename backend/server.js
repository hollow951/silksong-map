import express from "express";
import cors from "cors";
const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  console.log("call data");
  res.json({
    section: [
      {
        title: "Points of Interest",
        submenu: [
          { icon: "", content: "NPC", text: "146" },
          { icon: "", content: "Plasmium Cocoon", text: "4" },
          { icon: "", content: "Point of Interest", text: "11" },
          { icon: "", content: "Void Mass", text: "47" },
        ],
      },
      {
        title: "Locations",
        submenu: [
          { icon: "", content: "Bellway Station", text: "12" },
          { icon: "", content: "Bench", text: "81" },
          { icon: "", content: "Vendor", text: "23" },
          { icon: "", content: "Ventrica Station", text: "7" },
        ],
      },
      {
        title: "Collectibles",
        submenu: [
          { icon: "", content: "Arcane Egg", text: "1" },
          { icon: "", content: "Bone Scroll", text: "4" },
          { icon: "", content: "Choral Commandment", text: "4" },
          { icon: "", content: "Lost Flea", text: "30" },
          { icon: "", content: "Mask Shard", text: "20" },
          { icon: "", content: "Memento", text: "11" },
          { icon: "", content: "Memory Locket", text: "20" },
          { icon: "", content: "Psalm Cylinder", text: "6" },
          { icon: "", content: "Rune Harp", text: "3" },
          { icon: "", content: "Silk Heart", text: "3" },
          { icon: "", content: "Spool Fragment", text: "18" },
          { icon: "", content: "Weaver Effigy", text: "3" },
        ],
      },
      {
        title: "Items",
        submenu: [
          { icon: "", content: "Area Map", text: "29" },
          { icon: "", content: "Craftmetal", text: "8" },
          { icon: "", content: "Rosary", text: "107" },
          { icon: "", content: "Rosary String", text: "34" },
          { icon: "", content: "Shard Bundle", text: "22" },
          { icon: "", content: "Shell Shards", text: "79" },
          { icon: "", content: "Silkeater", text: "10" },
        ],
      },
      {
        title: "Equipment",
        submenu: [
          { icon: "", content: "Ability", text: "11" },
          { icon: "", content: "Crest", text: "6" },
          { icon: "", content: "Silk Skill", text: "6" },
          { icon: "", content: "Tool", text: "56" },
          { icon: "", content: "Upgrade", text: "15" },
        ],
      },
      {
        title: "Enemies",
        submenu: [
          { icon: "", content: "Arena Battle", text: "30" },
          { icon: "", content: "Boss", text: "46" },
          { icon: "", content: "Journal Entry", text: "237" },
        ],
      },
      {
        title: "Quests",
        submenu: [
          { icon: "", content: "Objective", text: "21" },
          { icon: "", content: "Quest Item", text: "69" },
          { icon: "", content: "Wish", text: "48" },
        ],
      },
      {
        title: "Other",
        submenu: [
          { icon: "", content: "Achievement", text: "52" },
          { icon: "", content: "Breakable Surface", text: "216" },
          { icon: "", content: "Easter Egg", text: "5" },
          { icon: "", content: "Lever", text: "58" },
          { icon: "", content: "Locked Door", text: "90" },
          { icon: "", content: "Lore", text: "80" },
          { icon: "", content: "Miscellaneous", text: "117" },
          { icon: "", content: "Needolin Door", text: "5" },
          { icon: "", content: "Shortcut", text: "25" },
          { icon: "", content: "Silk Wall", text: "2" },
        ],
      },
    ],
  });
});

app.listen(8080, () => {
  console.log("Port 8080");
});
