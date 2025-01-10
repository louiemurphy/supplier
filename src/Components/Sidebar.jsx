import React from "react";
import { Home, Users, Settings, HelpCircle } from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h3>Supply Chain</h3>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item active">
            <Home className="nav-icon" />
            <span>Dashboard</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
