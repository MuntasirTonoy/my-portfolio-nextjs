"use client";

import { useSectionDraft } from "@/components/admin/useSectionDraft";
import {
  SectionWrapper,
  Card,
  Field,
  Input,
  RemoveBtn,
  AddBtn,
} from "@/components/admin/AdminComponents";
import { AdminFormSkeleton } from "@/components/ui/Skeleton";
import RemoteImage from "@/components/ui/RemoteImage";

const SkillsEditor = () => {
  const { draft: data, setDraft: setData, loading, save, reset } = useSectionDraft("skills", { list: true });

  if (loading)
    return <AdminFormSkeleton />;

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
      onSave={save}
      onReset={reset}
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
                    <RemoteImage
                      src={skill.icon}
                      alt={skill.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain rounded"
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
