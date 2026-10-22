"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { CheckCircle2, Loader2 } from "lucide-react";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const leadTypes = [
  "VCare Alert",
  "Durable Medical Equipment",
  "Reverse Mortgage",
  "Senior Insurance",
  "Walk-In Bathtubs",
  "Final Expense",
  "Home Security",
  "Genetic Testing",
  "Other",
];

const fieldClassName =
  "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all";

export default function LeadGenerationQuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [leadType, setLeadType] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const resetCaptcha = () => {
    setCaptchaToken("");
    recaptchaRef.current?.reset();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (recaptchaSiteKey && !captchaToken) {
      setErrorMsg("Please complete the reCAPTCHA before submitting.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const requestData = Object.fromEntries(formData.entries());
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/submit-lead-generation-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...requestData, recaptchaToken: captchaToken }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.error || "Failed to submit your quotation request.");
      }

      setIsSuccess(true);
      resetCaptcha();
    } catch (error) {
      console.error("Lead generation quotation submission failed:", error);
      resetCaptcha();
      setErrorMsg(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Request received!</h3>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Thank you for sharing your requirements. Our team will review your request and
          contact you about a customized quotation.
        </p>
        <Link
          href="/"
          className="inline-flex justify-center items-center px-7 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10 space-y-6"
    >
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Request a Lead Generation Quote
        </h2>
        <p className="text-gray-600">
          Share a few details about your campaign and we’ll get back to you.
        </p>
      </div>

      {errorMsg && (
        <div role="alert" className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input id="lead-name" name="name" autoComplete="name" required minLength={2} maxLength={120} className={fieldClassName} />
        </div>
        <div>
          <label htmlFor="lead-company" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input id="lead-company" name="companyName" autoComplete="organization" required minLength={2} maxLength={160} className={fieldClassName} />
        </div>
        <div>
          <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input id="lead-email" name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClassName} />
        </div>
        <div>
          <label htmlFor="lead-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input id="lead-phone" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} className={fieldClassName} />
        </div>
        <div>
          <label htmlFor="lead-type" className="block text-sm font-medium text-gray-700 mb-1">
            Type of Leads Required
          </label>
          <select
            id="lead-type"
            name="leadType"
            value={leadType}
            onChange={(event) => setLeadType(event.target.value)}
            required
            className={fieldClassName}
          >
            <option value="">Select an industry or business</option>
            {leadTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        {leadType === "Other" && (
          <div>
            <label htmlFor="lead-other-industry" className="block text-sm font-medium text-gray-700 mb-1">
              Please specify the industry
            </label>
            <input
              id="lead-other-industry"
              name="otherIndustry"
              required
              minLength={2}
              maxLength={120}
              className={fieldClassName}
            />
          </div>
        )}
        <div>
          <label htmlFor="lead-location" className="block text-sm font-medium text-gray-700 mb-1">
            Target Location
          </label>
          <input id="lead-location" name="targetLocation" required minLength={2} maxLength={200} placeholder="City, state, region, or country" className={fieldClassName} />
        </div>
        <div>
          <label htmlFor="lead-count" className="block text-sm font-medium text-gray-700 mb-1">
            Required Number of Leads
          </label>
          <input id="lead-count" name="leadCount" type="number" required min={1} max={10000000} step={1} className={fieldClassName} />
        </div>
      </div>

      <div>
        <label htmlFor="lead-requirements" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Requirements <span className="text-gray-400">(Optional)</span>
        </label>
        <textarea
          id="lead-requirements"
          name="requirements"
          rows={4}
          maxLength={2000}
          placeholder="Tell us about your ideal audience, timeline, or any other requirements."
          className={`${fieldClassName} resize-y`}
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Verification</label>
        {recaptchaSiteKey ? (
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={recaptchaSiteKey}
            onChange={(token) => {
              setCaptchaToken(token ?? "");
              if (token) setErrorMsg("");
            }}
            onExpired={() => setCaptchaToken("")}
            onErrored={() => setErrorMsg("reCAPTCHA failed to load. Please refresh and try again.")}
          />
        ) : (
          <p className="text-sm text-amber-600">reCAPTCHA is not configured for this environment.</p>
        )}
      </div>

      <div className="pt-6 border-t border-gray-100 flex flex-col items-start gap-3">
        <button
          type="submit"
          disabled={isSubmitting || Boolean(recaptchaSiteKey && !captchaToken)}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-blue-600 transition-all shadow-md shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Request a Quotation"
          )}
        </button>
        <p className="text-xs text-gray-500 max-w-xl">
          By submitting this form, you agree that vCareAlert may contact you about your
          quotation request.
        </p>
      </div>
    </form>
  );
}
