import Container from "./Container";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  split?: boolean;
  reverse?: boolean;
};

export default function Section({
  id,
  children,
  className = "",
  split = false,
  reverse = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 scroll-mt-24 ${className}`}
    >
      <Container>
        <div
          className={
            split
              ? `
                grid items-center gap-12 md:grid-cols-2
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