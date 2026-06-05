function HowItWorks() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-5xl font-bold text-center mb-16 animated-heading ">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-5 mb-4">

          {/* Card 1 */}
          <div className="neon-card group">
            <span className="step">1</span>
            <h3>Share Campaign Brief</h3>
          </div>

          {/* Card 2 */}
          <div className="neon-card group">
            <span className="step">2</span>
            <h3>Creator Selection</h3>
          </div>

          {/* Card 3 */}
          <div className="neon-card group">
            <span className="step">3</span>
            <h3>Live Video Campaign</h3>
          </div>

          {/* Card 4 */}
          <div className="neon-card group">
            <span className="step">4</span>
            <h3>Results & Reporting</h3>
          </div>

        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .text-neon {
          color: #fff;
          text-shadow:
            0 0 5px #00f7ff,
            0 0 10px #00f7ff,
            0 0 20px #00f7ff,
            0 0 40px #00f7ff;
        }

        .neon-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 247, 255, 0.3);
          padding: 25px;
          border-radius: 16px;
          text-align: center;
          position: relative;
          transition: all 0.4s ease;
          cursor: pointer;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .neon-card h3 {
          margin-top: 15px;
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          transition: 0.3s;
        }

        .step {
          display: inline-block;
          font-size: 22px;
          font-weight: bold;
          color: #00f7ff;
          text-shadow: 0 0 10px #00f7ff;
        }

        .neon-card::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(0, 247, 255, 0.2),
            transparent
          );
          transform: rotate(0deg);
          transition: 0.5s;
        }

        .neon-card:hover::before {
          transform: rotate(180deg);
        }

        .neon-card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow:
            0 0 8px #00f7ff,
            0 0 8px #00f7ff,
            0 0 8px #00f7ff;
          border-color: #00f7ff;
        }

        .neon-card:hover h3 {
          color: #00f7ff;
        }
      `}</style>
    </div>
  );
}

export default HowItWorks;