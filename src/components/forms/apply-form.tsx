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

const CountryEnum = z.enum(["Belgium", "Netherlands", "Germany", "Any"]);
const TypeEnum = z.enum(["Work", "Study"]);

const Schema = z.object({
  name: z.string().min(2, "Please enter your full name").max(80),
  email: z.string().email("Enter a valid email").max(120),
  type: TypeEnum,
  role: z.string().min(2, "Please enter a role/program").max(120),
  country: CountryEnum, // ✅ required, not optional
  message: z.string().min(10, "Please write at least 10 characters").max(2000),
  phone: z.string().optional(),
  honey: z.string().optional(), // honeypot
});

type FormValues = z.infer<typeof Schema>;

export default function ApplyForm() {
  const params = useSearchParams();

  // optional prefill from URL, e.g., ?type=Work or ?type=Study
  const preType: z.infer<typeof TypeEnum> =
    params.get("type")?.toLowerCase() === "study" ? "Study" : "Work";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      type: preType,
      country: "Any", // ✅ default to satisfy the required field
    },
  });

  const onSubmit = async (values: FormValues) => {
    // TODO: send to your API (or reuse contact route if desired)
    // For now, just log and clear message/phone:
    console.log("apply-submit", values);
    reset({ ...values, message: "", phone: "" });
  };

  const type = watch("type");
  const country = watch("country");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {/* honeypot (hidden) */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("honey")}
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

      <div className="grid md:grid-cols-2 gap-4">
        {/* Type */}
        <div>
          <Label>Type</Label>
          <Select
            value={type}
            onValueChange={(v) =>
              setValue("type", v as FormValues["type"], {
                shouldValidate: true,
              })
            }
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

        {/* Country */}
        <div>
          <Label>Preferred country</Label>
          <Select
            value={country}
            onValueChange={(v) =>
              setValue("country", v as FormValues["country"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
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
        <Label htmlFor="role">
          {type === "Work" ? "Job title" : "Program name"}
        </Label>
        <Input
          id="role"
          placeholder={
            type === "Work"
              ? "e.g., Warehouse Operator"
              : "e.g., BSc Information Technology"
          }
          {...register("role")}
        />
        {errors.role && (
          <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input id="phone" placeholder="+9779800000000" {...register("phone")} />
        {errors.phone && (
          <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder={
            type === "Work"
              ? "Tell us about your experience and preferred role…"
              : "Tell us about your background and program interest…"
          }
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="px-5 py-3 bg-ink text-white rounded-xl"
      >
        {isSubmitting ? "Submitting…" : "Submit"}
      </Button>
    </form>
  );
}
