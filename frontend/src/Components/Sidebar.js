import React, { useState } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)}>Toggle Sidebar</button>
            {isOpen && (
                <>
                    <div className="overlay" onClick={() => setIsOpen(false)}/>
                    <aside className="sidebar">
                        <h2>Sidebar</h2>
                        <nav>
                            <a href="#">Home</a>
                            <a href="#">About</a>
                            <a href="#">Contact</a>
                        </nav>
                    </aside>
                </>
            )}
        </>
    );
};

export default Sidebar;
