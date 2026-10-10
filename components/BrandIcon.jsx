export default function BrandIcon({ icon, name, className = "", color = "currentColor", ...rest }) {
  if (!icon) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex items-center justify-center font-display font-black leading-none ${className}`}
        style={{ color }}
        {...rest}
      >
        {name.slice(0, 1)}
      </span>
    );
  }
  const brand = color === "brand";
  return (
    <svg role="img" aria-hidden="true" viewBox="0 0 24 24" className={className} {...rest}>
      <path d={icon.path} fill={brand ? `#${icon.hex}` : color} />
      {icon.strokePath && (
        <path
          d={icon.strokePath}
          fill="none"
          stroke={brand ? `#${icon.strokeHex || icon.hex}` : color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
