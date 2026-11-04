"use client";

import { useState } from "react";
import { useAdmin } from "@/components/providers/AdminProvider";

// Stable empty values; a fresh {} per render would reset the draft forever.
const EMPTY_OBJECT = Object.freeze({});
const EMPTY_LIST = Object.freeze([]);

/**
 * Local, editable copy of one portfolio section for the admin editors.
 * The draft resets whenever the saved data changes (initial load, or after a
 * save). It's derived during render, which React recommends over copying
 * props into state inside an effect.
 */
export function useSectionDraft(section, { list = false } = {}) {
  const { portfolioData, updateSection, loading } = useAdmin();
  const saved = portfolioData ? (portfolioData[section] ?? (list ? EMPTY_LIST : EMPTY_OBJECT)) : null;

  const [draft, setDraft] = useState(saved);
  const [source, setSource] = useState(saved);
  if (saved !== source) {
    setSource(saved);
    setDraft(saved);
  }

  return {
    draft,
    setDraft,
    loading: loading || draft == null,
    save: () => updateSection(section, draft),
    reset: () => setDraft(saved),
  };
}
