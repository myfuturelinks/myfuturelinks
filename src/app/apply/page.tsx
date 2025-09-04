import Container from "@/components/site/container";
import ApplyForm from "@/components/forms/apply-form";

export default function ApplyPage() {
  return (
    <section className="py-16">
      <Container>
        <h1 className="text-3xl font-extrabold text-ink">Apply</h1>
        <p className="mt-3 text-neutral-700 leading-relaxed max-w-2xl">
          Submit your profile for Work or Study opportunities in Belgium, the
          Netherlands, and Germany.
        </p>

        <div className="mt-8 max-w-xl rounded-2xl p-6 ring-1 ring-ink/10 bg-white">
          <ApplyForm />
        </div>
      </Container>
    </section>
  );
}
