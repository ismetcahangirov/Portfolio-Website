import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ href = "/", image, alt = "website" }) {
  return (
    <div className="project-hover group relative flex flex-col justify-between items-center text-gray-700 w-full h-auto md:w-[600px] md:h-[400px] p-2 border bg-white shadow-md hover:shadow-lg transition overflow-hidden ">
      <Image
        src={image}
        alt={alt}
        width={400}
        height={200}
        className="w-full h-auto md:h-[350px] object-cover grayscale"
      />

      <p className="mt-2">{alt}</p>

      <Link
        href={href}
        target="_blank"
        className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500 
        bg-black text-white px-7 py-3 "
      >
        Preview
      </Link>
    </div>
  );
}
