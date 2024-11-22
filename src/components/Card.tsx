import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, ogImage } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <a href={href} className="">
        {ogImage && (
          <div className="relative my-1 h-32 overflow-hidden rounded-lg">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/0 via-black/10 to-black/50"></div>
            <img
              src={typeof ogImage === "string" ? ogImage : ogImage.src}
              alt={`Preview image for ${title}`}
              className="w-full object-cover"
              style={{ height: "128px" }}
            />
          </div>
        )}
      </a>
      <Datetime
        pubDatetime={pubDatetime}
        modDatetime={modDatetime}
        className="mb-3"
      />
      <p>{description}</p>
    </li>
  );
}
