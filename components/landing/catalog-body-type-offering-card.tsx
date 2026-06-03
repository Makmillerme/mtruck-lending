"use client";

import Image from "next/image";
import type { CatalogBodyTypeOffering } from "@/lib/catalog-brands";

export type BodyTypeOfferingLabels = {
  bodyTypes: string;
  modifications: string;
  generalSpecs: string;
};

function DetailList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;

  return (
    <div className="catalog-body-type-detail">
      <h4 className="catalog-body-type-detail-title">{title}</h4>
      <ul className="catalog-body-type-detail-list">
        {items.map((item, index) => (
          <li key={`${title}-${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function CatalogBodyTypeOfferingCard({
  offering,
  labels,
}: {
  offering: CatalogBodyTypeOffering;
  labels: BodyTypeOfferingLabels;
}) {
  const detailSections = [
    { title: labels.bodyTypes, items: offering.bodyTypes },
    { title: labels.modifications, items: offering.modifications },
    { title: labels.generalSpecs, items: offering.specs },
  ].filter((section) => section.items.length > 0);

  return (
    <article className="catalog-body-type-card">
      <div className="catalog-body-type-media">
        <Image
          src={offering.imageSrc}
          alt={offering.imageAlt}
          width={640}
          height={360}
          className="catalog-body-type-image"
        />
      </div>

      <h3 className="catalog-body-type-title">{offering.title}</h3>

      {detailSections.length > 0 ? (
        <div
          className="catalog-body-type-details"
        >
          {detailSections.map((section) => (
            <DetailList key={section.title} title={section.title} items={section.items} />
          ))}
        </div>
      ) : null}
    </article>
  );
}
