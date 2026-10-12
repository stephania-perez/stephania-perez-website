"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const stepKeys = [
  "consultation",
  "concept",
  "development",
  "procurement",
  "install",
] as const;

type StepKey = (typeof stepKeys)[number];

export function DesignProcessAccordion() {
  const t = useTranslations("ServicesPage.process");
  const [openKey, setOpenKey] = useState<StepKey>("concept");

  return (
    <div className="border-t border-border">
      {stepKeys.map((key) => {
        const isOpen = openKey === key;
        const panelId = `process-panel-${key}`;
        const buttonId = `process-button-${key}`;

        return (
          <div key={key} className="border-b border-border">
            <button
              id={buttonId}
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left text-[11px] uppercase tracking-[0.22em] text-foreground/90 transition-colors hover:text-foreground"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenKey(key)}
            >
              <span>{t(`steps.${key}.title`)}</span>
              <span className="text-lg font-light leading-none text-muted" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 text-sm leading-relaxed text-muted"
            >
              {t(`steps.${key}.body`)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
