#!/usr/bin/env node
/**
 * One-off seed for data/site-reviews.json from legacy landing testimonials (English).
 * Run: node scripts/seed-site-reviews.mjs
 */
import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(root, "data", "site-reviews.json");

const seeds = [
  {
    id: "a1000001-0001-4000-8000-000000000001",
    quote:
      "Expert Travel helped us expand our fleet with quality vehicles at excellent prices. Their service and support have been exceptional.",
    author: "Martin Novak",
    company: "TransCargo s.r.o.",
    rating: 5,
    createdAt: "2025-01-08T12:00:00.000Z",
  },
  {
    id: "a1000002-0002-4000-8000-000000000002",
    quote: "Strong technical checks and clear communication through the whole purchase cycle.",
    author: "Petr Sikora",
    company: "Bohemia Logistics",
    rating: 5,
    createdAt: "2025-01-07T12:00:00.000Z",
  },
  {
    id: "a1000003-0003-4000-8000-000000000003",
    quote: "Documentation and delivery planning saved our operations team a lot of time.",
    author: "Iryna Kovalenko",
    company: "EastWest Transport",
    rating: 5,
    createdAt: "2025-01-06T12:00:00.000Z",
  },
  {
    id: "a1000004-0004-4000-8000-000000000004",
    quote: "Excellent communication and realistic timelines.",
    author: "Jan Krupa",
    company: "NorthLine Cargo",
    rating: 5,
    createdAt: "2025-01-05T12:00:00.000Z",
  },
  {
    id: "a1000005-0005-4000-8000-000000000005",
    quote: "The inspection report matched the vehicle condition precisely.",
    author: "Olha Danyliuk",
    company: "Transit Group",
    rating: 5,
    createdAt: "2025-01-04T12:00:00.000Z",
  },
  {
    id: "a1000006-0006-4000-8000-000000000006",
    quote: "Fast paperwork and smooth handover.",
    author: "Marek Benes",
    company: "Cargo One",
    rating: 4,
    createdAt: "2025-01-03T12:00:00.000Z",
  },
  {
    id: "a1000007-0007-4000-8000-000000000007",
    quote: "A practical partner for scaling transport operations.",
    author: "Dmytro Koval",
    company: "RouteX",
    rating: 5,
    createdAt: "2025-01-02T12:00:00.000Z",
  },
  {
    id: "a1000008-0008-4000-8000-000000000008",
    quote: "Good selection and no hidden surprises.",
    author: "Petra Svobodova",
    company: "EuroMove",
    rating: 4,
    createdAt: "2025-01-01T12:00:00.000Z",
  },
];

const payload = {
  reviews: seeds.map((item) => ({ ...item, locale: "en", status: "approved" })),
};

mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Wrote ${payload.reviews.length} reviews to ${outPath}`);
