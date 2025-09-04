"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/components/ui/use-toast";

const Schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  type: z.enum(["Work", "Study"]),
  role: z.string().min(2, "Please add a role or program"),
  country: z.enum(["Belgium", "Netherlands", "Germany", "Any"]).default("Any"),
  message: z.string().min(10, "Please share a bit more detail"),
  honey: z.string().optional(), // honeypot
});

type FormValues = z.infer<typeof Schema>;

export default function ApplyForm() {
  const { toast } = useToast();
  const qs = useSearchParams();
  const preType = (
    qs.get("type")?.toLowerCase() === "study" ? "Study" : "Work"
  ) as FormValues["type"];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { type: preType, country: "Any" },
  });

  async function onSubmit(values: FormValues) {
    if (values.honey) {
      reset();
      toast({ title: "Thanks!", description: "We’ll reply soon." });
      return;
    }

    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast({
        title: "Couldn’t submit",
        description: "Please try again or email info@myfuturelinks.com.",
        variant: "destructive",
      });
      return;
    }

    reset({ type: preType, country: "Any" });
    toast({
      title: "Application received ✅",
      description: "We’ll contact you by email.",
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        {...register("honey")}
      />

      <div>
        <Label htmlFor="name">Full name</Label>
        <Input id="name" placeholder="Jane Doe" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
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
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="+32 4X XX XX XX"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Application type</Label>
          <Select
            defaultValue={preType}
            onValueChange={(v) => setValue("type", v as FormValues["type"])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              <SelectItem value="Work">Work</SelectItem>
              <SelectItem value="Study">Study</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && (
            <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>
          )}
        </div>

        <div>
          <Label>Country preference</Label>
          <Select
            defaultValue="Any"
            onValueChange={(v) =>
              setValue("country", v as FormValues["country"])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="Belgium">Belgium</SelectItem>
              <SelectItem value="Netherlands">Netherlands</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-sm text-red-600 mt-1">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="role">Role / Program</Label>
        <Input
          id="role"
          placeholder="e.g., Care Assistant / Bachelor in IT"
          {...register("role")}
        />
        {errors.role && (
          <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Briefly describe your experience, education, or questions"
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
        {isSubmitting ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );
}
