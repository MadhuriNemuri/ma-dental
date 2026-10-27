import './index.css';
import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

const treatmentsData = [
  {
    id: 'rct',
    number: '01',
    category: 'Endodontics (Root Canal)',
    title: 'Root Canal Treatment (RCT)',
    description: "Precision microscopic root disinfection and warm bioactive obturation to permanently resolve pulpal infection while preserving the tooth's natural root architecture.",
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-01.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_popup/image 355.png`,
    overview: 'Root Canal Treatment (Endodontic therapy) is a specialized procedure designed to eliminate infection from the tooth innermost pulp chamber while saving your natural tooth from extraction. At Ma Dental, our specialists use computer-guided digital apex locators, microscopic rotary instruments, and bioactive bioceramic sealers to thoroughly disinfect the root canals with near-zero discomfort.',
    duration: '45 – 60 Mins',
    recovery: 'Within 24 Hours',
    longevity: 'Lifetime with Crown',
    comfort: '100% Pain-Free Local',
    highlights: [
      'Single-visit and two-visit microscopic rotary cleaning',
      '3D warm gutta-percha bioceramic hermetic sealing',
      'Permanent tooth preservation eliminating extraction need',
      '100% painless treatment under gentle profound anesthesia'
    ],
    idealFor: 'Severe lingering toothache, deep decay reaching the nerve, biting sensitivity, dental abscess, or cracked teeth with pulpal inflammation.'
  },
  {
    id: 'crowns',
    number: '02',
    category: 'Cosmetic Dentistry',
    title: 'Ceramic & Zirconia Crowns',
    description: 'Custom multi-layered monolithic restorations crafted to flawlessly mirror natural enamel translucency, structural flexure, and optimal chewing resistance.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-02.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_popup/image 357.png`,
    overview: 'Our precision-milled Zirconia and E-Max lithium disilicate crowns offer extraordinary mechanical strength paired with lifelike optical translucency. Engineered using 3D digital intraoral scanning, each restoration replicates the natural anatomy, color gradients, and chewing functionality of healthy human enamel.',
    duration: '2 Quick Sessions',
    recovery: 'Zero Downtime',
    longevity: '15 – 25+ Years',
    comfort: 'High-Strength Monolithic',
    highlights: [
      'Metal-free biocompatible materials with zero gray gum lines',
      'Multi-layered natural color matching and incisal translucency',
      'High flexural strength (>1200 MPa) resilient to heavy chewing',
      'Digital 3D CAD/CAM scan eliminates messy impression trays'
    ],
    idealFor: 'Root canal treated teeth, broken or severely worn enamel, fractured cusps, large failing fillings, and cosmetic smile enhancement.'
  },
  {
    id: 'implants',
    number: '03',
    category: 'Implantology & Oral Surgery',
    title: 'Dental Implants',
    description: '3D computer-guided osseointegration delivering permanent, natural-feeling tooth replacements that preserve bone density and youthful facial symmetry.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-03.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_popup/image 359.png`,
    overview: 'Dental implants are the gold standard for permanent tooth replacement. Using 3D CBCT bone diagnostics and surgical navigation templates, medical-grade titanium or zirconia posts are placed seamlessly into the jawbone, fusing securely through osseointegration to function exactly like natural tooth roots.',
    duration: '30 – 45 Mins / Tooth',
    recovery: '2 – 3 Days Gentle',
    longevity: 'Permanent Lifetime',
    comfort: '98.5% Osseointegration',
    highlights: [
      'Preserves jawbone density and stops facial muscle sagging',
      'Zero grinding or damage to neighboring healthy teeth',
      'Natural bite force and chewing dynamics restored 100%',
      'Options for single tooth, multiple missing teeth, or full arch'
    ],
    idealFor: 'Single or multiple missing teeth, loose uncomfortable dentures, or teeth with non-restorable roots.'
  },
  {
    id: 'replacement',
    number: '04',
    category: 'Cosmetic Dentistry',
    title: 'Teeth Replacement',
    description: 'Holistic full-arch and bridge reconstructions that seamlessly restore full bite mechanics, confident phonetic articulation, and lifelike aesthetics.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-04.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_popup/image 388.png`,
    overview: 'Whether replacing a single lost tooth or an entire dental arch, our modern prosthodontic solutions—including fixed bridges, implant-supported crowns, and hybrid arches—restore pristine phonetic articulation, confident smiles, and full occlusal harmony.',
    duration: '1 – 3 Weeks Custom',
    recovery: 'Immediate Function',
    longevity: '10 – 20+ Years',
    comfort: 'Bio-Ceramic Hybrid',
    highlights: [
      'Restores clear pronunciation and confident chewing power',
      'Prevents adjacent teeth from drifting and collapsing bite',
      'Custom shade-matched to match your skin tone and natural teeth',
      'Tailored solutions for every clinical and budgetary need'
    ],
    idealFor: 'Gaps caused by extracted or lost teeth, bite collapse, difficulty chewing, or aesthetic smile rejuvenation.'
  },
  {
    id: 'children',
    number: '05',
    category: 'Pediatric & Preventive Care',
    title: "Special Care for Children's Teeth",
    description: 'Gentle, anxiety-free developmental dentistry focusing on remineralization, airway development, and positive oral habits in an unhurried sanctuary.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-05.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_popup/image 390.png`,
    overview: 'Pediatric dental care at Ma Dental is tailored for gentle, positive, and anxiety-free visits. From infant oral health checks and gentle fluoride remineralization to pit-and-fissure sealants and interceptive myofunctional coaching, we safeguard developing milk teeth to foster a lifetime of confident smiles.',
    duration: '30 Mins Gentle',
    recovery: 'Immediate Same-Day',
    longevity: 'Long-Term Prevention',
    comfort: '100% Anxiety-Free',
    highlights: [
      'Child-friendly environment with gentle behavioral management',
      'BPA-free pit and fissure sealants for molars',
      'Fluoride varnish remineralization for early enamel lesions',
      'Early habit correction (thumb sucking, tongue thrusting, mouth breathing)'
    ],
    idealFor: 'Children aged 1 to 14, early childhood caries, preventive sealants, space maintenance, and establishing positive dental hygiene habits.'
  },
  {
    id: 'wisdom-teeth',
    number: '06',
    category: 'Implantology & Oral Surgery',
    title: 'Extraction of Wisdom Teeth',
    description: 'Atraumatic, minimally invasive surgical removal utilizing 3D CBCT navigation and PRF autologous healing for rapid, painless tissue recovery.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-06.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_popup/image 390 (1).png`,
    overview: 'Impacted or misaligned third molars (wisdom teeth) can cause severe pain, pericoronitis infection, cyst formation, and crowding of front teeth. Our oral surgeons perform atraumatic, minimally invasive removals guided by 3D CBCT nerve mapping for ultra-fast, smooth recovery.',
    duration: '20 – 40 Mins / Tooth',
    recovery: '2 – 3 Days Healing',
    longevity: 'Permanent Relief',
    comfort: 'PRF Clot Accelerated',
    highlights: [
      'Micro-surgical extraction minimizes swelling and post-op pain',
      'Advanced 3D CBCT nerve safety mapping prevents complications',
      'Dissolvable sutures and PRF clot acceleration for fast healing',
      'Comprehensive post-operative healing care and medication support'
    ],
    idealFor: 'Impacted wisdom teeth, recurring pericoronitis gum swelling, jaw stiffness, orthodontic crowding prevention, and un-erupted molars.'
  },
  {
    id: 'dentures',
    number: '07',
    category: 'Cosmetic Dentistry',
    title: 'Removable & BPS Dentures',
    description: 'Biofunctional Prosthetic System (BPS) engineering offering exceptional suction, stable chewing dynamics, and lifelike individualized gum aesthetics.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-07.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_popup/image 390 (2).png`,
    overview: 'Biofunctional Prosthetic System (BPS) dentures represent the pinnacle of removable prosthodontics. Fabricated under controlled high-pressure injection molding with biocompatible composite teeth, BPS dentures offer unmatched suction retention, natural gum aesthetics, and supreme chewing stability.',
    duration: '4 – 5 Precision Steps',
    recovery: '1 – 2 Weeks Habit',
    longevity: '7 – 10+ Years',
    comfort: 'Suction-Grip Stability',
    highlights: [
      'Superior suction grip prevents slippage while eating or speaking',
      'Anatomical multi-layer gum contouring matches natural tissue',
      'Wear-resistant micro-hybrid teeth ensure sharp chewing efficiency',
      'Available as partial, complete, or flexible Valplast frameworks'
    ],
    idealFor: 'Patients with multiple or complete tooth loss, individuals seeking non-surgical tooth restoration, or replacing old loose dentures.'
  },
  {
    id: 'laser-gum',
    number: '08',
    category: 'Periodontics & Gum Care',
    title: 'Laser Treatment for Gum Problems',
    description: 'Targeted photonic therapy that sterilizes deep periodontal pockets, eradicates harmful bacteria, and stimulates natural tissue regeneration without sutures.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-08.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_popup/image 390 (3).png`,
    overview: 'Modern soft-tissue dental lasers allow us to treat gingivitis, deep periodontal pockets, and gum disease without scalpels, incisions, or sutures. The concentrated wavelength selectively targets pathogenic bacteria and diseased sulcular lining while biostimulating healthy collagen and bone regeneration.',
    duration: '30 – 45 Mins',
    recovery: 'Same Day (No Cuts)',
    longevity: 'Long-Term Health',
    comfort: '99.9% Sterilization',
    highlights: [
      'No scalpels, surgical cutting, or uncomfortable stitches required',
      'Coagulates blood vessels instantly for virtually bloodless care',
      'Promotes rapid biological re-attachment of gums to tooth roots',
      'Also used for cosmetic gum depigmentation and gummy smile reduction'
    ],
    idealFor: 'Bleeding or swollen gums, persistent bad breath (halitosis), deep gum pockets, mobile teeth, and dark melanin gum hyperpigmentation.'
  },
  {
    id: 'tmj',
    number: '09',
    category: 'Implantology & Oral Surgery',
    title: 'Jaw Joint Treatment (TMJ / TMD)',
    description: 'Neuromuscular diagnostic deprogramming and customized physiological splint orthotics to relieve jaw tension, clenching pain, and chronic facial headaches.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-09.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_popup/image 391.png`,
    overview: 'Temporomandibular Joint Disorder (TMD) causes clicking noises, jaw locking, chronic facial headaches, earache, and bruxism (nighttime teeth grinding). Our neuromuscular therapy combines digital occlusal bite mapping, physiological deprogramming splints, and muscle relaxation to achieve long-term orthopedic balance.',
    duration: '45 Min Evaluation',
    recovery: 'Immediate Splint Relief',
    longevity: 'Orthopedic Balance',
    comfort: 'Non-Surgical Protocol',
    highlights: [
      'Relieves severe morning jaw soreness and chronic temple headaches',
      'Custom precision nightguards protect teeth from heavy attrition wear',
      'Corrects bite interferences and joint disc compression',
      'Physical therapy, trigger point therapy, and ergonomic posture coaching'
    ],
    idealFor: 'Jaw clicking or popping, jaw locking, chronic tension headaches, clenching/grinding teeth at night, and chewing fatigue.'
  },
  {
    id: 'whitening',
    number: '10',
    category: 'Cosmetic Dentistry',
    title: 'Teeth Whitening',
    description: 'pH-balanced, biological oxygenation therapies that brighten enamel multiple shades without abrasive micro-scratching or post-procedure dentin sensitivity.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-10.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_popup/Container.png`,
    overview: 'Experience a dramatically brighter, luminous smile in a single 45-minute clinic session. Our advanced, pH-buffered in-office whitening system activates active oxygen molecules to break down stubborn tea, coffee, smoking, and aging stains safely within the enamel pores without harming tooth structure.',
    duration: '45 – 60 Mins',
    recovery: 'Immediate Sparkle',
    longevity: '1 – 3 Years Lasting',
    comfort: 'Zero Enamel Abrasion',
    highlights: [
      'Professional in-office whitening delivers instant dramatic results',
      'Up to 6 – 8 shades whiter in a single comfortable visit',
      'Integrated desensitizers protect nerve endings and enamel',
      'Safe, non-abrasive formula preserves protective enamel luster'
    ],
    idealFor: 'Yellowed or discolored teeth, coffee/tea/tobacco stains, wedding or special event smile prep, and general smile enhancement.'
  },
  {
    id: 'braces',
    number: '11',
    category: 'Orthodontics & Clear Aligners',
    title: 'Alignment of Teeth (Braces)',
    description: 'Ultra-low profile sapphire and ceramic self-ligating brackets engineered for controlled tooth biomechanics and immaculate long-term arch harmonization.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-11.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-11.jpg`,
    overview: 'Orthodontic braces gently guide crowded, rotated, or spaced teeth into immaculate alignment and functional bite harmony. We offer modern ultra-low-profile metal brackets, tooth-colored ceramic brackets, and self-ligating systems that shorten appointment times and reduce friction.',
    duration: '8 – 18 Months',
    recovery: '3 – 5 Days Adjustment',
    longevity: 'Lifetime with Retainer',
    comfort: 'Discreet Ceramic Option',
    highlights: [
      'Corrects severe crowding, gaps, overbites, and crossbites',
      'Aesthetic tooth-colored ceramic brackets for discreet treatment',
      'Improves airway volume, chewing efficiency, and facial balance',
      'Custom retainers provided post-treatment to lock in your smile'
    ],
    idealFor: 'Teens and adults with crooked teeth, overjet/overbite, severe spacing, midline deviation, or jaw misalignment.'
  },
  {
    id: 'scaling',
    number: '12',
    category: 'Periodontics & Gum Care',
    title: 'Ultrasonic Scaling',
    description: 'Piezoelectric acoustic micro-vibrations and warm guided biofilm therapy to gently dislodge calculus and bacterial stains while protecting root surfaces.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-12.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-12.jpg`,
    overview: 'Professional ultrasonic scaling utilizes piezoelectric acoustic micro-vibrations paired with warm fluid irrigation to thoroughly break down stubborn calculus (tartar) and subgingival bacterial biofilm. Unlike manual scraping, ultrasonic instruments protect the delicate root cementum while leaving teeth silky-smooth.',
    duration: '30 – 40 Mins',
    recovery: 'Zero Downtime',
    longevity: 'Every 6 Months',
    comfort: 'Painless Acoustic Clean',
    highlights: [
      'Eliminates tartar and plaque deposits inaccessible to toothbrushes',
      'Stops gum inflammation, bleeding gums, and bad breath at the root',
      'Air-polishing finish removes superficial coffee and food stains',
      'Crucial baseline preventive step before cosmetic restorations'
    ],
    idealFor: 'Routine 6-month dental cleaning, yellow tartar buildup behind teeth, bleeding during brushing, and halitosis prevention.'
  },
  {
    id: 'gic-filling',
    number: '13',
    category: 'Cosmetic Dentistry',
    title: 'GIC Filling (Glass Ionomer)',
    description: 'Biocompatible glass-hybrid restorations that continuously release essential minerals to remineralize affected dentin and prevent recurrent margins.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-13.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-13.jpg`,
    overview: 'Glass Ionomer Cement (GIC) is a bioactive, tooth-colored restorative material that forms a direct chemical bond with tooth enamel and dentin. A major clinical benefit of GIC is its continuous fluoride release, which acts as a permanent shield remineralizing surrounding tooth structure and halting secondary decay.',
    duration: '20 – 30 Mins',
    recovery: 'Immediate Eating',
    longevity: '5 – 8+ Years',
    comfort: 'Bioactive Fluoride Shield',
    highlights: [
      'Chemically bonds to tooth substance without harsh acid etchants',
      'Releases continuous fluoride to stop future cavity formation',
      'Biocompatible and gentle on sensitive tooth nerves',
      'Ideal restorative material for pediatric teeth and root surface decay'
    ],
    idealFor: 'Cervical abrasion near gum lines, root surface caries, primary (milk) tooth cavities, and base liners under composite restorations.'
  },
  {
    id: 'flap-surgery',
    number: '14',
    category: 'Periodontics & Gum Care',
    title: 'Flap Surgery (Periodontal)',
    description: 'Micro-surgical access for deep subgingival debridement, bone contouring, and regenerative biologics to rescue compromised periodontal foundations.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-14.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-14.jpg`,
    overview: 'When periodontal disease progresses and creates pockets deeper than 5mm, standard scaling cannot reach the infected bone foundation. Periodontal flap surgery gently separates the gingiva to give the periodontist direct visual access to debride deep bacteria, reshape irregular bone contours, and place regenerative bone grafts.',
    duration: '45 – 60 Mins',
    recovery: '3 – 5 Days Recovery',
    longevity: 'Permanent with Care',
    comfort: 'Profound Painless Numb',
    highlights: [
      'Rescues loose teeth and rebuilds destroyed bone support',
      'Direct visualization ensures 100% removal of subgingival calculus',
      'Can be paired with bone grafting and collagen barrier membranes',
      'Reduces deep pockets to healthy 2-3mm depths maintainable at home'
    ],
    idealFor: 'Advanced periodontitis, deep infected gum pockets, bone loss around teeth, tooth mobility, and persistent recurrent gum abscesses.'
  },
  {
    id: 'clear-aligners',
    number: '15',
    category: 'Orthodontics & Clear Aligners',
    title: 'Clear Aligners',
    description: 'Virtually invisible multi-layered polyurethane aligners engineered via digital motion forecasting to guide teeth smoothly into harmonious alignment.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-15.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-15.jpg`,
    overview: 'Clear Aligners are virtually invisible, removable orthodontic trays engineered through 3D intraoral optical scans and computer simulation. Each custom tray applies calibrated, gentle forces to guide your teeth into pristine alignment without metal wires, bracket abrasions, or dietary restrictions.',
    duration: '6 – 14 Months',
    recovery: 'Zero Downtime',
    longevity: 'Lifetime with Retainer',
    comfort: '100% Invisible Polyurethane',
    highlights: [
      'Removable anytime for easy eating, brushing, and flossing',
      'Digital 3D simulation shows your final smile result before starting',
      'Fewer dental visits needed compared to traditional braces',
      'Hypoallergenic medical-grade thermoplastic materials'
    ],
    idealFor: 'Adults and teens wanting discreet smile correction, spacing, crowding, relapse after past braces, and busy professionals.'
  },
  {
    id: 'biomimetic-filling',
    number: '16',
    category: 'Cosmetic Dentistry',
    title: 'Dental Filling (Biomimetic)',
    description: 'Sub-micron nano-hybrid composites layered under rubber dam isolation to recreate pristine tooth anatomy, natural fluorescence, and long-lasting margins.',
    image: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-16.jpg`,
    popupImage: `${process.env.PUBLIC_URL || ''}/treatment_images/treatment-16.jpg`,
    overview: 'Biomimetic dental restorations go beyond traditional fillings. Using dental rubber dam isolation and sub-micron nano-hybrid composites, we mimic the physical properties, flexibility, and layered shade structure of natural tooth enamel and dentin, conserving healthy tooth structure and sealing against micro-leakage.',
    duration: '30 – 45 Mins',
    recovery: 'Immediate Eating',
    longevity: '10 – 15+ Years',
    comfort: 'Chameleon Natural Shade',
    highlights: [
      'Conserves maximum healthy tooth structure (minimally invasive)',
      'Nano-hybrid composite bonded with 7th-gen multi-mode adhesive',
      'Cured with high-intensity LED light under rubber dam isolation',
      'Hand-sculpted cusps and fissures restore original chewing anatomy'
    ],
    idealFor: 'Fresh cavities, broken or chipped enamel edges, replacing old dark amalgam silver fillings, and closing small gaps.'
  }
];

const categories = [
  'All Treatments',
  'Cosmetic Dentistry',
  'Orthodontics & Clear Aligners',
  'Implantology & Oral Surgery',
  'Endodontics (Root Canal)',
  'Periodontics & Gum Care',
  'Pediatric & Preventive Care'
];

function TreatmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Treatments');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  // Close modal on Escape key and freeze background scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedTreatment(null);
      }
    };

    if (selectedTreatment) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedTreatment]);

  const filteredTreatments = useMemo(() => {
    return treatmentsData.filter((treatment) => {
      const matchesCategory =
        selectedCategory === 'All Treatments' || treatment.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        treatment.title.toLowerCase().includes(q) ||
        treatment.description.toLowerCase().includes(q) ||
        treatment.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="treatments-shell">
      {/* Top Breadcrumb */}
      <div className="page-breadcrumb treatments-breadcrumb">
        <span className="crumb-icon">⌂</span>
        <Link to="/" className="crumb-link">Home</Link>
        <span className="crumb-separator">/</span>
        <span className="crumb-current">Treatments</span>
      </div>

      <main className="treatments-page">
        {/* Header & Controls Section */}
        <section className="treatments-header-section">
          <div className="treatment-pill-badge">
            <span className="treatment-pill-dot" />
            COMPREHENSIVE CLINICAL CARE
          </div>

          <div className="treatments-hero-row">
            <div className="treatments-hero-copy">
              <h1 className="treatments-main-title">
                Advanced Dental Treatments &amp; Services
              </h1>
              <p className="treatments-main-subtitle">
                From preventive maintenance and biomimetic cosmetic makeovers to complex
                surgical reconstructions, our specialists leverage cutting-edge digital
                diagnostics to deliver painless, enduring clinical results.
              </p>
            </div>

            <div className="price-transparency-card">
              <div className="price-transparency-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="price-transparency-text">
                <div className="price-transparency-title">
                  Price Transparency
                  <svg className="check-badge-svg" width="16" height="16" viewBox="0 0 20 20" fill="#2f39a9">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="price-transparency-sub">
                  Zero hidden fees &bull; 0% APR available
                </div>
              </div>
            </div>
          </div>

          <div className="treatments-controls-row">
            <div className="treatment-search-box">
              <svg className="search-icon-svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search procedures, symptoms, implants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search procedures"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="treatment-categories-bar" role="tablist">
              {categories.map((category) => {
                const count =
                  category === 'All Treatments'
                    ? treatmentsData.length
                    : treatmentsData.filter((t) => t.category === category).length;
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    className={`treatment-cat-pill ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'All Treatments' ? `All Treatments (${count})` : category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 16 Treatments Grid */}
        <section className="treatments-cards-grid" aria-label="Dental treatments catalogue">
          {filteredTreatments.length > 0 ? (
            filteredTreatments.map((treatment, idx) => (
              <article
                className="treatment-item-card"
                key={treatment.id}
                onClick={() => setSelectedTreatment(treatment)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedTreatment(treatment);
                  }
                }}
                aria-label={`View details for ${treatment.title}`}
              >
                <div className="treatment-card-media">
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    width="380"
                    height="230"
                    loading={idx < 3 ? 'eager' : 'lazy'}
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `${process.env.PUBLIC_URL || ''}/Assets/services/cosmetic-dentistry.webp`;
                    }}
                  />
                  <div className="treatment-card-zoom-overlay">
                    <span className="treatment-zoom-tag">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      View Details
                    </span>
                  </div>
                </div>

                <div className="treatment-card-content">
                  <div className="treatment-card-top-row">
                    <span className="treatment-num-label">TREATMENT {treatment.number}</span>
                    <span className="treatment-card-badge-pill">{treatment.category.split(' ')[0]}</span>
                  </div>
                  <h2 className="treatment-card-name">{treatment.title}</h2>
                  <p className="treatment-card-desc">{treatment.description}</p>
                  
                  <div className="treatment-card-action-bar">
                    <button
                      type="button"
                      className="treatment-view-details-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTreatment(treatment);
                      }}
                    >
                      <span>Procedure Info</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                    <Link
                      to="/book-appointment"
                      className="treatment-card-cta"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>BOOK NOW</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="no-treatments-container">
              <p>No treatments found matching &ldquo;{searchQuery}&rdquo;.</p>
              <button
                type="button"
                className="reset-search-pill"
                onClick={() => {
                  setSelectedCategory('All Treatments');
                  setSearchQuery('');
                }}
              >
                Show All Treatments
              </button>
            </div>
          )}
        </section>
      </main>

      {/* POPUP MODAL FOR SELECTED TREATMENT - PERFECTLY ALIGNED ARCHITECTURE */}
      {selectedTreatment && (
        <div
          className="treatment-modal-backdrop"
          onClick={() => setSelectedTreatment(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="treatment-modal-title"
        >
          <div
            className="treatment-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* FULL-WIDTH MODAL HEADER */}
            <div className="treatment-modal-header">
              <div className="treatment-modal-header-meta">
                <div className="treatment-modal-badges-row">
                  <span className="treatment-modal-num-badge">
                    TREATMENT {selectedTreatment.number}
                  </span>
                  <span className="treatment-modal-cat-badge">
                    {selectedTreatment.category}
                  </span>
                </div>
                <h2 id="treatment-modal-title" className="treatment-modal-title">
                  {selectedTreatment.title}
                </h2>
              </div>
              <button
                type="button"
                className="treatment-modal-close"
                onClick={() => setSelectedTreatment(null)}
                aria-label="Close treatment details"
              >
                ✕
              </button>
            </div>

            {/* BALANCED 2-COLUMN MODAL BODY */}
            <div className="treatment-modal-body">
              {/* Left Column: Clinical Photo + Symmetrical Specs */}
              <div className="treatment-modal-left">
                <div className="treatment-modal-media-frame">
                  <img
                    src={selectedTreatment.popupImage}
                    alt={selectedTreatment.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = selectedTreatment.image;
                    }}
                  />
                </div>

                {/* Symmetrical 2x2 Specs Grid */}
                <div className="treatment-specs-section">
                  <span className="specs-section-label">PROCEDURE SPECIFICATIONS</span>
                  <div className="treatment-specs-grid">
                    <div className="spec-card">
                      <span className="spec-icon">⏱️</span>
                      <div className="spec-meta">
                        <span className="spec-label">Duration</span>
                        <strong className="spec-val">{selectedTreatment.duration}</strong>
                      </div>
                    </div>
                    <div className="spec-card">
                      <span className="spec-icon">🩹</span>
                      <div className="spec-meta">
                        <span className="spec-label">Recovery</span>
                        <strong className="spec-val">{selectedTreatment.recovery}</strong>
                      </div>
                    </div>
                    <div className="spec-card">
                      <span className="spec-icon">🛡️</span>
                      <div className="spec-meta">
                        <span className="spec-label">Longevity</span>
                        <strong className="spec-val">{selectedTreatment.longevity}</strong>
                      </div>
                    </div>
                    <div className="spec-card">
                      <span className="spec-icon">✨</span>
                      <div className="spec-meta">
                        <span className="spec-label">Comfort</span>
                        <strong className="spec-val">{selectedTreatment.comfort}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clinical Protocol Assurance Box */}
                <div className="treatment-protocol-box">
                  <span className="protocol-icon">🩺</span>
                  <div className="protocol-copy">
                    <strong>Painless Clinical Care</strong>
                    <p>Performed under gentle local numbing with computerized apex navigation.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: In-depth Clinical Content */}
              <div className="treatment-modal-right">
                {/* Overview */}
                <div className="modal-section-block">
                  <h3 className="modal-section-heading">Clinical Overview</h3>
                  <p className="treatment-modal-overview">
                    {selectedTreatment.overview}
                  </p>
                </div>

                {/* Highlights Bullet List */}
                <div className="modal-section-block">
                  <h3 className="modal-section-heading">Key Clinical Highlights</h3>
                  <ul className="treatment-highlights-list">
                    {selectedTreatment.highlights.map((point, idx) => (
                      <li key={idx} className="highlight-item">
                        <span className="check-bullet">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended When Experiencing Box */}
                <div className="treatment-recommended-box">
                  <div className="rec-box-header">
                    <span className="rec-badge-icon">ℹ️</span>
                    <strong>Recommended When Experiencing:</strong>
                  </div>
                  <p className="rec-box-text">
                    {selectedTreatment.idealFor}
                  </p>
                </div>
              </div>
            </div>

            {/* FULL-WIDTH MODAL FOOTER ACTION BAR */}
            <div className="treatment-modal-footer">
              <div className="modal-footer-trust">
                <span className="trust-pill-tag">
                  <span className="trust-dot"></span>
                  Verified Specialists &bull; 100% Pain-Free &bull; Transparent Pricing
                </span>
              </div>

              <div className="modal-footer-actions">
                <a
                  href={`https://wa.me/917799234108?text=${encodeURIComponent(`Hello Ma Dental Clinic, I would like to inquire about ${selectedTreatment.title} (Treatment ${selectedTreatment.number}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-whatsapp-cta"
                >
                  <span>WhatsApp Inquiry 💬</span>
                </a>
                <Link
                  to="/book-appointment"
                  className="modal-book-cta"
                  onClick={() => setSelectedTreatment(null)}
                >
                  <span>Book Consultation</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TreatmentsPage;
