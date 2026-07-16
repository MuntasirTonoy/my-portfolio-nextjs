"use client";

import React, { useState, useEffect } from "react";
import { useAdmin } from "@/components/providers/AdminProvider";
import { SectionWrapper, Card, Field, Input, Textarea, SectionTitle } from "@/components/admin/AdminComponents";

const IntroductionEditor = () => {
  const { portfolioData, updateSection, loading } = useAdmin();
  const [data, setData] = useState(null);

  useEffect(() => { 
    if (portfolioData?.introduction) {
      setData(portfolioData.introduction); 
    }
  }, [portfolioData?.introduction]);

  if (loading || !data) return (
    <div className="flex justify-center py-20">
      <span className="loading loading-spinner loading-lg text-spotify"></span>
    </div>
  );

  const set = (key, val) => setData((d) => ({ ...d, [key]: val }));

  return (
    <SectionWrapper
      title="Introduction Section"
      description="Edit the introduction text that appears below the hero section."
      onSave={() => updateSection("introduction", data)}
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
