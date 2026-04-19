"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const partners = ["PHB", "AEMA"] as const;

type PartnerSelectorProps = {
  value: string;
};

export function PartnerSelector({ value }: PartnerSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(nextValue: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("viewer", nextValue);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="viewer-control">
      <label htmlFor="partner-viewer" className="card-meta-label">
        Viewing as
      </label>
      <select
        id="partner-viewer"
        className="viewer-select"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
      >
        {partners.map((partner) => (
          <option key={partner} value={partner}>
            {partner}
          </option>
        ))}
      </select>
    </div>
  );
}
