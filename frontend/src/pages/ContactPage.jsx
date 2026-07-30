import { useForm } from 'react-hook-form';
import {
  IoMailOutline,
  IoLocationOutline,
  IoCallOutline,
  IoPaperPlaneOutline,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoCheckmarkCircle,
} from 'react-icons/io5';
import SEO from '../components/common/SEO';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useSubmitContact } from '../hooks/useContact';
import { STUDIO_INFO } from '../constants/categories';

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitContactMutation = useSubmitContact();

  const onSubmit = (data) => {
    submitContactMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <>
      <SEO
        title="Book A Session & Contact | AJ Studio Photography"
        description="Get in touch with AJ Studio to reserve photography dates for weddings, fashion campaigns, portraits, or commercial commissions."
      />

      {/* Header Banner */}
      <div className="bg-neutral-900/60 border-b border-neutral-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
            Book Your <span className="gold-gradient-text">Commission</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Have a project in mind, an upcoming wedding, or a brand collaboration? Send us a message to discuss availability.
          </p>
        </div>
      </div>

      {/* Main Section */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-amber-500 text-xs uppercase tracking-widest font-semibold">
                  Direct Inquiries
                </span>
                <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
                  Let's Connect
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We respond to all genuine inquiries within 24 business hours.
                </p>
              </div>

              <div className="space-y-4">
                {/* Info Card 1 */}
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <IoMailOutline className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Email Address</h4>
                    <p className="text-xs text-yellow-400 mt-1 hover:underline">arshdeepsingh28482@gmail.com</p>
                  </div>
                </div>

                {/* Info Card 2 */}
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <IoCallOutline className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Phone / WhatsApp</h4>
                    <p className="text-xs text-yellow-400 mt-1 hover:underline">+91 9915381514</p>
                  </div>
                </div>

                {/* Info Card 3 */}
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <IoLocationOutline className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Studio Headquarters</h4>
                    <p className="text-xs text-neutral-300 mt-1">
                      <a
                        href="https://maps.app.goo.gl/qjmz1eFzrUj81ty8A"
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 hover:underline"
                      >
                        237-A, Shastri Nagar, Model Town, Ludhiana, Punjab 141002
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3 pt-4 border-t border-neutral-900">
                <h4 className="text-xs font-bold text-white uppercase tracking-widest">Follow & Connect</h4>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/its_arsh_jassal__"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-amber-400 hover:border-amber-500/50 transition-all"
                  >
                    <IoLogoInstagram className="w-4 h-4 text-amber-400" />
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/arshdeep.jassal.73"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-amber-400 hover:border-amber-500/50 transition-all"
                  >
                    <IoLogoFacebook className="w-4 h-4 text-amber-400" />
                    Facebook
                  </a>
                  <a
                    href="https://www.linkedin.com/in/arshdeep-singh-a12593334"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-amber-400 hover:border-amber-500/50 transition-all"
                  >
                    <IoLogoLinkedin className="w-4 h-4 text-amber-400" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                    Send Inquiry
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Fill in your details below and we will contact you with package details.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <Input
                    label="Full Name"
                    required
                    placeholder="Jane Doe"
                    error={errors.name?.message}
                    {...register('name', { required: 'Name is required' })}
                  />

                  {/* Email Input */}
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    error={errors.email?.message}
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Enter a valid email address',
                      },
                    })}
                  />
                   {/* Contect No. */}
                  <Input
                    label="Contact Number"
                    type="tel"
                    required
                    placeholder="+1 (555) 123-4567"
                    error={errors.phone?.message}
                    {...register('phone', {
                      required: 'Contact number is required',
                      pattern: {
                        value: /^\+?[\d\s\-\(\)]+$/,
                        message: 'Enter a valid contact number',
                      },
                    })} 

                  />
                </div>

                {/* Subject Input */}
                <Input
                  className="text-black"
                  label="Subject / Project Type"
                  required
                  placeholder="e.g., Wedding Photography Booking for Oct 2026"
                  error={errors.subject?.message}
                  {...register('subject', { required: 'Subject is required' })}
                />

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-300 tracking-wider uppercase">
                    Message <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us about your event, location, preferred dates, or specific visual requirements..."
                    className={`w-full bg-neutral-900/90 text-neutral-100 placeholder-neutral-500 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 p-4 ${errors.message
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-neutral-800 focus:border-amber-500/80'
                      }`}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters long',
                      },
                    })}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 font-medium pl-0.5">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"                       
                  variant="gold"
                  size="lg"
                  className="w-full flex items-center justify-center gap-6"
                  isLoading={submitContactMutation.isPending}
                >
                  <IoPaperPlaneOutline className="w-6 h-5" />
                  Submit Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
