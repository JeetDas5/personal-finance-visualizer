import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = ["Home", "Transactions", "Budgets", "Analytics", "Insights"];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
        <div className="text-2xl font-bold text-blue-600">
          Finance DashBoard
        </div>

        <div className="hidden md:flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 py-2 rounded-full font-medium cursor-pointer transition ${
                activeTab === tab.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Open */}
      {menuOpen && (
        <div className="flex flex-col items-center gap-4 py-4 md:hidden bg-white shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab.toLowerCase());
                setMenuOpen(false); // Close menu after click
              }}
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeTab === tab.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
