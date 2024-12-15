import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Links from "./links/Links";
import "./sidebar.scss";
import ToggleButton from "./toggleButton/ToggleButton";

const variants = {
  open: {
    clipPath: "circle(1200px at 50px 50px)",
    transition: {
      type: "spring",
      stiffness: 20,
    },
  },
  closed: {
    clipPath: "circle(30px at 50px 50px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};


const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(); // Create a ref for the sidebar
    
  useEffect(() => {
    // Function to detect clicks outside the sidebar
    const handleClickOutside = (event) => {
        console.log("event.target==>"+event);
        console.log("Side Bar ref ===>"+sidebarRef.current.contains(event.target));
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setOpen(false); // Close the sidebar if clicked outside
        }
    };

    // Add event listener for clicks on the document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);
  return (
    <motion.div className="sidebar" ref={sidebarRef}  animate={open ? "open" : "closed"}>
      <motion.div className="bg" variants={variants}>
        <Links />
      </motion.div>
      <ToggleButton setOpen={setOpen} />
    </motion.div>
  );
};

export default Sidebar;
