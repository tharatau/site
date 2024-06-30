import React from "vsx";

import "./main.css";

function App (): Element {
    
    return (
        <div style={{
            height: '100%',
            width: '100%',
            margin: '10px'
        }}>
            <h3>Ayushman Chhabra</h3>
            <p>
                Economics student turned software developer turned security analyst.
            </p>
            <p>
                Interested in music, literature and fitness.
            </p>
            <p>
                Occassionally touches grass.
            </p>
        </div>
    );
}

document.getElementById("root")?.appendChild(<App />);
