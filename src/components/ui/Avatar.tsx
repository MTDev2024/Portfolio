import Image from "next/image";

type AvatarProps = {
  variant?: "front" | "three-quarter";
  className?: string;
};

export default function Avatar({
  variant = "front",
  className = "",
}: AvatarProps) {
  const src =
    variant === "front"
      ? "/avatar-front.svg"
      : "/avatar-three-quarter.svg";

  return (
    <Image
      src={src}
      alt="Avatar développeur"
      width={112}
      height={112}
      className={`rounded-full ${className}`}
      priority
    />
  );
}