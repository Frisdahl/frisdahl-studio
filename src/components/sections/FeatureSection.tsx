import { useLocale } from "../../context/LocaleContext";
import { getHomeContent } from "../../data/home";
import { useFeatureScrollTheme } from "../../hooks";
import { Container, TextLink } from "../ui";

export function FeatureSection() {
  const { locale } = useLocale();
  const { feature } = getHomeContent(locale);
  const sectionRef = useFeatureScrollTheme();

  return (
    <section
      ref={sectionRef}
      className="py-section-sm lg:py-section"
    >
      <Container>
        <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="overflow-hidden rounded-control-sm bg-peach">
            {feature.imageSrc ? (
              <img
                src={feature.imageSrc}
                alt={feature.imageAlt}
                className="aspect-[8/9] h-full w-full object-cover sm:aspect-[9/10] lg:aspect-[9/10]"
              />
            ) : (
              <div
                className="aspect-[8/9] w-full sm:aspect-[9/10] lg:aspect-[9/10]"
                aria-hidden="true"
              />
            )}
          </div>

          <div className="min-w-0">
            <p className="eyebrow eyebrow-theme">{feature.eyebrow}</p>
            <h3 className="mt-md">{feature.title}</h3>
            <p className="mt-lg text-body">
              {feature.description}
            </p>
            <div className="mt-xl w-full">
              <TextLink href={feature.linkHref}>{feature.linkLabel}</TextLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
