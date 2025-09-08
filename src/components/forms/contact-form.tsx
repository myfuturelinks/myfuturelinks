// src/components/forms/contact-form.tsx
"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

type Category = "Category" | "Work" | "Study";

const FormSchema = z.object({
  name: z.string().min(2, "Please enter your full name").max(80),
  email: z.string().email("Enter a valid email").max(120),
  // category: z.enum(["Category", "Work", "Study"], {
  //   required_error: "Please choose a category",
  // }),
  category: z
    .enum(["Category", "Work", "Study"])
    .refine((v) => v !== "Category", {
      message: "Please choose Work or Study",
    }),
  // local phone parts; we will assemble phoneE164 on submit
  phoneCountry: z.string().optional(), // like "+977"
  phoneLocal: z.string().optional(), // user digits
  message: z.string().min(10, "Please write at least 10 characters").max(2000),
  // hidden honeypot
  company: z.string().optional(),
  // optional captcha token (unused unless you enable Turnstile)
  tsToken: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

function formatDuration(s: number) {
  if (s >= 60) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    if (sec === 0) return `${m} minute${m > 1 ? "s" : ""}`;
    return `${m}m ${sec}s`;
  }
  return `${s}s`;
}

export default function ContactForm() {
  const { toast } = useToast();
  const params = useSearchParams();

  // Cooldown state (in seconds)
  const [cooldown, setCooldown] = React.useState(0);
  React.useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((x) => Math.max(0, x - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  // Prefill category from query: ?category=Work|Study
  const preCategory = React.useMemo<Category>(() => {
    const q = (params.get("category") || "").toLowerCase();
    if (q === "work") return "Work";
    if (q === "study") return "Study";
    return "Category";
  }, [params]);

  // Optional prefill message from job/program slug (nice UX)
  const prefillNote = React.useMemo(() => {
    const job = params.get("job");
    const program = params.get("program");
    if (job) return `I’m interested in job: ${job}.`;
    if (program) return `I’m interested in program: ${program}.`;
    return "";
  }, [params]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      category: preCategory,
      phoneCountry: "+977", // default Nepal
      phoneLocal: "",
      message: prefillNote ? `${prefillNote}\n` : "",
      company: "",
    },
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = form;

  // Assemble E.164 if possible
  function buildE164(cc?: string, local?: string) {
    const digits = (local || "").replace(/\D/g, "");
    const code = (cc || "").trim();
    if (!code || !digits) return undefined;
    const plus = code.startsWith("+") ? code : `+${code}`;
    return `${plus}${digits}`;
  }

  const onSubmit = async (values: FormValues) => {
    const phoneE164 = buildE164(values.phoneCountry, values.phoneLocal);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          category: values.category,
          message: values.message,
          phoneE164, // send only if valid; server will validate
          company: values.company, // honeypot
          // tsToken: ...            // if you enable Turnstile
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Handle server cooldown
        if (res.status === 429 && data?.code === "COOLDOWN") {
          const wait = Number(data?.retryAfter || 60);
          setCooldown(wait);
          toast({
            title: "Please wait a moment",
            description: `You’ve just sent us a message. You can send another after ${formatDuration(
              wait
            )}.`,
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Could not send",
          description: data?.error || "Please try again shortly.",
          variant: "destructive",
        });
        return;
      }

      // Success
      toast({
        title: "Message sent",
        description: "Thanks! We’ll reply by email.",
      });

      // Optionally reset some fields (keep category)
      setValue("message", "");
      setValue("phoneLocal", "");
    } catch (e) {
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  const category = watch("category");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {/* Honeypot (hidden) */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("company")}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Your name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Category */}
      <div>
        <Label>Category</Label>
        <Select
          value={category}
          onValueChange={(v) =>
            setValue("category", v as FormValues["category"], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200">
            <SelectItem value="Category">Category</SelectItem>
            <SelectItem value="Work">Work</SelectItem>
            <SelectItem value="Study">Study</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Phone (country code + local digits) */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label>Country code</Label>
          <Select
            defaultValue={form.getValues("phoneCountry")}
            onValueChange={(v) => setValue("phoneCountry", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="+977" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              {/* Common options first */}
              <SelectItem value="+977">🇳🇵 +977 (Nepal)</SelectItem>
              <SelectItem value="+356">🇲🇹 +356 (Malta)</SelectItem>
              <SelectItem value="+32">🇧🇪 +32 (Belgium)</SelectItem>
              <SelectItem value="+31">🇳🇱 +31 (Netherlands)</SelectItem>
              <SelectItem value="+49">🇩🇪 +49 (Germany)</SelectItem>
              {/* Add more as needed */}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Label htmlFor="phoneLocal">Phone</Label>
          <Input
            id="phoneLocal"
            inputMode="tel"
            placeholder="9800000000"
            {...register("phoneLocal")}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder={
            category === "Work"
              ? "Tell us about your experience and preferred role…"
              : category === "Study"
              ? "Tell us about your background and program interest…"
              : "How can we help?"
          }
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={isSubmitting || cooldown > 0}
          className="px-5 py-3 bg-ink text-white rounded-xl disabled:opacity-60"
        >
          {cooldown > 0
            ? `Wait ${formatDuration(cooldown)}`
            : isSubmitting
            ? "Sending…"
            : "Send"}
        </Button>
        <p className="text-xs text-neutral-500">
          Anti-spam: you can send again after{" "}
          {formatDuration(Math.max(cooldown, 60))}
        </p>
      </div>
    </form>
  );
}
