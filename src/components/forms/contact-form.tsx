"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { countryDials } from "@/lib/phone-codes";

const FormSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  category: z.enum(["Category", "Work", "Study"]).default("Category"),
  // phone parts
  countryDial: z.string().regex(/^\+\d{1,3}$/, "Choose a country code"),
  phone: z
    .string()
    .min(6, "Too short")
    .max(15, "Too long")
    .regex(/^\d+$/, "Digits only"),
  message: z.string().min(10, "Please share a bit more detail"),
  company: z.string().optional(), // honeypot
});

type FormValues = z.infer<typeof FormSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const params = useSearchParams();
  const pre = (params.get("category") as FormValues["category"]) || "Category";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: pre,
      countryDial: "+977", // default; change if you prefer
    },
  });

  const selectedDial = watch("countryDial");

  async function onSubmit(values: FormValues) {
    // Honeypot
    if (values.company && values.company.length > 0) {
      reset();
      toast({ title: "Message received", description: "We’ll reply soon." });
      return;
    }

    // Compose E.164 phone number
    const digits = values.phone.replace(/\D/g, "");
    const phoneE164 = `${values.countryDial}${digits}`;
    const validE164 = /^\+\d{6,15}$/.test(phoneE164);
    if (!validE164) {
      toast({
        title: "Invalid phone number",
        description: "Please check the country code and digits.",
        variant: "destructive",
      });
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, phoneE164 }),
    });

    if (!res.ok) {
      toast({
        title: "Couldn’t send your message",
        description: "Please try again or email info@myfuturelinks.com.",
        variant: "destructive",
      });
      return;
    }

    reset({ category: pre, countryDial: values.countryDial });
    toast({ title: "Thanks!", description: "We’ll be in touch via email." });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {/* honeypot */}
      <input
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        {...register("company")}
      />

      <div>
        <Label htmlFor="name">Full name</Label>
        <Input id="name" placeholder="Jane Doe" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="jane@email.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* PHONE */}
      <div>
        <Label>Phone</Label>
        <div className="grid grid-cols-[140px,1fr] gap-2">
          <Select
            defaultValue={selectedDial}
            onValueChange={(v) => setValue("countryDial", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Code" />
            </SelectTrigger>
            {/* Solid background to avoid transparency issues */}
            <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-md max-h-72 overflow-auto">
              {countryDials.map((c) => (
                <SelectItem key={c.code} value={c.dial}>
                  {c.flag} {c.name} ({c.dial})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder="98XXXXXXXX"
            {...register("phone")}
          />
        </div>
        {(errors.countryDial || errors.phone) && (
          <p className="text-sm text-red-600 mt-1">
            {errors.countryDial?.message || errors.phone?.message}
          </p>
        )}
      </div>

      <div>
        <Label>Category</Label>
        <Select
          defaultValue={pre}
          onValueChange={(v) =>
            setValue("category", v as FormValues["category"])
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-md">
            <SelectItem value="Category">Category</SelectItem>
            <SelectItem value="Work">Work</SelectItem>
            <SelectItem value="Study">Study</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Tell us about your profile or questions"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-ink text-white rounded-xl"
      >
        {isSubmitting ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}
