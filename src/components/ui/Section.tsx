import Container from "./Container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  split?: boolean;
  reverse?: boolean;
};

export default function Section({
  children,
  className = "",
  split = false,
  reverse = false,
}: SectionProps) {
  return (
    <section
      className={`
        py-20
        md:py-28
        ${className}
      `}
    >
      <Container>
        <div
          className={
            split
              ? `
                grid
                items-center
                gap-12
                md:grid-cols-2
                ${reverse ? "md:[&>*:first-child]:order-2" : ""}
              `
              : ""
          }
        >
          {children}
        </div>
      </Container>
    </section>
  );
}