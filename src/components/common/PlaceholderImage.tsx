interface PlaceholderImageProps {
  width?: number;
  height?: number;
  text?: string;
  className?: string;
}

const PlaceholderImage = ({ 
  width = 400, 
  height = 300, 
  text = 'Image', 
  className = '' 
}: PlaceholderImageProps) => {
  return (
    <div 
      className={`bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center text-muted-foreground font-medium ${className}`}
      style={{ width, height }}
    >
      {text}
    </div>
  );
};

export default PlaceholderImage;