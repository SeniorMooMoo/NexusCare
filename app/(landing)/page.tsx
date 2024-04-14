"use client";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ConversationPage from "@/app/(dashboard)/(routes)/conversation/page";
import styles from "./page.module.css";
import Image from "next/image";

const tools = [
  {
    label: "Coversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
];

const DashboardPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    document.head.appendChild(script);

    return () => {
      // Cleanup when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  const [ConversationVisible, setConversationVisible] = useState(false);
  const [ShowButton, setShowButton] = useState(true);

  const showConversation = () => {
    setConversationVisible(true);
    setShowButton(false);
  };

  const hideConversation = () => {
    setConversationVisible(false);
    setShowButton(true);
  };

  const router = useRouter();
  return (
    <div>
      <div className={styles.container}>
        <Image
          className={styles.backgroundImage}
          src={
            "https://media.discordapp.net/attachments/1225883388230111392/1228976883316822066/imgBackground.jpg?ex=662e00ea&is=661b8bea&hm=117f79485b8f6d8f6606a531be66c192c067b00271c6071a7a11a050d4010d0e&=&format=webp&width=1440&height=608"
          }
          width={1920}
          height={941}
          alt="Dashboard Image"
        />
        {ShowButton && (
          <Button className={`circular-button`} onClick={showConversation}>
            Click Me
          </Button>
        )}
        {/* this is my button*/}
      </div>
      {/* Include the Calendly badge widget */}
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />

      {ConversationVisible && <ConversationPage onClose={hideConversation} />}
    </div>
  );
};
export default DashboardPage;
