interface PlainBackgroundProps {
  children: React.ReactNode;
}

const PlainBackground = ({ children }: PlainBackgroundProps) => {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
};

export default PlainBackground;