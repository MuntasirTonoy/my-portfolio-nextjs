"use client";

import { useSectionDraft } from "@/components/admin/useSectionDraft";
import { SectionWrapper, Card, Field, Input, Textarea, SectionTitle } from "@/components/admin/AdminComponents";
import { AdminFormSkeleton } from "@/components/ui/Skeleton";

const IntroductionEditor = () => {
  const { draft: data, setDraft: setData, loading, save, reset } = useSectionDraft("introduction");

  if (loading) return <AdminFormSkeleton />;

  const set = (key, val) => setData((d) => ({ ...d, [key]: val }));

  return (
    <SectionWrapper
      title="Introduction Section"
      description="Edit the introduction text that appears below the hero section."
      onSave={save}
    >
      <Card>
        <SectionTitle>Main Content</SectionTitle>
        <Field label="Section Heading">
          <Input value={data.heading} onChange={(e) => set("heading", e.target.value)} placeholder="My Introduction" />
        </Field>
        <Field label="Description">
          <Textarea 
            value={data.description} 
            onChange={(e) => set("description", e.target.value)} 
            rows={10} 
            placeholder="Tell your story..."
          />
        </Field>
      </Card>
    </SectionWrapper>
  );
};

export default IntroductionEditor;
