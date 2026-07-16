"use client";

import React, { useState, useEffect } from "react";
import { useAdmin } from "@/components/providers/AdminProvider";
import {
  SectionWrapper,
  Card,
  Field,
  Input,
  RemoveBtn,
  AddBtn,
} from "@/components/admin/AdminComponents";

const SkillsEditor = () => {
  const { portfolioData, updateSection, resetSection, loading } = useAdmin();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (portfolioData?.skills) {
      setData(portfolioData.skills);
    }
  }, [portfolioData?.skills]);

  if (loading || !data)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-spotify"></span>
      </div>
    );

  const setCategoryName = (ci, val) => {
    const arr = [...data];
    arr[ci] = { ...arr[ci], category: val };
    setData(arr);
  };

  const setSkillItem = (ci, si, key, val) => {
    const arr = data.map((cat, i) => {
      if (i !== ci) return cat;
      const items = cat.items.map((item, j) =>
        j === si ? { ...item, [key]: val } : item,
      );
      return { ...cat, items };
    });
    setData(arr);
  };

  const addSkill = (ci) => {
    const arr = data.map((cat, i) =>
      i !== ci
        ? cat
        : {
            ...cat,
            items: [...(cat.items || []), { name: "New Skill", icon: "" }],
          },
    );
    setData(arr);
  };

  const removeSkill = (ci, si) => {
    const arr = data.map((cat, i) =>
      i !== ci ? cat : { ...cat, items: cat.items.filter((_, j) => j !== si) },
    );
    setData(arr);
  };

  const addCategory = () =>
    setData([...data, { category: "New Category", items: [] }]);
  const removeCategory = (ci) => setData(data.filter((_, i) => i !== ci));

  return (
    <SectionWrapper
      title="Skills / Tech Stack"
      description="Add or remove skill categories and individual skill items with icons."
      onSave={() => updateSection("skills", data)}
      onReset={() => {
        resetSection?.("skills");
        setData(portfolioData.skills);
      }}
    >
      {data.map((cat, ci) => (
        <Card key={ci}>
          <div className="flex items-center justify-between mb-4">
            <Input
              value={cat.category}
              onChange={(e) => setCategoryName(ci, e.target.value)}
              placeholder="Category name"
            />
            <RemoveBtn onClick={() => removeCategory(ci)} />
          </div>
          <div className="space-y-3">
            {(cat.items || []).map((skill, si) => (
              <div
                key={si}
                className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end border border-base-300 rounded-xl p-3"
              >
                <div className="md:col-span-2">
                  <Field label="Skill Name">
                    <Input
                      value={skill.name}
                      onChange={(e) =>
                        setSkillItem(ci, si, "name", e.target.value)
                      }
                      placeholder="e.g. React.js"
                    />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field label="Icon URL">
                    <Input
                      value={skill.icon}
                      onChange={(e) =>
                        setSkillItem(ci, si, "icon", e.target.value)
                      }
                      placeholder="https://cdn.simpleicons.org/..."
                    />
                  </Field>
                </div>
                <div className="flex items-center gap-2">
                  {skill.icon && (
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-8 h-8 object-contain rounded"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                  <RemoveBtn onClick={() => removeSkill(ci, si)} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <AddBtn onClick={() => addSkill(ci)} label="+ Add Skill" />
          </div>
        </Card>
      ))}
      <AddBtn onClick={addCategory} label="+ Add Category" />
    </SectionWrapper>
  );
};

export default SkillsEditor;
