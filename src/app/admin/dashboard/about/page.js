"use client";

import React, { useState, useEffect } from "react";
import { useAdmin } from "@/components/providers/AdminProvider";
import { SectionWrapper, Card, Field, Input, Textarea, SectionTitle, ImageUpload, RemoveBtn, AddBtn } from "@/components/admin/AdminComponents";
import Skeleton, { CardSkeleton } from "@/components/ui/Skeleton";

const AboutEditor = () => {
  const { portfolioData, updateSection, resetSection, loading } = useAdmin();
  const [data, setData] = useState(null);

  useEffect(() => { 
    if (portfolioData?.about) {
      setData(portfolioData.about); 
    }
  }, [portfolioData?.about]);

  if (loading || !data) return (
    <div className="space-y-6">
      <Skeleton width="200px" height="32px" />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );

  const set = (key, val) => setData((d) => ({ ...d, [key]: val }));
  const setNested = (key, subKey, val) => setData((d) => ({ ...d, [key]: { ...d[key], [subKey]: val } }));

  // Professional journey helpers
  const setJourneyItem = (i, key, val) => {
    const arr = [...data.professionalJourney];
    arr[i] = { ...arr[i], [key]: val };
    setData((d) => ({ ...d, professionalJourney: arr }));
  };

  // Education helpers
  const setEdu = (i, key, val) => {
    const arr = [...data.education];
    arr[i] = { ...arr[i], [key]: val };
    setData((d) => ({ ...d, education: arr }));
  };
  const addEdu = () => setData((d) => ({ ...d, education: [...(data.education || []), { level: "", institution: "", year: "", result: "" }] }));
  const removeEdu = (i) => setData((d) => ({ ...d, education: data.education.filter((_, idx) => idx !== i) }));

  // Timeline helpers
  const setTimeline = (i, key, val) => {
    const arr = [...data.journey];
    arr[i] = { ...arr[i], [key]: val };
    setData((d) => ({ ...d, journey: arr }));
  };
  const addTimeline = () => setData((d) => ({ ...d, journey: [...(data.journey || []), { year: "", title: "", description: "", iconColor: "text-green-400" }] }));
  const removeTimeline = (i) => setData((d) => ({ ...d, journey: data.journey.filter((_, idx) => idx !== i) }));

  // Certificates helpers
  const setCert = (i, key, val) => {
    const arr = [...(data.certificates || [])];
    arr[i] = { ...arr[i], [key]: val };
    setData((d) => ({ ...d, certificates: arr }));
  };
  const addCert = () => setData((d) => ({ ...d, certificates: [...(data.certificates || []), { title: "", institution: "", image: "" }] }));
  const removeCert = (i) => setData((d) => ({ ...d, certificates: (data.certificates || []).filter((_, idx) => idx !== i) }));

  return (
    <SectionWrapper
      title="About Page"
      description="Edit your profile info, bio paragraphs, education, and journey timeline."
      onSave={() => updateSection("about", data)}
      onReset={() => { resetSection?.("about"); setData(portfolioData.about); }}
    >
      {/* Basic Profile */}
      <Card>
        <SectionTitle>Profile Info</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name">
            <Input value={data.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label="Designation">
            <Input value={data.designation} onChange={(e) => set("designation", e.target.value)} />
          </Field>
          <Field label="Location">
            <Input value={data.location} onChange={(e) => set("location", e.target.value)} />
          </Field>
          <Field label="Experience">
            <Input value={data.experience} onChange={(e) => set("experience", e.target.value)} />
          </Field>
          <Field label="Availability">
            <Input value={data.availability} onChange={(e) => set("availability", e.target.value)} />
          </Field>
        </div>
      </Card>

      {/* Profile Image */}
      <Card>
        <SectionTitle>Profile Image</SectionTitle>
        <Field label="Profile Photo" hint="Paste a URL or upload from your device (saved as base64)">
          <ImageUpload value={data.profileImage} onChange={(v) => set("profileImage", v)} />
        </Field>
      </Card>

      {/* Social Links */}
      <Card>
        <SectionTitle>Social Links</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data.socialLinks || {}).map(([key, val]) => (
            <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
              <Input value={val} onChange={(e) => setNested("socialLinks", key, e.target.value)} placeholder={`https://...`} />
            </Field>
          ))}
        </div>
      </Card>

      {/* Professional Journey paragraphs */}
      <Card>
        <SectionTitle>About Me Paragraphs</SectionTitle>
        <div className="space-y-4">
          {(data.professionalJourney || []).map((item, i) => (
            <div key={i} className="space-y-2 border border-base-300 rounded-xl p-4">
              <Field label="Heading">
                <Input value={item.heading} onChange={(e) => setJourneyItem(i, "heading", e.target.value)} />
              </Field>
              <Field label="Content">
                <Textarea value={item.content} onChange={(e) => setJourneyItem(i, "content", e.target.value)} rows={3} />
              </Field>
            </div>
          ))}
        </div>
      </Card>

      {/* Education */}
      <Card>
        <SectionTitle>Education</SectionTitle>
        <div className="space-y-4">
          {(data.education || []).map((edu, i) => (
            <div key={i} className="border border-base-300 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">Entry {i + 1}</span>
                <RemoveBtn onClick={() => removeEdu(i)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Level/Degree"><Input value={edu.level} onChange={(e) => setEdu(i, "level", e.target.value)} /></Field>
                <Field label="Institution"><Input value={edu.institution} onChange={(e) => setEdu(i, "institution", e.target.value)} /></Field>
                <Field label="Year"><Input value={edu.year} onChange={(e) => setEdu(i, "year", e.target.value)} /></Field>
                <Field label="Result/GPA"><Input value={edu.result} onChange={(e) => setEdu(i, "result", e.target.value)} /></Field>
              </div>
            </div>
          ))}
          <AddBtn onClick={addEdu} label="+ Add Education" />
        </div>
      </Card>

      {/* Journey Timeline */}
      <Card>
        <SectionTitle>Journey Timeline</SectionTitle>
        <div className="space-y-4">
          {(data.journey || []).map((item, i) => (
            <div key={i} className="border border-base-300 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">Step {i + 1}</span>
                <RemoveBtn onClick={() => removeTimeline(i)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Year"><Input value={item.year} onChange={(e) => setTimeline(i, "year", e.target.value)} /></Field>
                <Field label="Title"><Input value={item.title} onChange={(e) => setTimeline(i, "title", e.target.value)} /></Field>
                <Field label="Timeline Icon Color" hint="Select a color for the timeline dot">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      "text-green-500",
                      "text-blue-500",
                      "text-red-500",
                      "text-yellow-500",
                      "text-purple-500",
                      "text-pink-500",
                      "text-orange-500",
                      "text-teal-500"
                    ].map((colorClass) => (
                      <button
                        key={colorClass}
                        type="button"
                        onClick={() => setTimeline(i, "iconColor", colorClass)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center bg-base-200 border-2 transition-all cursor-pointer ${
                          item.iconColor === colorClass ? "border-green-500 scale-110" : "border-transparent hover:scale-110"
                        }`}
                        title={colorClass.replace('text-', '').replace('-500', '')}
                      >
                        <span className={`text-xl ${colorClass}`}>●</span>
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
              <Field label="Description">
                <Textarea value={item.description} onChange={(e) => setTimeline(i, "description", e.target.value)} rows={2} />
              </Field>
            </div>
          ))}
          <AddBtn onClick={addTimeline} label="+ Add Timeline Step" />
        </div>
      </Card>

      {/* Certificates */}
      <Card>
        <SectionTitle>Certificates</SectionTitle>
        <div className="space-y-4">
          {(data.certificates || []).map((cert, i) => (
            <div key={i} className="border border-base-300 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">Certificate {i + 1}</span>
                <RemoveBtn onClick={() => removeCert(i)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Title">
                  <Input value={cert.title} onChange={(e) => setCert(i, "title", e.target.value)} />
                </Field>
                <Field label="Institution">
                  <Input value={cert.institution} onChange={(e) => setCert(i, "institution", e.target.value)} />
                </Field>
              </div>
              <div className="mt-3">
                <Field label="Image">
                  <ImageUpload value={cert.image} onChange={(v) => setCert(i, "image", v)} />
                </Field>
              </div>
            </div>
          ))}
          <AddBtn onClick={addCert} label="+ Add Certificate" />
        </div>
      </Card>
    </SectionWrapper>
  );
};

export default AboutEditor;
