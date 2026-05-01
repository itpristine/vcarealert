"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  emailAddress: z.string().email("Valid email is required"),
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Zip code is required"),
  device: z.string().min(1, "Device selection is required"),
  mobilityIssues: z.string().min(1, "Please answer this question"),
  searchingForDevice: z.string().min(1, "Please answer this question"),
  heardAboutUs: z.string().min(1, "Please let us know how you heard about us"),
  comments: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function QuoteForm({ initialDevice = "" }: { initialDevice?: string }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      device: initialDevice,
      comments: "",
    }
  });

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) {
      fieldsToValidate = ["firstName", "lastName", "age", "gender", "phoneNumber", "emailAddress"];
    } else if (step === 2) {
      fieldsToValidate = ["streetAddress", "city", "state", "zipCode"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const response = await fetch("/api/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          pageUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      setIsSuccess(true);
      setStep(4);
    } catch (err) {
      console.error(err);
      setErrorMsg("An error occurred. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 w-full max-w-3xl mx-auto">
      {step < 4 && (
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Request Your Free Quote</h2>
          <p className="text-gray-500">Step {step} of 3</p>
          
          <div className="w-full bg-gray-100 h-2 rounded-full mt-6 overflow-hidden max-w-md mx-auto">
            <motion.div 
              className="bg-primary h-full rounded-full"
              initial={{ width: `${((step - 1) / 3) * 100}%` }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input {...register("firstName")} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input {...register("lastName")} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message as string}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input type="number" {...register("age")} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select {...register("gender")} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message as string}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" {...register("phoneNumber")} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                  {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" {...register("emailAddress")} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                  {errors.emailAddress && <p className="text-red-500 text-xs mt-1">{errors.emailAddress.message as string}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">Shipping Address</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input {...register("streetAddress")} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress.message as string}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input {...register("city")} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message as string}</p>}
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select {...register("state")} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                    <option value="">Select State</option>
                    <option value="CA">California</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                    <option value="NY">New York</option>
                    <option value="IL">Illinois</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="OTHER">Other</option>
                  </select>
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message as string}</p>}
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                  <input {...register("zipCode")} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                  {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode.message as string}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">Device & Preferences</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Which device are you interested in?</label>
                <select {...register("device")} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                  <option value="">Select a Device</option>
                  <option value="Home System">Home System</option>
                  <option value="Mobile System">Mobile System</option>
                  <option value="Smartwatch">Smartwatch</option>
                </select>
                {errors.device && <p className="text-red-500 text-xs mt-1">{errors.device.message as string}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Do you have Mobility Issues?</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="Yes" {...register("mobilityIssues")} className="text-primary focus:ring-primary w-4 h-4" />
                      <span className="text-base text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="No" {...register("mobilityIssues")} className="text-primary focus:ring-primary w-4 h-4" />
                      <span className="text-base text-gray-700">No</span>
                    </label>
                  </div>
                  {errors.mobilityIssues && <p className="text-red-500 text-xs mt-1">{errors.mobilityIssues.message as string}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Searching for a Medical Alert Device?</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="Yes" {...register("searchingForDevice")} className="text-primary focus:ring-primary w-4 h-4" />
                      <span className="text-base text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="No" {...register("searchingForDevice")} className="text-primary focus:ring-primary w-4 h-4" />
                      <span className="text-base text-gray-700">No</span>
                    </label>
                  </div>
                  {errors.searchingForDevice && <p className="text-red-500 text-xs mt-1">{errors.searchingForDevice.message as string}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us?</label>
                <select {...register("heardAboutUs")} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                  <option value="">Select an option</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Facebook/Social Media">Facebook / Social Media</option>
                  <option value="TV Commercial">TV Commercial</option>
                  <option value="Friend/Family">Friend / Family</option>
                  <option value="Healthcare Provider">Healthcare Provider</option>
                </select>
                {errors.heardAboutUs && <p className="text-red-500 text-xs mt-1">{errors.heardAboutUs.message as string}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments (Optional)</label>
                <textarea {...register("comments")} rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"></textarea>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">Quote Request Received!</h3>
              <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
                Thank you, {watch("firstName")}. Your request has been successfully submitted. One of our specialists will be in touch shortly to provide your customized quote.
              </p>
              <Link 
                href="/"
                className="inline-flex justify-center items-center px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl transition-colors"
              >
                Return Home
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-10">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={handlePrev}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button 
                type="button" 
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-blue-600 transition-all shadow-md shadow-primary/20"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-blue-600 transition-all shadow-md shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
