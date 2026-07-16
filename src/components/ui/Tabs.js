"use client";

import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("address");

  const tabsData = [
    {
      label: "Address",
      value: "address",
      content: [
        {
          title: "Permanent Address",
          description:
            "Tonoy Villa, MM Road, Gobindopur, Alamdanga, Chuadanga.",
        },
        {
          title: "Present Address",
          description: "Peyaratola, Kushtia.",
        },
        {
          title: "Other",
          description:
            "Some other address info that should be hidden (only 2 shown).",
        },
      ],
    },
    {
      label: "Education",
      value: "education",
      content: [
        {
          title: "HSC",
          description:
            "I've completed my HSC from 'Khulna Public College' with GPA 5.00 from science background.",
        },
        {
          title: "Graduation",
          description:
            "Currently I'm pursuing my graduation in Mathematics. Besides, I'm focusing on fullstack development.",
        },
      ],
    },
    {
      label: "Experiences",
      value: "experiences",
      content: [],
    },
  ];

  const activeContent = tabsData.find(
    (tab) => tab.value === activeTab
  )?.content;

  return (
    <div>
      {/* Tab Headers */}
      <div className="tabs mt-4">
        {tabsData.map((tab) => (
          <a
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`tab tab-bordered text-md md:text-lg cursor-pointer ${
              activeTab === tab.value
                ? "tab-active border-3 border-b-green-400"
                : "border-3 border-b-green-50/0"
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 space-y-6 min-h-64">
        {activeTab === "experiences" && activeContent?.length === 0 ? (
          <p className="text-base pl-10 ">
            I'm a fresher , <br /> seeking opportunities.
          </p>
        ) : (
          activeContent?.slice(0, 2).map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-base md:line-clamp-4 y md:max-w-80">
                {item.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tabs;
