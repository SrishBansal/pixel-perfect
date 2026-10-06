export type ConversationTurn = {
  id: string;
  speaker: "customer" | "shopkeeper";
  label: string;
  text: string;
  translation?: string;
  time: string;
};

export const demoConversation: ConversationTurn[] = [
  {
    id: "customer-1",
    speaker: "customer",
    label: "Customer · signed",
    text: "मुझे यह नीले रंग में दिखाइए।",
    translation: "Could I see this in blue?",
    time: "11:42",
  },
  {
    id: "shopkeeper-1",
    speaker: "shopkeeper",
    label: "Shopkeeper · spoken",
    text: "Of course. I’ll bring the blue one for you.",
    time: "11:42",
  },
];

export const demoClarification = {
  question: "Which size would you like to try?",
  options: ["Medium", "Large", "Extra large"],
};

export const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
];

export type DemoState = "conversation" | "listening" | "empty";
