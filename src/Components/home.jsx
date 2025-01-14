import React, { useState, useEffect } from "react";
import moment from "moment-timezone"; // Import moment-timezone
import { Plus, Filter, Search } from "lucide-react";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import "./home.css";
import { Users, PlusCircle, Activity } from "lucide-react"; // Import icons

const Home = () => {
  const [suppliersData, setSuppliersData] = useState([]); // State to store suppliers
  const [filters, setFilters] = useState({
    product: "All Productions", // Match the dropdown option
    classification: "All classifications", // Match the dropdown option
    location: "All Locations", // Match the dropdown option
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination

  // Fetch suppliers from the backend
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("http://193.203.162.228:5000/api/suppliers");
      const data = await response.json();
      console.log("Fetched suppliers:", data); // Debugging
      setSuppliersData(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleCreateClick = () => setIsFormVisible(true);
  const handleFormClose = () => setIsFormVisible(false);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const newSupplier = {
      email: formData.get("email") || "N/A",
      category: formData.get("category") || "N/A",
      classification: formData.get("classification") || "N/A",
      companyName: formData.get("companyName") || "N/A",
      address: formData.get("address") || "N/A",
      location: formData.get("location") || "N/A",
      account: formData.get("account") || "N/A",
      contactPerson: formData.get("contactPerson") || "N/A",
      contactNumber: formData.get("contactNumber") || "N/A",
      contactEmail: formData.get("contactEmail") || "N/A",
      website: formData.get("website") || "N/A",
    };
  
    console.log("Form Data:", newSupplier); // Debugging
  
    try {
      const response = await fetch("http://193.203.162.228:5000/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSupplier),
      });
      const data = await response.json();
      setSuppliersData([data, ...suppliersData]);
      setIsFormVisible(false);
      event.target.reset();
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  const filteredData = suppliersData.filter((supplier) => {
    const matchesSearchTerm = Object.values(supplier).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      matchesSearchTerm &&
      (filters.product === "All Productions" || supplier.category === filters.product) &&
      (filters.classification === "All classifications" ||
        supplier.classification === filters.classification) &&
      (filters.location === "All Locations" || supplier.location === filters.location)
    );
  });

  // Calculate the range of rows to display
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  // Get unique values for filters
  const categories = [
    "All Productions",
    "Solar Panels",
    "Inverters",
    "Mounting Structures",
    "Batteries",
    "Solar Cables",
    "AC Cables",
    "Circuit Breakers",
    "Distribution Boxes",
    "Diesel Generator",
    "Transformer",
    "Trader - Multiple Solar Products",
    "Trader - Multiple Electrical Products",
    "3D Printer",
    "Silo",
    "Air Purifier",
    "Automatic Gate Opener",
    "Drilling Machine",
    "Garage & Door Remote Controller",
    "Dam Easy Door Barrier",
    "Home Alarm Systems",
    "Power Bank",
    "Smart Devices",
    "Fire Alarm System",
    "Portable Hand Wash Station",
    "USB",
    "Pool LED Light",
    "LED Lights",
    "USB Flash Drive, Phone Charger Cable, Wireless Charger, Earbuds, Drinkware, Cutlery",
    "Weather Station, Wind Speed Sensor, Wind Direction Sensor, Air Temperature Humidity Sensor, Solar Radiation Sensor, Liquid Sensor, Soil Sensor, Water Quality Sensor",
    "Vacuum Cleaner",
    "Coxial Cable, LAN Cable, CCTV Cable (Siamese cable), Security Cable, Alarm Cable, Fire Alarm Cable, Telephone Cable, Speaker Cable, Combo Cable, Control Cable",
    "DTH Drilling Rig, Water Well Drilling Rig, Drilling Bits, Drilling Rod, Mud Pump, Screw Air Compressor, Air Compressor for Drilling Rig, Mining Air Compressor, Piston Air Compressor, Oil Free Air Compressor",
    "Handheld Megaphone, Drone Megaphone, IR Extender, Aroma Diffuser",
    "UVC Devices",
    "Smart Data Logger",
    "Solar Freezer",
    "ICT Products",
    "Digital Door Lock",
    "Festoon Light (Decorative Lights)",
    "Foldable Container House, Portable Container Toilet",
    "UTP Cables and Others",
    "Warehouse Racks",
    "Metal Drilling Machine",
    "Steel Pool",
    "Wires (THHN)",
    "AVR",
    "Terminal Lugs",
    "Steel Pipes",
    "HDPE Pipes",
    "Wide Flange",
    "Laptop",
    "Transformer, Steel Poles, Diesel Generator, Wires (THHN), AVR, Solar Streetlights, Circuit Breaker, Terminal Lugs, Lead Acid Battery",
    "Transformer, Diesel Generator, Wires (THHN), AVR, Solar Streetlights, Circuit Breaker, Lead Acid Battery",
    "Transformer, Steel Poles, Diesel Generator, Wires (THHN), Circuit Breaker, Terminal Lugs",
    "AVR, Circuit Breaker",
    "Transformer, Steel Poles, Diesel Generator, Wires (THHN), Laptop, AVR, Solar Streetlights, Circuit Breaker, Terminal Lugs, Lead Acid Battery",
    "Sugarcane Machine",
    "Coxial Cable, UTP Cable, Fiber Optic Cable, Alarm Cable",
    "Metal Cutting Machine",
    "Water Pump",
    "LED Display",
    "SMART LED Bulb",
    "SMART Plug",
    "Mobile Trailer",
    "Trucks and Equipment",
    "Steel Structure",
    "Biogas",
    "Floating Solar",
    "Hydroponics",
    "Electric Vehicle",
    "Electrical Equipments",
    "Computer Peripherals and Equipments",
    "Fire Detection and Alarm System",
    "CCTV Equipments",
    "Audio Visual Solutions",
    "Biometric and Door Access Solutions",
    "Security and Technology Solutions Inc.",
    "Networking Devices",
    "IoT products"
  ];

  const classifications = [
    "All classifications",
    ...new Set(suppliersData.map((s) => s.classification)),
  ];
  const locations = [
    "All Locations",
    "Luzon",
    "Visayas",
    "Mindanao",
    "China",
    "Taiwan",
    "India",
    "U.S",
    "Hongkong",
    "South Korea",
    ...new Set(suppliersData.map((s) => s.location)),
  ];

  // Function to truncate long text
  const truncateText = (text, maxLength = 50) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="supplier-master-list-wrapper1">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="supplier-content1">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total-icon">
              <Users className="w-8 h-8" /> {/* Icon for Total Suppliers */}
            </div>
            <div className="stat-content">
              <h3>TOTAL SUPPLIERS</h3>
              <p>{suppliersData.length}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon new-icon">
              <PlusCircle className="w-8 h-8" /> {/* Icon for New Suppliers */}
            </div>
            <div className="stat-content">
              <h3>NEW SUPPLIERS</h3>
              <p>
                {
                  suppliersData.filter((supplier) =>
                    moment(supplier.timestamp).isAfter(
                      moment().subtract(30, "days")
                    )
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="content-header">
            <div className="search-filters">
              <div className="search-box">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filters-group">
                <select
                  className="filter-select"
                  value={filters.product}
                  onChange={(e) => handleFilterChange("product", e.target.value)}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category === "Category" ? category : truncateText(category)}
                    </option>
                  ))}
                </select>

                <select
                  className="filter-select"
                  value={filters.classification}
                  onChange={(e) =>
                    handleFilterChange("classification", e.target.value)
                  }
                >
                  {classifications.map((classification, index) => (
                    <option key={index} value={classification}>
                      {classification}
                    </option>
                  ))}
                </select>

                <select
                  className="filter-select"
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                >
                  {locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <button className="create-button" onClick={handleCreateClick}>
                  <Plus className="w-5 h-5" />
                  <span>Add Supplier</span>
                </button>
              </div>
            </div>
          </div>

          {/* Row Selector */}
          <select
            className="filter-select2"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value={5}>Show 5</option>
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
            <option value={50}>Show 50</option>
          </select>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Email</th>
                  <th>Category</th>
                  <th>Classification</th>
                  <th>Company Name</th>
                  <th>Address</th>
                  <th>Location</th>
                  <th>Account</th>
                  <th>Contact Person</th>
                  <th>Contact Number</th>
                  <th>Contact Email</th>
                  <th>Website</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((supplier, index) => {
                  // Handle invalid or missing timestamp
                  const formattedTimestamp = supplier.timestamp
                    ? new Date(supplier.timestamp).toLocaleString("en-US", {
                        timeZone: "Asia/Manila",
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                      })
                    : "N/A"; // Fallback for invalid or missing timestamp

                  return (
                    <tr key={index}>
                      <td>{formattedTimestamp}</td>
                      <td>{supplier.email || "N/A"}</td>
                      <td>{supplier.category || "N/A"}</td>
                      <td>
                        <span className={`${supplier.classification?.toLowerCase()}-text`}>
                          {supplier.classification || "N/A"}
                        </span>
                      </td>
                      <td>{supplier.companyName || "N/A"}</td>
                      <td>{supplier.address || "N/A"}</td>
                      <td>{supplier.location || "N/A"}</td>
                      <td>{supplier.account || "N/A"}</td>
                      <td>{supplier.contactPerson || "N/A"}</td>
                      <td>{supplier.contactNumber || "N/A"}</td>
                      <td>{supplier.contactEmail || "N/A"}</td>
                      <td>
                        {supplier.website ? (
                          <a
                            href={supplier.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="website-link"
                          >
                            Visit Site
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Records Display */}
            <div className="records-display">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of{" "}
              {filteredData.length} records
            </div>
          </div>
        </div>

        {isFormVisible && (
          <div className="modal-backdrop">
            <div className="modal-container">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Create New Supplier</h3>
                  <button
                    className="modal-close-button"
                    onClick={handleFormClose}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleFormSubmit}>
                  <div className="modal-body">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Classification:</label>
                        <select name="classification" className="form-input">
                          <option value="">Select Classification</option>
                          <option value="Import">Import</option>
                          <option value="Local">Local</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Category:</label>
                        <select name="category" className="form-input">
                          {categories.map((category, index) => (
                            <option key={index} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Name of the Company:</label>
                        <input type="text" name="companyName" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Address:</label>
                        <textarea name="address" className="form-input"></textarea>
                      </div>
                      <div className="form-group">
                        <label>Location:</label>
                        <select name="location" className="form-input">
                          <option value="">Select Location</option>
                          <option value="Luzon">Luzon</option>
                          <option value="Visayas">Visayas</option>
                          <option value="Mindanao">Mindanao</option>
                          <option value="China">China</option>
                          <option value="Taiwan">Taiwan</option>
                          <option value="India">India</option>
                          <option value="U.S">U.S</option>
                          <option value="Hongkong">Hongkong</option>
                          <option value="South Korea">South Korea</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Account:</label>
                        <select name="account" className="form-input">
                          <option value="">Select Account</option>
                          <option value="Wechat">Wechat</option>
                          <option value="Whatsapp">Whatsapp</option>
                          <option value="Messenger">Messenger</option>
                          <option value="Viber">Viber</option>
                          <option value="Cellphone">Cellphone</option>
                          <option value="Telegram">Telegram</option>
                          <option value="Skype">Skype</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Contact Person:</label>
                        <input type="text" name="contactPerson" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Contact Number:</label>
                        <input type="text" name="contactNumber" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Contact Email:</label>
                        <input type="email" name="contactEmail" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Website:</label>
                        <input type="url" name="website" className="form-input" />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      onClick={handleFormClose}
                      className="button-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="button-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;