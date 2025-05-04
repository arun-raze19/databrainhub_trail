import React from "react";
import Particles from "react-tsparticles"; // make sure this is installed: npm install react-tsparticles

const milestones = [
  { year: "2021", message: "Admission Started For Artificial Intelligence and Data Science!", top: "300px", left: "35%", position: "right" },
  { year: "2022", message: "First batch of AI&DS Started with the intake of 60 Students", top: "800px", left: "55%", position: "left" },
  { year: "2023", message: "Second  batch of AI&DS Started with the intake of 60 Students", top: "1300px", left: "35%", position: "right" },
  { year: "2024", message: "Third batch of AI&DS Started with the intake of 120 Students", top: "1800px", left: "55%", position: "left" },
  { year: "2025", message: "Looking ahead!", top: "2300px", left: "40%", position: "right" },
];

const Roadmap = () => {
  return (
    <div style={styles.container}>
      {/* Particles Effect */}
      <Particles
        options={{
          fullScreen: { enable: false },
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.3,
            },
            size: {
              value: 3,
            },
            links: {
              enable: false,
            },
          },
        }}
        style={styles.particles}
      />

      {/* Gradient Overlay */}
      <div style={styles.overlay}></div>

      {/* Snake-like Path using SVG */}
      <svg style={styles.snakePath} viewBox="0 0 100 3000" preserveAspectRatio="none">
        <path
          d="
            M50 0
            Q75 150, 50 300
            Q25 450, 50 600
            Q75 750, 50 900
            Q25 1050, 50 1200
            Q75 1350, 50 1500
            Q25 1650, 50 1800
            Q75 1950, 50 2100
            Q25 2250, 50 2400
            Q75 2550, 50 2700
            Q25 2850, 50 3000
          "
          stroke="white"
          strokeDasharray="10,10"
          fill="transparent"
          strokeWidth="3"
        />
      </svg>

      {/* Milestones */}
      {milestones.map((item, index) => (
        <div
          key={index}
          style={{
            ...styles.milestone,
            top: item.top,
            left: item.left,
            animation: `fadeInUp 1s ease forwards`,
            animationDelay: `${index * 0.5}s`,
            opacity: 0,
          }}
        >
          <div>{item.year}</div>
          {/* Message displayed beside the circle */}
          <div style={{ ...styles.message, [item.position]: "100%" }}>
            {item.message}
          </div>
        </div>
      ))}
    </div>
  );
};

// Keyframes
const injectKeyframes = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
};
injectKeyframes();

const styles = {
  container: {
    width: "100%",
    height: "3000px",
    overflowX: "hidden",
    overflowY: "auto",
    position: "relative",
   
  },
  particles: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "3000px",
    zIndex: 1,
  },
  snakePath: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100px",
    height: "3000px",
    zIndex: 2,
  },
  milestone: {
    position: "absolute",
    width: "120px",
    height: "120px",
    background: "gold",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    zIndex: 3,
    cursor: "pointer",
    flexDirection: "column", // to display year and message vertically
    textAlign: "center",
  },
  message: {
    fontSize: "20px",
    marginTop: "10px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    maxWidth: "700px", // optional: expand width if needed
    whiteSpace: "normal", // allow wrapping
    overflow: "visible",  // show full text
     // optional: dark background for better contrast
    color: "#fff",         // optional: ensure readability
    padding: "10px",       // optional: add spacing
    borderRadius: "10px",  // optional: rounded corners
    zIndex: 3,
  }
  
};

export default Roadmap;
