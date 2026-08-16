"use client";

import React, { useState, useEffect } from "react";
import { useAdmin } from "@/components/providers/AdminProvider";
import { SectionWrapper, Card, Field, Input, Textarea, SectionTitle } from "@/components/admin/AdminComponents";
import { AdminFormSkeleton } from "@/components/ui/Skeleton";

const HeroEditor = () => {
  const { portfolioData, updateSection, resetSection, loading } = useAdmin();
  const [data, setData] = useState(null);

  useEffect(() => { 
    if (portfolioData?.hero) {
      setData(portfolioData.hero); 
    }
  }, [portfolioData?.hero]);

  if (loading || !data) return <AdminFormSkeleton />;

  const set = (key, val) => setData((d) => ({ ...d, [key]: val }));

  const setTag = (i, val) => {
    const tags = [...(data.roleTags || [])];
    tags[i] = val;
    setData((d) => ({ ...d, roleTags: tags }));
  };

  const addTag = () => setData((d) => ({ ...d, roleTags: [...(data.roleTags || []), "New Role"] }));
  const removeTag = (i) => setData((d) => ({ ...d, roleTags: data.roleTags.filter((_, idx) => idx !== i) }));

  return (
    <SectionWrapper
      title="Hero Section"
      description="Edit the main hero content shown at the top of your portfolio homepage."
      onSave={() => updateSection("hero", data)}
      onReset={() => { resetSection?.("hero"); setData(portfolioData.hero); }}
    >
      <Card>
        <SectionTitle>Basic Info</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Greeting Text">
            <Input value={data.greeting} onChange={(e) => set("greeting", e.target.value)} placeholder="Hello, I'm" />
          </Field>
          <Field label="Your Name">
            <Input value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="Muntasir" />
          </Field>
          <Field label="Badge Text">
            <Input value={data.badge} onChange={(e) => set("badge", e.target.value)} placeholder="Available for work" />
          </Field>
        </div>
      </Card>

      <Card>
        <SectionTitle>Bio / Description</SectionTitle>
        <Field label="Hero Description">
          <Textarea value={data.description} onChange={(e) => set("description", e.target.value)} rows={3} />
        </Field>
      </Card>

      <Card>
        <SectionTitle>Role Tags (WordFlip)</SectionTitle>
        <div className="space-y-2">
          {(data.roleTags || []).map((tag, i) => (
            <div key={i} className="flex gap-2">
              <Input value={tag} onChange={(e) => setTag(i, e.target.value)} placeholder="Role name" />
              <button onClick={() => removeTag(i)} className="px-3 py-1.5 text-xs font-semibold text-red-400 bg-red-500/10 rounded-md hover:bg-red-500/20 cursor-pointer">✕</button>
            </div>
          ))}
          <button onClick={addTag} className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold border border-dashed border-[#02b677]/50 text-[#02b677] hover:bg-[#02b677]/10 transition-all cursor-pointer">
            + Add Role Tag
          </button>
        </div>
      </Card>

      <Card>
        <SectionTitle>CTA Buttons</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Button 1 Label">
            <Input value={data.ctaBtn1Text} onChange={(e) => set("ctaBtn1Text", e.target.value)} />
          </Field>
          <Field label="CV / Download Link">
            <Input value={data.cvLink} onChange={(e) => set("cvLink", e.target.value)} placeholder="https://..." />
          </Field>
          <Field label="Button 2 Label">
            <Input value={data.ctaBtn2Text} onChange={(e) => set("ctaBtn2Text", e.target.value)} />
          </Field>
          <Field label="WhatsApp Link">
            <Input value={data.whatsappLink} onChange={(e) => set("whatsappLink", e.target.value)} placeholder="https://wa.me/..." />
          </Field>
        </div>
      </Card>
    </SectionWrapper>
  );
};

export default HeroEditor;
