"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { SectionWrapper, Card, Field, Input, PasswordInput, SectionTitle } from "@/components/admin/AdminComponents";
import { useAdmin } from "@/components/providers/AdminProvider";
import { updateAccount, errorMessage } from "@/lib/api";

const MIN_PASSWORD_LENGTH = 8;
const EMPTY_PASSWORDS = { currentPassword: "", newPassword: "", confirmPassword: "" };

const SettingsEditor = () => {
  const { user, setUser } = useAdmin();
  const [passwords, setPasswords] = useState(EMPTY_PASSWORDS);
  // null = "not edited yet", so the field shows the current email once it loads.
  const [emailDraft, setEmailDraft] = useState(null);
  const [saving, setSaving] = useState(false);

  const email = emailDraft ?? user?.email ?? "";
  const setPassword = (key, val) => setPasswords((p) => ({ ...p, [key]: val }));

  const handleUpdate = async () => {
    if (!passwords.currentPassword) {
      return toast.error("Enter your current password to confirm changes");
    }
    if (passwords.newPassword) {
      if (passwords.newPassword.length < MIN_PASSWORD_LENGTH) {
        return toast.error(`New password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      }
      if (passwords.newPassword !== passwords.confirmPassword) {
        return toast.error("New passwords do not match");
      }
    }

    setSaving(true);
    try {
      const res = await updateAccount({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword || undefined,
        newEmail: email !== user?.email ? email : undefined,
      });
      toast.success(res.message || "Account settings updated successfully");
      setUser(res.user);
      setPasswords(EMPTY_PASSWORDS);
      setEmailDraft(null);
    } catch (err) {
      toast.error(errorMessage(err, "Failed to update account"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <SectionWrapper
      title="Account Settings"
      description="Update your admin login credentials and security settings."
      onSave={saving ? undefined : handleUpdate}
    >
      <Card>
        <SectionTitle>Admin Identity</SectionTitle>
        <Field label="Admin Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmailDraft(e.target.value)}
            placeholder="you@example.com"
          />
        </Field>
      </Card>

      <Card>
        <SectionTitle>Change Password</SectionTitle>
        <div className="space-y-4">
          <Field label="Current Password">
            <PasswordInput
              value={passwords.currentPassword}
              onChange={(e) => setPassword("currentPassword", e.target.value)}
              placeholder="••••••••"
            />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="New Password">
              <PasswordInput
                value={passwords.newPassword}
                onChange={(e) => setPassword("newPassword", e.target.value)}
                placeholder={`At least ${MIN_PASSWORD_LENGTH} characters (optional)`}
              />
            </Field>
            <Field label="Confirm New Password">
              <PasswordInput
                value={passwords.confirmPassword}
                onChange={(e) => setPassword("confirmPassword", e.target.value)}
                placeholder="Confirm New Password"
              />
            </Field>
          </div>
          <p className="text-xs text-base-content/40 italic">
            * Leave new password fields blank if you only want to change your email.
          </p>
        </div>
      </Card>
    </SectionWrapper>
  );
};

export default SettingsEditor;
