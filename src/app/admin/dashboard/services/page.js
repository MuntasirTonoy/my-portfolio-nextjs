"use client";

import React, { useState, useEffect } from "react";
import { useAdmin } from "@/components/providers/AdminProvider";
import { SectionWrapper, Card, Field, Input, Textarea, SectionTitle, RemoveBtn, AddBtn } from "@/components/admin/AdminComponents";
import { AdminFormSkeleton } from "@/components/ui/Skeleton";

const ServicesEditor = () => {
  const { portfolioData, updateSection, resetSection, loading } = useAdmin();
  const [data, setData] = useState(null);

  useEffect(() => { 
    if (portfolioData?.services) {
      setData(portfolioData.services); 
    }
  }, [portfolioData?.services]);

  if (loading || !data) return <AdminFormSkeleton />;

  const setTop = (key, val) => setData((d) => ({ ...d, [key]: val }));

  const setItem = (i, key, val) => {
    const items = [...(data.items || [])];
    items[i] = { ...items[i], [key]: val };
    setData((d) => ({ ...d, items }));
  };

  const addItem = () =>
    setData((d) => ({ ...d, items: [...(data.items || []), { title: "New Service", description: "Service description here." }] }));

  const removeItem = (i) =>
    setData((d) => ({ ...d, items: data.items.filter((_, idx) => idx !== i) }));

  return (
    <SectionWrapper
      title="Services Section"
      description="Edit the services heading, description, and individual service cards."
      onSave={() => updateSection("services", data)}
      onReset={() => { resetSection?.("services"); setData(portfolioData.services); }}
    >
      <Card>
        <SectionTitle>Section Header</SectionTitle>
        <div className="space-y-4">
          <Field label="Section Label (e.g. SERVICES)">
            <Input value={data.sectionTitle} onChange={(e) => setTop("sectionTitle", e.target.value)} />
          </Field>
          <Field label="Heading">
            <Input value={data.heading} onChange={(e) => setTop("heading", e.target.value)} />
          </Field>
          <Field label="Section Description">
            <Textarea value={data.description} onChange={(e) => setTop("description", e.target.value)} rows={3} />
          </Field>
        </div>
      </Card>

      <Card>
        <SectionTitle>Service Cards</SectionTitle>
        <div className="space-y-4">
          {(data.items || []).map((item, i) => (
            <div key={i} className="border border-base-300 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">Card {i + 1}</span>
                <RemoveBtn onClick={() => removeItem(i)} />
              </div>
              <Field label="Title">
                <Input value={item.title} onChange={(e) => setItem(i, "title", e.target.value)} />
              </Field>
              <Field label="Description">
                <Textarea value={item.description} onChange={(e) => setItem(i, "description", e.target.value)} rows={2} />
              </Field>
            </div>
          ))}
          <AddBtn onClick={addItem} label="+ Add Service Card" />
        </div>
      </Card>
    </SectionWrapper>
  );
};

export default ServicesEditor;
