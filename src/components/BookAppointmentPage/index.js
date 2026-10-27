import './index.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GOOGLE_SHEET_WEBHOOK_URL } from '../../config/sheetConfig';

const LOCATIONS = [
  'Pileru (Main Clinic)',
  'Tirupati',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kadapa',
  'Kurnool',
  'Vijayawada'
];

const SERVICES = [
  'Root Canal Treatment (RCT)',
  'Clear Aligners',
  'Dental Implants',
  'Cosmetic Dentistry (Smile Makeovers)',
  'Braces (Orthodontics)',
  'Kids & Family Care (General Dentistry)',
  'Teeth Cleaning & Polishing (Scaling)',
  'Tooth Extraction & Wisdom Tooth Care',
  'General Dental Consultation & Checkup'
];

function BookAppointmentPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: LOCATIONS[0],
    preferredDate: '',
    service: SERVICES[0],
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const downloadExcelSheet = () => {
    const stored = JSON.parse(localStorage.getItem('ma_dental_appointments') || '[]');
    if (stored.length === 0) {
      alert('No appointments recorded yet.');
      return;
    }

    const headers = [
      'Timestamp',
      'Reference ID',
      'Patient Name',
      'Phone Number',
      'Location Branch',
      'Preferred Date',
      'Dental Service',
      'Message',
      'Status'
    ];

    const rows = stored.map((item) => [
      `"${item.timestamp || ''}"`,
      `"${item.referenceId || ''}"`,
      `"${(item.fullName || '').replace(/"/g, '""')}"`,
      `"${(item.phone || '').replace(/"/g, '""')}"`,
      `"${(item.location || '').replace(/"/g, '""')}"`,
      `"${(item.preferredDate || '').replace(/"/g, '""')}"`,
      `"${(item.service || '').replace(/"/g, '""')}"`,
      `"${(item.message || '').replace(/"/g, '""')}"`,
      `"${item.status || 'Submitted Successfully'}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Ma_Dental_Appointments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadFormSlip = () => {
    const refCode = bookingRef || 'MD-' + Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const slipContent = `======================================================================
                         MA DENTAL CLINIC
                  APPOINTMENT CONFIRMATION SLIP
======================================================================

REFERENCE ID       : #${refCode}
BOOKING TIME       : ${dateStr}
STATUS             : Submitted Successfully

----------------------- PATIENT INFORMATION --------------------------
Patient Name       : ${formData.fullName}
Phone Number       : ${formData.phone}
Selected Location  : ${formData.location}

----------------------- TREATMENT DETAILS ----------------------------
Dental Service     : ${formData.service}
Preferred Date     : ${formData.preferredDate || 'Earliest Available'}
Message / Concerns : ${formData.message || 'None'}

----------------------- CLINIC BRANCHES ------------------------------
Branches           : Pileru (Main Clinic), Tirupati, Bangalore,
                     Hyderabad, Chennai, Kadapa, Kurnool, Vijayawada
Support Contact    : Instant WhatsApp & Call Confirmation

======================================================================
Thank you for choosing Ma Dental Clinic!
Please show this confirmation slip / reference ID at the clinic.
======================================================================`;

    const blob = new Blob([slipContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ma_Dental_Appointment_Form_${refCode}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert('Please fill in your Full Name and Phone Number.');
      return;
    }

    setIsSubmitting(true);
    const generatedRef = 'MD-' + Math.floor(1000 + Math.random() * 9000);
    setBookingRef(generatedRef);

    const record = {
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      referenceId: generatedRef,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      location: formData.location,
      preferredDate: formData.preferredDate || 'Earliest Available',
      service: formData.service,
      message: formData.message.trim() || 'None',
      status: 'Submitted Successfully'
    };

    // 1. Save locally so user can always download Excel sheet (.csv)
    try {
      const stored = JSON.parse(localStorage.getItem('ma_dental_appointments') || '[]');
      stored.push(record);
      localStorage.setItem('ma_dental_appointments', JSON.stringify(stored));
    } catch (err) {
      console.warn('LocalStorage save notice:', err);
    }

    // 2. Send directly to live Google Sheet (Excel) Webhook
    if (GOOGLE_SHEET_WEBHOOK_URL && GOOGLE_SHEET_WEBHOOK_URL.startsWith('http')) {
      try {
        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(record)
        });
      } catch (err) {
        console.error('Error posting to Google Sheet:', err);
      }
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const getWhatsAppUrl = () => {
    const refCode = bookingRef || 'MD-' + Math.floor(1000 + Math.random() * 9000);
    const text = `Hello Ma Dental Clinic, I have booked an appointment:
*Reference ID:* #${refCode}
*Patient Name:* ${formData.fullName}
*Phone Number:* ${formData.phone}
*Branch Location:* ${formData.location}
*Preferred Date:* ${formData.preferredDate || 'Earliest Available'}
*Selected Service:* ${formData.service}
${formData.message ? `*Patient Message:* ${formData.message}\n` : ''}
Please confirm my appointment. Thank you!`;
    return `https://wa.me/917799234108?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="ref-booking-wrapper">
      {/* UNIFIED DENTAL HERO BANNER (MATCHING REFERENCE POSTER ARCHITECTURE) */}
      <div className="unified-dental-banner">
        {/* TOP HEADER ROW: BREADCRUMBS LEFT, 4 TRUST BADGES RIGHT */}
        <header className="ref-top-header">
          <div className="ref-breadcrumbs">
            <Link to="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span>Book Appointment</span>
          </div>

          <div className="ref-top-badges">
            <div className="ref-badge-item">
              <div className="badge-round-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.5 2 7 4 7 6.5c0 2 .5 4 1 6.5.5 2.5 1 5 1.5 7 .5 2 2 2 2.5 0 .5-2 1-5 1.5-7 .5-2.5 1-4.5 1-6.5C14.5 4 13 2 12 2z"></path>
                </svg>
              </div>
              <span>Expert Dentists</span>
            </div>

            <div className="ref-badge-item">
              <div className="badge-round-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <span>Advanced Technology</span>
            </div>

            <div className="ref-badge-item">
              <div className="badge-round-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <span>Personalized Care</span>
            </div>

            <div className="ref-badge-item">
              <div className="badge-round-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <span>Your Smile Our Priority</span>
            </div>
          </div>
        </header>

        {submitted ? (
          /* ONLY THANK YOU FOR SUBMITTING DETAILS (NO IMAGE, NO PREVIOUS FORM) */
          <main className="ref-submitted-only-main">
            <div className="ref-submitted-card">
              {/* Top Tooth Watermark */}
              <svg
                className="ref-tooth-watermark"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                aria-hidden="true"
              >
                <path d="M30,15 C20,15 12,25 15,45 C18,65 24,85 36,92 C42,95 46,85 49,70 C50,65 52,65 53,70 C56,85 60,95 66,92 C78,85 84,65 87,45 C90,25 82,15 72,15 C60,15 54,26 51,26 C48,26 42,15 30,15 Z" />
              </svg>

              {/* Animated Right Mark Checkmark */}
              <div className="ref-checkmark-wrap" aria-hidden="true">
                <svg className="ref-checkmark-svg" viewBox="0 0 52 52">
                  <circle className="ref-checkmark-circle" cx="26" cy="26" r="24" fill="none" />
                  <path className="ref-checkmark-path" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
              </div>

              <div className="ref-success-badge">✓ Submission Successful</div>
              <h2 className="ref-success-title">Thank You for Submitting the Details!</h2>
              <p className="ref-success-desc">
                Dear <strong>{formData.fullName}</strong>, your appointment request has been submitted successfully to <strong>Ma Dental Clinic</strong>.
              </p>

              {/* Submitted Appointment Details */}
              <div className="ref-ticket-box">
                <div className="ref-ticket-head">
                  <span>CONFIRMATION SLIP</span>
                  <strong>REF #{bookingRef}</strong>
                </div>
                <div className="ref-ticket-grid">
                  <div className="ref-ticket-row">
                    <span>Patient Name:</span>
                    <strong>{formData.fullName}</strong>
                  </div>
                  <div className="ref-ticket-row">
                    <span>Phone Number:</span>
                    <strong>{formData.phone}</strong>
                  </div>
                  <div className="ref-ticket-row">
                    <span>Selected Location:</span>
                    <strong className="ref-highlight-text">{formData.location}</strong>
                  </div>
                  <div className="ref-ticket-row">
                    <span>Dental Service:</span>
                    <strong>{formData.service}</strong>
                  </div>
                  <div className="ref-ticket-row">
                    <span>Preferred Date:</span>
                    <strong>{formData.preferredDate || 'Earliest Available'}</strong>
                  </div>
                  <div className="ref-ticket-row">
                    <span>Status:</span>
                    <strong style={{ color: '#16a34a', fontWeight: '700' }}>✓ Submitted Successfully</strong>
                  </div>
                  {formData.message && (
                    <div className="ref-ticket-row ref-ticket-row-full">
                      <span>Message / Concerns:</span>
                      <em>"{formData.message}"</em>
                    </div>
                  )}
                </div>
              </div>

              {/* ACTION BUTTONS: DOWNLOAD THE FORM & OPTIONS */}
              <div className="ref-success-actions">
                <button
                  type="button"
                  className="ref-download-form-primary-btn"
                  onClick={downloadFormSlip}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" className="btn-download-icon">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download the Form</span>
                </button>

                <div className="ref-secondary-btns-row">
                  <button
                    type="button"
                    className="ref-excel-download-btn"
                    onClick={downloadExcelSheet}
                  >
                    <span>📊</span> Download Excel Sheet (.csv)
                  </button>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="ref-wa-btn"
                  >
                    <span>💬</span> WhatsApp Confirmation
                  </a>
                </div>

                <button
                  type="button"
                  className="ref-reset-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      phone: '',
                      location: LOCATIONS[0],
                      preferredDate: '',
                      service: SERVICES[0],
                      message: ''
                    });
                  }}
                >
                  &larr; Book Another Appointment
                </button>
              </div>
            </div>
          </main>
        ) : (
          /* UNIFIED BANNER BODY: IMAGE + CONTENT ON LEFT, FORM ON RIGHT */
          <main className="ref-banner-body">
          {/* LEFT AREA: PHOTO & SERVICES (NOT A SEPARATE CARD) */}
          <div className="ref-banner-left">
            {/* TEAM IMAGE WITH CURVED WAVE & TEAL ACCENT */}
            <div className="ref-team-image-frame">
            <img
              src={`${process.env.PUBLIC_URL || ''}/grp_image/IMG_6855.jpg`}
              alt="Ma Dental Doctors and Specialists Team"
              className="ref-team-photo"
              width="540"
              height="380"
              loading="lazy"
              decoding="async"
            />
            <div className="ref-photo-wave-divider">
              <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="ref-wave-svg"
                aria-hidden="true"
              >
                {/* Website Blue Accent Wedge on left */}
                <path
                  d="M 0,26 Q 280,88 560,74 L 560,120 L 0,120 Z"
                  fill="#2f39a9"
                />
                {/* White Curved Smile Wave */}
                <path
                  d="M 0,56 Q 320,108 720,78 Q 1000,50 1200,28 L 1200,120 L 0,120 Z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </div>

          {/* BELOW IMAGE: CLINIC HEADING & SERVICE PILLS (FROM REFERENCE) */}
          <div className="ref-left-content">
            <h2 className="ref-section-heading">
              Complete Modern <br />
              <span>Dental Care &amp; Specialties</span>
            </h2>

            <p className="ref-section-desc">
              We provide advanced dental treatments and personalized oral care solutions with a focus on comfort, precision and long-lasting results.
            </p>

            <div className="ref-script-line">
              Healthy Smiles . Confident You
            </div>

            {/* 6 CIRCULAR ICON SERVICES GRID (FROM REFERENCE) */}
            <div className="ref-services-grid">
              <div className="ref-service-pill">
                <div className="service-circle-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C8.5 2 7 4 7 6.5c0 2 .5 4 1 6.5.5 2.5 1 5 1.5 7 .5 2 2 2 2.5 0 .5-2 1-5 1.5-7 .5-2.5 1-4.5 1-6.5C14.5 4 13 2 12 2z"></path>
                  </svg>
                </div>
                <div className="service-text">
                  <strong>RCT</strong>
                  <small>(Root Canal Treatment)</small>
                </div>
              </div>

              <div className="ref-service-pill">
                <div className="service-circle-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="6" cy="12" r="4"></circle>
                    <circle cx="18" cy="12" r="4"></circle>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                  </svg>
                </div>
                <div className="service-text">
                  <strong>Aligners</strong>
                  <small>(Clear Aligners)</small>
                </div>
              </div>

              <div className="ref-service-pill">
                <div className="service-circle-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div className="service-text">
                  <strong>Implants</strong>
                  <small>(Dental Implants)</small>
                </div>
              </div>

              <div className="ref-service-pill">
                <div className="service-circle-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <div className="service-text">
                  <strong>Cosmetic Dentistry</strong>
                  <small>(Smile Makeovers)</small>
                </div>
              </div>

              <div className="ref-service-pill">
                <div className="service-circle-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="12" r="3"></circle>
                    <line x1="9" y1="12" x2="15" y2="12"></line>
                  </svg>
                </div>
                <div className="service-text">
                  <strong>Braces</strong>
                  <small>(Orthodontics)</small>
                </div>
              </div>

              <div className="ref-service-pill">
                <div className="service-circle-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <circle cx="9" cy="9" r="1"></circle>
                    <circle cx="15" cy="9" r="1"></circle>
                  </svg>
                </div>
                <div className="service-text">
                  <strong>Kids &amp; Family Care</strong>
                  <small>(General Dentistry)</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT AREA: THE FORM (OR SUCCESS STATE ON SUBMISSION) */}
        <div className="ref-banner-right">
          <div className="ref-form-card">
            {/* Top Right Tooth Watermark from Reference */}
            <svg
              className="ref-tooth-watermark"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              aria-hidden="true"
            >
              <path d="M30,15 C20,15 12,25 15,45 C18,65 24,85 36,92 C42,95 46,85 49,70 C50,65 52,65 53,70 C56,85 60,95 66,92 C78,85 84,65 87,45 C90,25 82,15 72,15 C60,15 54,26 51,26 C48,26 42,15 30,15 Z" />
            </svg>

            {/* THE FORM (EXACTLY MATCHING REFERENCE, EMAIL REMOVED, LOCATION ADDED) */}
            <form className="ref-actual-form" onSubmit={handleSubmit}>
                <div className="ref-form-kicker">
                  <svg className="kicker-tooth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 2C8.5 2 7 4 7 6.5c0 2 .5 4 1 6.5.5 2.5 1 5 1.5 7 .5 2 2 2 2.5 0 .5-2 1-5 1.5-7 .5-2.5 1-4.5 1-6.5C14.5 4 13 2 12 2z"></path>
                  </svg>
                  <span>BOOK YOUR APPOINTMENT</span>
                </div>

                <h3 className="ref-form-title">Get a Healthier Smile Today!</h3>
                <p className="ref-form-subtitle">
                  Fill in the form below and our team will get back to you shortly.
                </p>

                <div className="ref-form-fields">
                  {/* 1. FULL NAME */}
                  <div className="ref-input-group">
                    <span className="ref-field-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name *"
                      required
                    />
                  </div>

                  {/* 2. PHONE NUMBER */}
                  <div className="ref-input-group">
                    <span className="ref-field-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      required
                    />
                  </div>

                  {/* 3. LOCATION DROPDOWN (REPLACING EMAIL AS REQUESTED) */}
                  <div className="ref-input-group ref-select-group">
                    <span className="ref-field-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </span>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                    <span className="ref-select-caret">▾</span>
                  </div>

                  {/* 4. PREFERRED DATE */}
                  <div className="ref-input-group">
                    <span className="ref-field-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </span>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      placeholder="Preferred Date"
                    />
                  </div>

                  {/* 5. SELECT SERVICE */}
                  <div className="ref-input-group ref-select-group">
                    <span className="ref-field-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2C8.5 2 7 4 7 6.5c0 2 .5 4 1 6.5.5 2.5 1 5 1.5 7 .5 2 2 2 2.5 0 .5-2 1-5 1.5-7 .5-2.5 1-4.5 1-6.5C14.5 4 13 2 12 2z"></path>
                      </svg>
                    </span>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      {SERVICES.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                    <span className="ref-select-caret">▾</span>
                  </div>

                  {/* 6. YOUR MESSAGE (OPTIONAL) */}
                  <div className="ref-input-group ref-textarea-group">
                    <span className="ref-field-icon textarea-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message (Optional)"
                      rows="3"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button type="submit" className="ref-submit-button" disabled={isSubmitting}>
                  <span>{isSubmitting ? 'Saving to Excel Sheet...' : 'Book Appointment'}</span>
                  <span className="ref-btn-arrow">&rarr;</span>
                </button>
                <div className="ref-form-reassurance">
                  <span>🔒 Instant WhatsApp &amp; Call confirmation • No payment needed now</span>
                </div>
              </form>
          </div>
        </div>
      </main>
      )}

      {/* BOTTOM TRUST ROW (FROM REFERENCE) - ONLY WHEN NOT SUBMITTED */}
      {!submitted && (
        <section className="ref-trust-row">
          <div className="ref-trust-item">
            <div className="ref-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
            </div>
            <span>Modern Facilities</span>
          </div>

          <div className="ref-trust-divider" />

          <div className="ref-trust-item">
            <div className="ref-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <span>Experienced Team</span>
          </div>

          <div className="ref-trust-divider" />

          <div className="ref-trust-item">
            <div className="ref-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            </div>
            <span>Safe &amp; Hygienic Environment</span>
          </div>

          <div className="ref-trust-divider" />

          <div className="ref-trust-item">
            <div className="ref-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <span>Trusted by Our Patients</span>
          </div>
        </section>
      )}

      {/* BOTTOM LOCATIONS BAR WITH DENTAL WAVE CURVE (FROM REFERENCE) */}
      <footer className="ref-locations-ribbon">
        <div className="ref-locations-list">
          {LOCATIONS.map((loc, index) => {
            const cleanName = loc.replace(' (Main Clinic)', '');
            return (
              <span key={loc} className="ref-loc-entry">
                <svg className="ref-pin-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="ref-loc-name">{cleanName}</span>
                {index < LOCATIONS.length - 1 && <span className="ref-loc-sep">|</span>}
              </span>
            );
          })}
        </div>
      </footer>
      </div>
    </div>
  );
}

export default BookAppointmentPage;
