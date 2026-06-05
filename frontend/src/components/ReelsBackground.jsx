export default function ReelsBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/reel1.mp4" type="video/mp4" />
      </video>
      

      <div className="absolute inset-0 bg-black/60"></div>

    </div>
  );
}