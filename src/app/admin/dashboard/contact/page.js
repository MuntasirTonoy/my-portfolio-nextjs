"use client";

import { useSectionDraft } from "@/components/admin/useSectionDraft";
import { SectionWrapper, Card, Field, Input, Textarea, SectionTitle } from "@/components/admin/AdminComponents";
import { AdminFormSkeleton } from "@/components/ui/Skeleton";

const ContactEditor = () => {
  const { draft: data, setDraft: setData, loading, save, reset } = useSectionDraft("contact");

  if (loading) return <AdminFormSkeleton />;

  const set = (key, val) => setData((d) => ({ ...d, [key]: val }));
  const setSocial = (key, val) => {
    const social = { ...(data.socialLinks || {}), [key]: val };
    setData({ ...data, socialLinks: social });
  };

  return (
    <SectionWrapper
      title="Contact Info"
      description="Update your contact details and social media profiles."
      onSave={save}
      onReset={reset}
    >
      <Card>
        <SectionTitle>Section Content</SectionTitle>
        <div className="space-y-4">
          <Field label="Heading">
            <Input value={data.heading} onChange={(e) => set("heading", e.target.value)} />
          </Field>
          <Field label="Subheading">
            <Input value={data.subheading} onChange={(e) => set("subheading", e.target.value)} />
          </Field>
          <Field label="Description">
            <Textarea value={data.description} onChange={(e) => set("description", e.target.value)} rows={3} />
          </Field>
        </div>
      </Card>

      <Card>
        <SectionTitle>Primary Contact Details</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Email">
            <Input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="mdmuntasir.dev@gmail.com" />
          </Field>
          <Field label="Phone">
            <Input value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+880 1783424220" />
          </Field>
          <Field label="Location">
            <Input value={data.location} onChange={(e) => set("location", e.target.value)} placeholder="Kushtia, Bangladesh" />
          </Field>
        </div>
      </Card>

      <Card>
        <SectionTitle>Social Profiles</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="GitHub URL">
            <Input 
              value={data.socialLinks?.github || ""} 
              onChange={(e) => setSocial("github", e.target.value)} 
              placeholder="https://github.com/..." 
            />
          </Field>
          <Field label="LinkedIn URL">
            <Input 
              value={data.socialLinks?.linkedin || ""} 
              onChange={(e) => setSocial("linkedin", e.target.value)} 
              placeholder="https://linkedin.com/in/..." 
            />
          </Field>
        </div>
      </Card>
    </SectionWrapper>
  );
};

export default ContactEditor;
