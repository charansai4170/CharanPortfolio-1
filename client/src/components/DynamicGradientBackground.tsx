interface DynamicGradientBackgroundProps {
  children: React.ReactNode;
}

const DynamicGradientBackground = ({ children }: DynamicGradientBackgroundProps) => {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
};

export default DynamicGradientBackground;