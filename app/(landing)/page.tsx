"use client";
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import ConversationPage from "@/app/(dashboard)/(routes)/conversation/page";


const tools = [
  {
    label:"Coversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation"
  },
]


const DashboardPage = ()  => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;


    document.head.appendChild(script);

    return () => {
      // Cleanup when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  const [ConversationVisible, setConversationVisible] = useState(false);

  const showConversation = () => {
    setConversationVisible(true);
}


const router = useRouter();  
  return (
    <div>
       <div>
                <Button className="circular-button" onClick={showConversation}>
                    Click Me  
                </Button> 
           {/* this is my button*/}
        </div>
      {/* Include the Calendly badge widget */}
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />

      {ConversationVisible && <ConversationPage />}
    </div>
  )
}
export default DashboardPage;