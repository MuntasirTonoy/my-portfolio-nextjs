"use client";

import React, { useState, useEffect } from "react";
import { SectionWrapper, Card, Field, Input, PasswordInput, SectionTitle } from "@/components/admin/AdminComponents";
import { updateAccountPassword } from "@/lib/api";
import Swal from "sweetalert2";

const SettingsEditor = () => {
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    newEmail: "admin@example.com",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const adminUser = localStorage.getItem("admin_user");
    if (adminUser) {
      try {
        const userObj = JSON.parse(adminUser);
        if (userObj.email) {
          setData((d) => ({ ...d, newEmail: userObj.email }));
        }
      } catch (err) {
        console.error("Failed to parse admin_user from localStorage", err);
      }
    }
  }, []);

  const set = (key, val) => setData((d) => ({ ...d, [key]: val }));

  const handleUpdate = async () => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
      return Swal.fire("Error", "New passwords do not match", "error");
    }

    setLoading(true);
    try {
      const resData = await updateAccountPassword(data);
      Swal.fire("Success", resData.message || "Account settings updated successfully", "success");
      
      // Synchronize changes to local storage
      if (resData.user) {
        localStorage.setItem("admin_user", JSON.stringify(resData.user));
      }
      
      setData({ 
        currentPassword: "", 
        newPassword: "", 
        confirmPassword: "",
        newEmail: resData.user?.email || data.newEmail
      });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to update account", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper
      title="Account Settings"
      description="Update your admin login credentials and security settings."
      onSave={handleUpdate}
    >
      <Card>
        <SectionTitle>Admin Identity</SectionTitle>
        <Field label="Admin Email">
          <Input 
            value={data.newEmail} 
            onChange={(e) => set("newEmail", e.target.value)} 
            placeholder="admin@example.com"
          />
        </Field>
      </Card>

      <Card>
        <SectionTitle>Change Password</SectionTitle>
        <div className="space-y-4">
          <Field label="Current Password">
            <PasswordInput 
              value={data.currentPassword} 
              onChange={(e) => set("currentPassword", e.target.value)} 
              placeholder="••••••••"
            />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="New Password">
              <PasswordInput 
                value={data.newPassword} 
                onChange={(e) => set("newPassword", e.target.value)} 
                placeholder="New Password (optional)"
              />
            </Field>
            <Field label="Confirm New Password">
              <PasswordInput 
                value={data.confirmPassword} 
                onChange={(e) => set("confirmPassword", e.target.value)} 
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
