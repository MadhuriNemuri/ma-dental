import './index.css';

const stages = [
  { id: 1, label: 'Patient Info', active: true },
  { id: 2, label: 'Appointment Details' },
  { id: 3, label: 'Dental Concerns' },
  { id: 4, label: 'Confirmation' }
];

const assuranceItems = [
  { title: 'Clinic Assurance', body: 'Direct access & coordinated care with trained specialists.' },
  { title: 'Instant Booking Confirmation', body: 'Digital confirmation and reminders sent immediately.' },
  { title: 'Zero Cancellation Fees', body: 'No charge when rescheduling up to 24 prior to visit.' },
  { title: 'In-Network Insurance', body: 'Hassle-free claims support and streamlined billing.' }
];

const formRows = [
  { label: 'Full Name *', type: 'text', placeholder: 'John Doe', span: 'full' },
  { label: 'Date of Birth *', type: 'text', placeholder: 'MM/DD/YYYY', span: 'half' },
  { label: 'Gender Identity *', type: 'gender', span: 'half' },
  { label: 'Mobile Number *', type: 'tel', placeholder: '+1 (555) 000-0000', span: 'half' },
  { label: 'WhatsApp Number (Optional)', type: 'tel', placeholder: 'Same as mobile', span: 'half' },
  { label: 'Email Address *', type: 'email', placeholder: 'john.doe@example.com', span: 'full' },
  { label: 'City / Location *', type: 'select', placeholder: 'Health City, ST', span: 'half' },
  { label: 'Preferred Clinic Branch *', type: 'select', placeholder: 'Central Plaza Flagship (Suite 800)', span: 'half' }
];

function BookAppointmentPage() {
  return (
    <div className="booking-shell">
      <header className="booking-header-row">
        <div className="booking-breadcrumbs">
          <span className="crumb-home">Home</span>
          <span className="crumb-separator">/</span>
          <span>Book Appointment</span>
        </div>
      </header>

      <main className="booking-page">
        <section className="booking-title-row">
          <div className="booking-kicker">
            <span className="mini-dot" aria-hidden="true" />
            <span>Real-time Reservation Desk</span>
          </div>
          <h1>Schedule Your Visit</h1>
        </section>

        <div className="booking-layout">
          <aside className="booking-sidebar">
            <div className="reservation-card">
              <p className="sidebar-label">Reservation Stages</p>
              <ol>
                {stages.map((stage) => (
                  <li key={stage.id} className={stage.active ? 'active' : ''}>
                    <span className="step-number">{stage.id}</span>
                    <div className="step-copy">
                      <strong>{stage.label}</strong>
                      {stage.id === 1 && <small>Identity, contacts &amp; records</small>}
                      {stage.id === 2 && <small>Specialist, date &amp; preferred hour</small>}
                      {stage.id === 3 && <small>Symptoms, history &amp; x-ray scan</small>}
                      {stage.id === 4 && <small>Review, summary &amp; reminders</small>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="assurance-card">
              {assuranceItems.map((item) => (
                <div className="assurance-row" key={item.title}>
                  <span className="info-bullet">✓</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="help-card">
              <div className="help-header">
                <span className="help-icon">✦</span>
                <span>Direct Concierge</span>
              </div>
              <h3>Need help booking?</h3>
              <p>Our clinical care coordinators are on standby to guide you through insurance verification or emergency triage.</p>
              <div className="help-actions">
                <a href="https://wa.me/917799234108" className="whatsapp-button">WhatsApp</a>
                <a href="tel:+18007924632" className="call-button">Call Concierge</a>
              </div>
            </div>
          </aside>

          <section className="booking-form-card">
            <div className="card-header">
              <div>
                <p className="card-tag">Step 1 of 4</p>
                <h2>Patient Information</h2>
              </div>
              <button type="button" className="confidential-button">Confidential Form</button>
            </div>

            <div className="booking-form-grid">
              {formRows.map((row) => (
                <label key={row.label} className={`field field-${row.span}`}>
                  <span>{row.label}</span>
                  {row.type === 'gender' ? (
                    <div className="gender-group" role="radiogroup" aria-label="Gender identity">
                      <label className="gender-option active">
                        <input type="radio" name="gender" defaultChecked />
                        <span>Male</span>
                      </label>
                      <label className="gender-option">
                        <input type="radio" name="gender" />
                        <span>Female</span>
                      </label>
                      <label className="gender-option">
                        <input type="radio" name="gender" />
                        <span>Other</span>
                      </label>
                    </div>
                  ) : (
                    <>
                      {row.type === 'select' ? (
                        <select defaultValue="">
                          <option value="" disabled>{row.placeholder}</option>
                          <option>Health City, ST</option>
                          <option>Central Plaza Flagship (Suite 800)</option>
                        </select>
                      ) : (
                        <input type={row.type} placeholder={row.placeholder} />
                      )}
                    </>
                  )}
                </label>
              ))}
            </div>

            <div className="consent-box">
              <label className="radio-option active">
                <input type="radio" name="consent" defaultChecked />
                <span>Yes, I am a new patient</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="consent" />
                <span>No, I have records on file</span>
              </label>
            </div>

            <p className="consent-note">Complimentary 3D digital baseline scan included for first-time visits.</p>

            <div className="form-actions">
              <button type="button" className="secondary-action">Previous</button>
              <button type="button" className="primary-action">Continue to Appointment Details</button>
            </div>
          </section>
        </div>
      </main>

      <div className="booking-footer-strip">
        <div className="specialist-banner">
          <span className="panel-icon">✚</span>
          <div>
            <strong>Specialist Matching Algorithm</strong>
            <small>Step 2 will display vetted orthodontists, endodontists, &amp; surgeons.</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookAppointmentPage;
