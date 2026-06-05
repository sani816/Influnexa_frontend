function ContactForm() {
  return (
    <section className="py-20">

      <div className="max-w-4xl mx-auto px-6 text-black">

        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Book Free Consultation
        </h2>

        <form className="bg-white p-8 rounded-xl shadow-lg">

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Your Name"
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-lg"
            />

          </div>

          <input
            type="text"
            placeholder="Company Name"
            className="border p-3 rounded-lg w-full mt-6"
          />

          <textarea
            rows="5"
            placeholder="Tell us about your campaign"
            className="border p-3 rounded-lg w-full mt-6"
          />

          <button
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg mt-6 hover:bg-indigo-700"
          >
            Submit
          </button>

        </form>

      </div>

    </section>
  );
}

export default ContactForm;