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
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill={color === "brand" ? `#${icon.hex}` : color}
      {...rest}
    >
      <path d={icon.path} />
    </svg>
  );
}
