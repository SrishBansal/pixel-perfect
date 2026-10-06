import { useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  Copy,
  Hand,
  Languages,
  Mic,
  MoreHorizontal,
  Play,
  RotateCcw,
  Share2,
  ShieldCheck,
  Signal,
  Sparkle,
  Volume2,
  Webcam,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  demoClarification,
  demoConversation,
  languages,
  type ConversationTurn,
  type DemoState,
} from "@/components/clarifysign/demo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClarifySign — Communication at the counter" },
      {
        name: "description",
        content:
          "A thoughtful two-way Indian Sign Language and spoken language communication demo for everyday retail conversations.",
      },
      { property: "og:title", content: "ClarifySign — Communication at the counter" },
      {
        property: "og:description",
        content: "A thoughtful two-way sign and speech communication demo for retail.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClarifySign,
});

type Mode = "sign-to-voice" | "voice-to-sign";

function ClarifySign() {
  const [mode, setMode] = useState<Mode>("sign-to-voice");
  const [language, setLanguage] = useState("en");
  const [speakAloud, setSpeakAloud] = useState(true);
  const [researchMode, setResearchMode] = useState(false);
  const [demoState, setDemoState] = useState<DemoState>("conversation");
  const [transcript, setTranscript] = useState<ConversationTurn[]>(demoConversation);
  const [chosenOption, setChosenOption] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState("");
  const [draft, setDraft] = useState("");
  const [shownText, setShownText] = useState("");
  const [speed, setSpeed] = useState("1×");
  const [notice, setNotice] = useState("");

  const activeLanguage = languages.find((item) => item.code === language)?.label ?? "English";

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function selectMode(nextMode: Mode) {
    setMode(nextMode);
    setNotice("");
  }

  function handleShowSign() {
    if (!draft.trim()) {
      showNotice("Add a message first to prepare a sign preview.");
      return;
    }
    setShownText(draft.trim());
  }

  async function copyText() {
    if (!shownText) return;
    try {
      await navigator.clipboard.writeText(shownText);
      showNotice("Text copied.");
    } catch {
      showNotice("Copy isn't available in this preview.");
    }
  }

  return (
    <div className="min-h-screen bg-background px-3 py-3 text-foreground sm:px-6 sm:py-6">
      <div className="app-window mx-auto max-w-[1500px] overflow-hidden">
      <header className="app-titlebar">
        <div className="flex min-w-0 items-center gap-4">
          <div className="traffic-lights" aria-hidden="true"><i /><i /><i /></div>
          <a className="flex items-center gap-3" href="#home" aria-label="ClarifySign home">
            <span className="brand-mark" aria-hidden="true">
              <Hand size={21} strokeWidth={1.9} />
            </span>
            <span>
              <span className="block font-display text-[15px] font-semibold leading-tight">ClarifySign</span>
              <span className="mt-0.5 block text-[11px] text-muted-foreground">Retail conversation</span>
            </span>
          </a>
        </div>

          <div className="titlebar-settings">
            <div className="flex items-center gap-2.5">
              <Volume2 className="size-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-[13px] font-medium">Speak aloud</span>
              <Switch
                checked={speakAloud}
                onCheckedChange={setSpeakAloud}
                aria-label="Speak aloud"
              />
            </div>
            <div className="flex items-center gap-2.5 border-l border-border pl-4">
              <ShieldCheck className="size-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-[13px] font-medium">Research mode</span>
              <Switch
                checked={researchMode}
                onCheckedChange={setResearchMode}
                aria-label="Research mode"
              />
            </div>
          </div>
      </header>

      <main id="home" className="px-5 pb-8 sm:px-8 lg:px-10">
        <section className="workspace-intro flex flex-col justify-between gap-7 py-8 md:flex-row md:items-end lg:py-10">
          <div>
            <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase text-primary">
              <span className="size-1.5 rounded-full bg-primary" /> COMMUNICATION WORKSPACE
            </p>
            <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-[44px]">
              Conversation, made clear.
            </h1>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-muted-foreground">
              A shared place for a customer and shopkeeper to take their time, and communicate
              clearly.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <div className="mode-switch" role="tablist" aria-label="Communication direction">
              <Button
                type="button"
                role="tab"
                aria-selected={mode === "sign-to-voice"}
                onClick={() => selectMode("sign-to-voice")}
                variant={mode === "sign-to-voice" ? "default" : "ghost"}
                className="h-10 gap-2 px-4"
              >
                <Hand size={16} /> Sign <ArrowRight size={14} /> Voice
              </Button>
              <Button
                type="button"
                role="tab"
                aria-selected={mode === "voice-to-sign"}
                onClick={() => selectMode("voice-to-sign")}
                variant={mode === "voice-to-sign" ? "default" : "ghost"}
                className="h-10 gap-2 px-4"
              >
                <Volume2 size={16} /> Voice <ArrowRight size={14} /> Sign
              </Button>
            </div>
            <span className="demo-badge"><span className="size-1.5 rounded-full bg-accent" /> DEMO</span>
          </div>
        </section>

        {mode === "sign-to-voice" ? (
          <SignToVoice
            demoState={demoState}
            setDemoState={(state) => {
              setDemoState(state);
              setChosenOption(null);
            }}
            chosenOption={chosenOption}
            setChosenOption={setChosenOption}
            researchMode={researchMode}
            speakAloud={speakAloud}
            language={activeLanguage}
            transcript={transcript}
            replyDraft={replyDraft}
            setReplyDraft={setReplyDraft}
            onSendReply={() => {
              const text = replyDraft.trim();
              if (!text) return;
              setTranscript((current) => [
                ...current,
                {
                  id: `shopkeeper-${Date.now()}`,
                  speaker: "shopkeeper",
                  label: "Shopkeeper · typed",
                  text,
                  time: new Intl.DateTimeFormat("en", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date()),
                },
              ]);
              setReplyDraft("");
            }}
          />
        ) : (
          <VoiceToSign
            language={language}
            setLanguage={setLanguage}
            draft={draft}
            setDraft={setDraft}
            shownText={shownText}
            speed={speed}
            setSpeed={setSpeed}
            onShowSign={handleShowSign}
            onNotice={showNotice}
            onCopy={copyText}
          />
        )}

      </main>
      </div>

      {notice && (
        <div className="notice-toast" role="status">
          {notice}
        </div>
      )}
    </div>
  );
}

