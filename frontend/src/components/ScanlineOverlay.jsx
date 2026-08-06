export default function ScanlineOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay scanline-container">
      <div className="absolute inset-0 scanline opacity-30"></div>
      <div className="absolute inset-0 grain"></div>
    </div>
  );
}
