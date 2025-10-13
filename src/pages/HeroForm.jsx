import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle } from "lucide-react";

export default function HeroFormModal() {
  const [formData, setFormData] = useState({
    city: "",
    pincode: "",
    carType: "",
    noOfCars: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const { city, pincode, carType, noOfCars } = formData;
    if (!city || !pincode || !carType || !noOfCars) {
      setToast("Please fill all required fields");
      setTimeout(() => setToast(""), 3000);
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, phone } = formData;
    if (!firstName || !lastName || !phone) {
      setToast("Please fill all required fields");
      setTimeout(() => setToast(""), 3000);
      return;
    }

    try {
      setLoading(true);
      
      const submitData = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
      };

      const response = await fetch("http://localhost:5000/api/hero/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) throw new Error("Submission failed");

      setToast("Form submitted successfully!");
      setSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          city: "",
          pincode: "",
          carType: "",
          noOfCars: "",
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
        });
        setStep(1);
        setSubmitted(false);
        setToast("");
      }, 2000);
    } catch (err) {
      console.error(err);
      setToast("Error submitting form. Try again.");
      setTimeout(() => setToast(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white text-gray-800";

  const selectClass =
    "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white text-gray-800 cursor-pointer";

  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div             className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-50 p-4">
      <AnimatePresence mode="wait">
        {!submitted && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 px-8 py-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step === 1 ? 'bg-amber-400 text-slate-900' : 'bg-slate-600 text-white'}`}>
                    1
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step === 2 ? 'bg-amber-400 text-slate-900' : 'bg-slate-600 text-white'}`}>
                    2
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-1">
                {step === 1 ? "Your Car Details" : "Contact Information"}
              </h1>
              <p className="text-slate-300">
                {step === 1 ? "Step 1 of 2: Tell us about your vehicles" : "Step 2 of 2: How can we reach you?"}
              </p>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* City and Pincode in one line */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Enter your city"
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Pincode</label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Enter pincode"
                          required
                        />
                      </div>
                    </div>

                    {/* Car Type */}
                    <div>
                      <label className={labelClass}>Car Type</label>
                      <select
                        name="carType"
                        value={formData.carType}
                        onChange={handleChange}
                        className={selectClass}
                        required
                      >
                        <option value="">Select your car type</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Prime SUV+">Prime SUV+</option>
                        <option value="Traveller">Traveller</option>
                      </select>
                    </div>

                    {/* Number of Cars */}
                    <div>
                      <label className={labelClass}>Number of Cars to Attach</label>
                      <select
                        name="noOfCars"
                        value={formData.noOfCars}
                        onChange={handleChange}
                        className={selectClass}
                        required
                      >
                        <option value="">Select number of cars</option>
                        <option value="Upto 5+">Upto 5+</option>
                        <option value="Upto 10+">Upto 10+</option>
                        <option value="Upto 25+">Upto 25+</option>
                        <option value="Upto 50+">Upto 50+</option>
                      </select>
                    </div>

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-lg hover:from-amber-600 hover:to-amber-700 transition flex items-center justify-center gap-2 mt-8"
                    >
                      Next
                      <ChevronRight size={20} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* First Name and Last Name in one line */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Your first name"
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Your last name"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your phone number"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className={labelClass}>Email (Optional)</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your email address"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-8">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 py-3 px-4 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold shadow-lg hover:from-green-700 hover:to-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {submitted && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex justify-center mb-4"
            >
              <CheckCircle size={64} className="text-green-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
            <p className="text-gray-600 mb-6">Your form has been submitted successfully. We'll contact you soon!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg font-medium"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}