function SignToVoice({
  demoState,
  setDemoState,
  chosenOption,
  setChosenOption,
  researchMode,
  speakAloud,
  language,
  transcript,
  replyDraft,
  setReplyDraft,
  onSendReply,
}: {
  demoState: DemoState;
  setDemoState: (state: DemoState) => void;
  chosenOption: string | null;
  setChosenOption: (option: string) => void;
  researchMode: boolean;
  speakAloud: boolean;
  language: string;
  transcript: ConversationTurn[];
  replyDraft: string;
  setReplyDraft: (value: string) => void;
  onSendReply: () => void;
}) {
  return (
    <div className="mt-6 grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
      <section className="workspace-panel overflow-hidden" aria-labelledby="camera-title">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="section-icon">
              <Webcam size={18} />
            </div>
            <div>
              <h2 id="camera-title" className="font-display text-[21px]">
                Sign input
              </h2>
              <p className="text-xs text-muted-foreground">Indian Sign Language · camera area</p>
            </div>
          </div>
          <span className="experimental-badge">
            <Sparkle size={13} /> EXPERIMENTAL
          </span>
        </div>

        <div className="p-4 sm:p-6">
          <div className="camera-stage" aria-label="Camera placeholder. No live feed is connected.">
            <div className="camera-corner camera-corner-tl" />
            <div className="camera-corner camera-corner-tr" />
            <div className="camera-corner camera-corner-bl" />
            <div className="camera-corner camera-corner-br" />
            <div className="camera-stage-content">
              <div className="camera-icon-ring">
                <Webcam size={27} strokeWidth={1.6} />
              </div>
              <p className="mt-4 font-display text-[25px]">Camera preview</p>
              <p className="mt-1 text-sm text-muted-foreground">
                A live camera is not connected in this demo.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-accent" /> Placeholder · not recording
              </span>
            </div>
            <div className="camera-watermark">CLARIFYSIGN · ISL</div>
            <div className="floating-control-bar camera-control-bar">
              <div className="hidden flex-wrap gap-2 lg:flex" aria-label="Illustrative status indicators">
                <StatusBadge icon={<Hand size={13} />} label="Hands" />
                <StatusBadge icon={<Signal size={13} />} label="Pose" />
              </div>
              <span className="control-divider hidden lg:block" />
              <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Choose demo state">
              {(
                [
                  ["conversation", "Conversation"],
                  ["listening", "Interpreting"],
                  ["empty", "Empty"],
                ] as const
              ).map(([state, label]) => (
                <Button
                  key={state}
                  type="button"
                  size="sm"
                  variant={demoState === state ? "secondary" : "ghost"}
                  aria-pressed={demoState === state}
                  onClick={() => setDemoState(state)}
                  className="h-8 px-3 text-xs"
                >
                  {label}
                </Button>
              ))}
              </div>
            </div>
          </div>
        </div>

        <div className="camera-disclaimer flex items-start gap-2.5 px-5 py-3.5">
          <CircleHelp className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-xs leading-5 text-muted-foreground">
            Camera recognition is an experimental concept. This preview does not access or process a
            camera.
          </p>
        </div>
      </section>

      <section
        className="workspace-panel flex min-h-[620px] flex-col"
        aria-labelledby="conversation-title"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="section-icon section-icon-saffron">
              <ArrowLeftRight size={18} />
            </div>
            <div>
              <h2 id="conversation-title" className="font-display text-[21px]">
                Conversation
              </h2>
              <p className="text-xs text-muted-foreground">Customer &amp; shopkeeper</p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            aria-label="More conversation options"
            title="More options"
          >
            <MoreHorizontal />
          </Button>
        </div>

        <div className="flex-1 space-y-4 px-5 py-5">
          {demoState === "empty" ? (
            <div className="empty-state">
              <div className="section-icon mx-auto">
                <Hand size={21} />
              </div>
              <p className="mt-4 font-display text-[22px]">A conversation starts here.</p>
              <p className="mt-1 max-w-xs text-sm leading-6 text-muted-foreground">
                When someone signs or speaks, their message will appear here.
              </p>
              <p className="mt-4 text-[11px] font-medium uppercase text-muted-foreground">
                No messages yet
              </p>
            </div>
          ) : demoState === "listening" ? (
            <div className="interpreting-state" aria-live="polite">
              <div className="listening-pulse">
                <Hand size={22} />
              </div>
              <div>
                <p className="font-display text-[22px]">Interpreting a sign…</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Illustrative listening state · no recognition is running.
                </p>
              </div>
              <div className="listening-bars" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          ) : (
            <>
              <div className="conversation-date">
                <span>Today · sample conversation</span>
              </div>
              {transcript.map((turn) => (
                <div
                  key={turn.id}
                  className={`chat-turn ${turn.speaker === "shopkeeper" ? "chat-turn-right" : ""}`}
                >
                  <div
                    className={`speaker-avatar ${turn.speaker === "shopkeeper" ? "speaker-avatar-shop" : ""}`}
                    aria-hidden="true"
                  >
                    {turn.speaker === "customer" ? <Hand size={16} /> : "S"}
                  </div>
                  <div className="min-w-0 max-w-[min(88%,430px)]">
                    <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
                      {turn.label}
                      <span className="font-normal">· {turn.time}</span>
                    </div>
                    <div
                      className={`chat-bubble ${turn.speaker === "shopkeeper" ? "chat-bubble-shop" : "chat-bubble-customer"}`}
                    >
                      <p
                        className={`text-[15px] leading-6 ${turn.speaker === "customer" ? "font-indic" : ""}`}
                      >
                        {turn.text}
                      </p>
                      {turn.translation && (
                        <p className="mt-1.5 border-t border-current/10 pt-1.5 text-xs text-muted-foreground">
                          {turn.translation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="clarification-panel">
                <div className="flex items-start gap-3">
                  <div className="clarification-icon">
                    <CircleHelp size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold uppercase text-accent-foreground">
                        A quick clarification
                      </p>
                      <span className="text-[11px] text-muted-foreground">Sample prompt</span>
                    </div>
                    <p className="mt-1 font-display text-[19px]">{demoClarification.question}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {demoClarification.options.map((option) => (
                        <Button
                          key={option}
                          type="button"
                          size="sm"
                          variant={chosenOption === option ? "default" : "outline"}
                          aria-pressed={chosenOption === option}
                          onClick={() => setChosenOption(option)}
                          className="h-9"
                        >
                          {chosenOption === option && <Check size={14} />}
                          {option}
                        </Button>
                      ))}
                    </div>
                    {chosenOption && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Selected for this demo: {chosenOption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="conversation-composer border-t border-border px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-medium text-muted-foreground">Reply in {language}</span>
            <span className="text-[11px] text-muted-foreground">Text reply · demo only</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input
              value={replyDraft}
              onChange={(event) => setReplyDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onSendReply();
              }}
              className="h-10 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Type a reply…"
              aria-label="Type a reply"
            />
            <Button
              type="button"
              className="h-10 px-4"
              onClick={onSendReply}
              aria-label="Add reply to demo transcript"
            >
              Reply <ArrowRight size={15} />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 px-5 pb-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-primary" />{" "}
            {speakAloud ? "Speak aloud on" : "Speak aloud off"}
          </span>
          <span>{researchMode ? "Research mode on" : "Research mode off"}</span>
        </div>
      </section>
    </div>
  );
}

function StatusBadge({ icon, label }: { icon?: ReactNode; label: string }) {
  return (
    <span className="status-badge">
      {icon && <span className="text-primary">{icon}</span>}
      {label}
    </span>
  );
}

function VoiceToSign({
  language,
  setLanguage,
  draft,
  setDraft,
  shownText,
  speed,
  setSpeed,
  onShowSign,
  onNotice,
  onCopy,
}: {
  language: string;
  setLanguage: (language: string) => void;
  draft: string;
  setDraft: (value: string) => void;
  shownText: string;
  speed: string;
  setSpeed: (speed: string) => void;
  onShowSign: () => void;
  onNotice: (message: string) => void;
  onCopy: () => void;
}) {
  const [showMicNote, setShowMicNote] = useState(false);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);

  function downloadText() {
    if (!shownText) {
      onNotice("Prepare a text preview before downloading.");
      return;
    }
    const blob = new Blob([shownText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "clarifysign-message.txt";
    anchor.click();
    URL.revokeObjectURL(url);
    onNotice("Text file downloaded.");
  }

  async function shareText() {
    if (!shownText) {
      onNotice("Prepare a text preview before sharing.");
      return;
    }
    if (navigator.share) {
      try {
        await navigator.share({ title: "ClarifySign message", text: shownText });
      } catch {
        onNotice("Share was cancelled.");
      }
    } else {
      onNotice("Sharing isn't available in this preview.");
    }
  }

  return (
    <div className="mt-6 grid gap-5 xl:grid-cols-[0.86fr_1.14fr]">
      <section className="workspace-panel h-fit" aria-labelledby="voice-input-title">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="section-icon section-icon-saffron">
            <Volume2 size={18} />
          </div>
          <div>
            <h2 id="voice-input-title" className="font-display text-[21px]">
              Write your message
            </h2>
            <p className="text-xs text-muted-foreground">
              Prepare text for a sign-language preview
            </p>
          </div>
        </div>
        <div className="p-5">
          <label className="mb-2 block text-sm font-semibold" htmlFor="spoken-message">
            Message
          </label>
          <Textarea
            id="spoken-message"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="For example: Would you like a bag with your purchase?"
            className="min-h-36 resize-y rounded-md border-input bg-background p-3.5 text-[15px] leading-6 shadow-none placeholder:text-muted-foreground/70"
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              Written in {languages.find((item) => item.code === language)?.label}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 text-muted-foreground"
              onClick={() => setShowMicNote((current) => !current)}
              aria-label="Speech input information"
            >
              <Mic size={15} /> Speech input
            </Button>
          </div>
          {showMicNote && (
            <p className="mt-1 rounded-md bg-muted px-3 py-2 text-xs leading-5 text-muted-foreground">
              Speech input is not connected in this demo. You can type your message above.
            </p>
          )}
          <div className="mt-5 flex items-start gap-2 border-t border-border pt-4">
            <CircleHelp className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-xs leading-5 text-muted-foreground">
              The signing avatar is a non-animated placeholder. No translation or signing model is
              connected.
            </p>
          </div>
        </div>
      </section>

      <section className="workspace-panel overflow-hidden" aria-labelledby="avatar-title">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="section-icon">
              <Hand size={18} />
            </div>
            <div>
              <h2 id="avatar-title" className="font-display text-[21px]">
                Signing stage
              </h2>
              <p className="text-xs text-muted-foreground">
                Indian Sign Language · visual placeholder
              </p>
            </div>
          </div>
          <span className="demo-badge">
            <span className="size-1.5 rounded-full bg-accent" /> STATIC PREVIEW
          </span>
        </div>

        <div className="signing-stage ring-1 ring-white/10">
          <div className="stage-guides" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="avatar-figure" aria-hidden="true">
            <div className="avatar-halo" />
            <div className="avatar-head">
              <div className="avatar-hair" />
              <i className="avatar-eye avatar-eye-left" />
              <i className="avatar-eye avatar-eye-right" />
              <i className="avatar-smile" />
            </div>
            <div className="avatar-neck" />
            <div className="avatar-body">
              <span className="avatar-collar" />
            </div>
            <div className="avatar-arm avatar-arm-left" />
            <div className="avatar-arm avatar-arm-right" />
            <div className="avatar-hand avatar-hand-left">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="avatar-hand avatar-hand-right">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="stage-caption">
            <span className="text-[10px] font-semibold uppercase text-primary">
              {shownText ? "Text prepared" : "Ready for a message"}
            </span>
            <p className="mt-1 line-clamp-2 font-display text-[19px]" lang={language}>
              {shownText || "Your message will appear here."}
            </p>
          </div>
          <div className="stage-disclaimer">STATIC FIGURE · NOT AN ANIMATED SIGN</div>
          <div className="floating-control-bar translation-control-bar" role="group" aria-label="Translation and preview controls">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="sign-language" className="h-10 w-[132px] border-border bg-muted/60 shadow-none">
                <Languages className="size-4" /><SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((item) => <SelectItem key={item.code} value={item.code}>{item.native} · {item.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button type="button" onClick={onShowSign} className="h-10 gap-2 px-4">
              <Hand size={16} /> Show sign
            </Button>
            <span className="control-divider hidden sm:block" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="playback-icon"
              aria-label="Replay signing animation unavailable"
              title="Signing animation unavailable"
              disabled
            >
              <RotateCcw />
            </Button>
            <Button
              type="button"
              variant="default"
              size="icon"
              className="playback-play"
              aria-label="Signing animation unavailable"
              title="Signing animation unavailable"
              disabled
            >
              <Play />
            </Button>
            <span className="playback-status hidden xl:block">
              {shownText ? "Text prepared · no animation" : "Static preview · no motion"}
            </span>
            <span className="playback-divider" />
            <div className="relative">
              <Button
                type="button"
                variant="ghost"
                className="playback-speed"
                aria-expanded={showSpeedOptions}
                onClick={() => setShowSpeedOptions((current) => !current)}
              >
                {speed}
                <ChevronDown size={14} />
              </Button>
              {showSpeedOptions && (
                <div className="speed-menu" role="group" aria-label="Playback speed">
                  {["0.75×", "1×", "1.25×"].map((option) => (
                    <Button
                      key={option}
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between"
                      onClick={() => {
                        setSpeed(option);
                        setShowSpeedOptions(false);
                      }}
                    >
                      {option}
                      {speed === option && <Check size={13} />}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <span className="playback-divider" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="playback-icon"
              aria-label="Copy message text"
              title="Copy text"
              onClick={onCopy}
            >
              <Copy />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="playback-icon"
              aria-label="Download message text"
              title="Download text"
              onClick={downloadText}
            >
              <ArrowDownToLine />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="playback-icon"
              aria-label="Share message text"
              title="Share text"
              onClick={shareText}
            >
              <Share2 />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
