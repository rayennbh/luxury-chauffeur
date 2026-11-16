import { useId } from "react";
import { ArrowUpRight, CheckCircle2, LockKeyhole } from "lucide-react";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { pocketbaseClient } from "@/lib/pocketbase-client";

export function EnquiryForm() {
  const prefix = useId();

  const form = useFormSubmission({
    submit: (_values, data) => {
      const date = String(data.get("requested_date") ?? "");
      const time = String(data.get("requested_time") ?? "");
      const requestedAt = new Date(`${date}T${time}`).getTime();

      if (!Number.isFinite(requestedAt) || requestedAt <= Date.now()) {
        throw new Error("Please choose a future appointment date.");
      }

      data.set("kind", "rendez-vous");

      return pocketbaseClient
        .collection("prime_requests")
        .create(data, { requestKey: null });
    },
  });

  if (form.isSuccess) {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={42} strokeWidth={1.4} />

        <h3>Thank you. Your appointment request has been received.</h3>

        <p>
          Our team will contact you to agree the appointment details.
          Your appointment is not confirmed until you hear from us.
        </p>

        <button
          type="button"
          className="text-link"
          onClick={form.reset}
        >
          Request another appointment
          <ArrowUpRight size={17} />
        </button>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={form.onSubmit}>
      <input {...form.honeypotProps} />

      <input type="hidden" name="kind" value="rendez-vous" />

      <h3>Appointment</h3>

      <div className="form-grid">
        <label htmlFor={`${prefix}-name`}>
          Your name *
          <input
            id={`${prefix}-name`}
            name="name"
            placeholder="Full name"
            autoComplete="name"
            required
            maxLength={150}
          />
        </label>

        <label htmlFor={`${prefix}-email`}>
          Your email *
          <input
            id={`${prefix}-email`}
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>
      </div>

      <div className="form-grid">
        <label htmlFor={`${prefix}-date`}>
          Preferred date *
          <input
            id={`${prefix}-date`}
            name="requested_date"
            type="date"
            required
          />
        </label>

        <label htmlFor={`${prefix}-time`}>
          Preferred time *
          <input
            id={`${prefix}-time`}
            name="requested_time"
            type="time"
            required
          />
        </label>
      </div>

      <label htmlFor={`${prefix}-phone`}>
        Phone *
        <input
          id={`${prefix}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Your phone number, including country code"
          required
          maxLength={50}
        />
      </label>

      <label htmlFor={`${prefix}-message`}>
        Additional details (optional)
        <textarea
          id={`${prefix}-message`}
          name="message"
          rows={4}
          placeholder="What would you like to discuss? Please include your time zone."
          maxLength={4000}
        />
      </label>

      <label className="consent-label">
        <input
          name="consent"
          type="checkbox"
          value="true"
          required
        />
        <span>
          I agree that my contact details may be used to respond to my
          appointment request. They will not be made public. *
        </span>
      </label>

      {form.isError && (
        <p className="form-error" role="alert">
          Your request could not be sent. Check your details and choose a
          future date and time, then try again.
        </p>
      )}

      <button
        type="submit"
        className="button button-blue form-submit"
        disabled={form.isSubmitting}
      >
        {form.isSubmitting ? "Sending…" : "Request an appointment"}
        <ArrowUpRight size={18} />
      </button>

      <p className="form-privacy">
        <LockKeyhole size={13} />
        Your information remains confidential.
      </p>
    </form>
  );
}