"use client";

import Image from "next/image";
import type { CatalogBodyTypeOffering } from "@/lib/catalog-brands";

export function CatalogBodyTypeOfferingCard({ offering }: { offering: CatalogBodyTypeOffering }) {
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

      {offering.description ? (
        <p className="catalog-body-type-description">{offering.description}</p>
      ) : null}
    </article>
  );
}
