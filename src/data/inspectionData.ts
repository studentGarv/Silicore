// ============================================================
// Centralized Inspection Technology Dataset
// ============================================================
// This is the SINGLE source of truth for all inspection data.
// Each technology lists which manufacturing steps it applies to.
// Filter helpers at the bottom derive per-step views dynamically.
// ============================================================

export type InspectionCategory = 'Contact' | 'Non-Contact';

export interface InspectionTechnology {
  id: string;
  name: string;
  category: InspectionCategory;
  shortDefinition: string;       // 1-2 sentence summary for cards
  definition: string;            // Full paragraph for library/detail view
  techniques: string[];          // Bullet list of techniques/methods
  applicableSteps: string[];     // Array of ProcessStep IDs this tech applies to
  image?: string;                // Path to image (public folder or URL)
  tags?: string[];               // Optional: for search/filter
}

// ============================================================
// PLACEHOLDER DATA — Replace with real data after layout approval
// ============================================================
export const INSPECTION_TECHNOLOGIES: InspectionTechnology[] = [

  // ── WAFER MANUFACTURING ─────────────────────────────────

  {
    id: 'cmm',
    name: 'Coordinate Measuring Machine (CMM)',
    category: 'Contact',
    shortDefinition: 'A probe physically touches the wafer surface to map 3D geometry with high accuracy.',
    definition:
      'CMM uses a calibrated probe tip that physically contacts the workpiece to record X, Y, Z coordinates. It is used during wafer manufacturing to verify dimensional tolerances of crystal ingots and wafer thickness before slicing. Accuracy typically reaches sub-micron levels.',
    techniques: [
      'Touch-trigger probing',
      'Scanning probe measurement',
      'Diameter and flatness verification',
    ],
    applicableSteps: ['wafer-manufacturing'],
    image: '/images/inspection/cmm.png',
    tags: ['dimensional', 'probing', 'silicon'],
  },

  {
    id: 'profilometry',
    name: 'Stylus Profilometry',
    category: 'Contact',
    shortDefinition: 'A diamond-tipped stylus drags across the surface to measure roughness and step height.',
    definition:
      'Stylus profilometry records surface topography by dragging a fine diamond stylus across the wafer. The vertical deflection is converted to a height profile. It quantifies surface roughness (Ra), step heights, and wafer bow/warp with angstrom-level vertical resolution.',
    techniques: [
      'Surface roughness measurement (Ra, Rq)',
      'Film thickness step measurement',
      'Wafer bow and warp profiling',
    ],
    applicableSteps: ['wafer-manufacturing', 'oxidation', 'etching'],
    image: '/images/inspection/profilometry.png',
    tags: ['surface', 'roughness', 'topography'],
  },

  {
    id: 'xray-diffraction',
    name: 'X-Ray Diffraction (XRD)',
    category: 'Non-Contact',
    shortDefinition: 'X-rays are diffracted by the crystal lattice to reveal crystal structure and defects.',
    definition:
      'XRD directs X-rays at the wafer and analyzes the diffraction pattern to determine crystal orientation, lattice parameter, and defect density. In wafer manufacturing it verifies silicon crystal quality, detects dislocations, and confirms wafer orientation (e.g., ⟨100⟩ or ⟨111⟩) without any physical contact.',
    techniques: [
      'Bragg angle measurement',
      'Rocking curve analysis',
      'Crystal orientation verification',
      'Strain and defect mapping',
    ],
    applicableSteps: ['wafer-manufacturing'],
    image: '/images/inspection/xrd.png',
    tags: ['crystal', 'structure', 'x-ray'],
  },

  {
    id: 'laser-interferometry',
    name: 'Laser Interferometry',
    category: 'Non-Contact',
    shortDefinition: 'Interfering laser beams create fringe patterns that reveal surface flatness at nanometer precision.',
    definition:
      'Laser interferometry measures surface form, flatness, and roughness by comparing a reference wavefront with the reflected wavefront from the wafer. Fringe patterns represent height deviations. Used extensively for wafer warp, bow, and total thickness variation (TTV) measurements across full 300mm wafers.',
    techniques: [
      'Fizeau interferometry for flatness',
      'Twyman-Green for surface form',
      'Phase-shifting interferometry',
      'Full-wafer TTV mapping',
    ],
    applicableSteps: ['wafer-manufacturing', 'oxidation', 'metal-wiring'],
    image: '/images/inspection/interferometry.png',
    tags: ['optical', 'flatness', 'interferometry'],
  },

  // ── OXIDATION ────────────────────────────────────────────

  {
    id: 'ellipsometry',
    name: 'Ellipsometry',
    category: 'Non-Contact',
    shortDefinition: 'Polarized light reflection measures thin film thickness and optical properties without contact.',
    definition:
      'Ellipsometry analyzes the change in polarization state of light reflected from a thin film stack. It derives film thickness and refractive index simultaneously. For oxide layers, it measures SiO₂ thickness from 1nm (gate oxide) to several microns with sub-angstrom precision.',
    techniques: [
      'Single-wavelength ellipsometry',
      'Spectroscopic ellipsometry (SE)',
      'In-situ real-time monitoring',
      'Multi-layer film modeling',
    ],
    applicableSteps: ['oxidation', 'deposition', 'photolithography'],
    image: '/images/inspection/ellipsometry.png',
    tags: ['thin-film', 'optical', 'thickness'],
  },

  {
    id: 'ftir',
    name: 'Fourier Transform Infrared (FTIR)',
    category: 'Non-Contact',
    shortDefinition: 'Infrared absorption spectra identify material composition and film stoichiometry.',
    definition:
      'FTIR spectroscopy measures how different wavelengths of infrared light are absorbed by the sample, producing a molecular fingerprint. In semiconductor manufacturing it characterizes oxide composition, detects contamination (carbon, hydrogen bonds), and verifies film stoichiometry for gate dielectrics and nitride layers.',
    techniques: [
      'Transmission FTIR',
      'Attenuated total reflection (ATR)',
      'Bond density quantification',
      'Contamination detection',
    ],
    applicableSteps: ['oxidation', 'deposition'],
    image: '/images/inspection/ftir.png',
    tags: ['spectroscopy', 'composition', 'infrared'],
  },

  // ── PHOTOLITHOGRAPHY ─────────────────────────────────────

  {
    id: 'cd-sem',
    name: 'Critical Dimension SEM (CD-SEM)',
    category: 'Non-Contact',
    shortDefinition: 'A scanning electron beam measures printed feature widths at nanometer resolution.',
    definition:
      'CD-SEM uses a focused electron beam to image photoresist or etched features and measure their critical dimensions (CD) with nanometer precision. It is the primary metrology tool for verifying that lithography has printed features to spec — confirming linewidth, pitch, and sidewall angle.',
    techniques: [
      'Top-down SEM imaging',
      'Linewidth and space measurement',
      'Pitch and CD uniformity mapping',
      'Sidewall angle analysis',
    ],
    applicableSteps: ['photolithography', 'etching'],
    image: '/images/inspection/cd-sem.png',
    tags: ['sem', 'critical-dimension', 'metrology'],
  },

  {
    id: 'optical-overlay',
    name: 'Optical Overlay Metrology',
    category: 'Non-Contact',
    shortDefinition: 'Optical tools measure misalignment between successive lithography layers.',
    definition:
      'Overlay metrology measures the alignment error between two patterned layers using dedicated overlay marks. Optical systems (brightfield, darkfield, or scatterometry-based) measure the offset with sub-nanometer precision. Poor overlay causes transistor mismatch and circuit failure.',
    techniques: [
      'Image-based overlay (IBO)',
      'Diffraction-based overlay (DBO)',
      'Multi-target measurement',
      'Wafer-level overlay mapping',
    ],
    applicableSteps: ['photolithography'],
    image: '/images/inspection/overlay.png',
    tags: ['alignment', 'overlay', 'lithography'],
  },

  {
    id: 'afm',
    name: 'Atomic Force Microscopy (AFM)',
    category: 'Contact',
    shortDefinition: 'A nanoscale tip scans the surface to map topography at atomic resolution.',
    definition:
      'AFM uses a cantilever with a sharp tip (radius ~10nm) to scan across the surface in tapping or contact mode. It measures surface roughness, step heights, photoresist line profiles, and line edge roughness (LER) at sub-nanometer vertical resolution. Critical for characterizing photoresist patterns at advanced nodes.',
    techniques: [
      'Tapping mode imaging',
      'Contact mode for hard surfaces',
      'Line edge roughness (LER) measurement',
      '3D resist profile reconstruction',
    ],
    applicableSteps: ['photolithography', 'etching', 'wafer-manufacturing'],
    image: '/images/inspection/afm.png',
    tags: ['afm', 'surface', 'nanoscale'],
  },

  // ── ETCHING ──────────────────────────────────────────────

  {
    id: 'oes',
    name: 'Optical Emission Spectroscopy (OES)',
    category: 'Non-Contact',
    shortDefinition: 'Plasma emission light is analyzed in real-time to detect etch endpoint automatically.',
    definition:
      'OES monitors the optical emission spectrum of the plasma during dry etching. Each element emits characteristic wavelengths; when the underlying layer is reached, the spectrum changes — signaling etch endpoint. It enables precise, real-time process control without pausing the etch.',
    techniques: [
      'Endpoint detection by emission change',
      'Species concentration monitoring',
      'Plasma uniformity assessment',
      'Multi-wavelength analysis',
    ],
    applicableSteps: ['etching'],
    image: '/images/inspection/oes.png',
    tags: ['plasma', 'endpoint', 'real-time'],
  },

  {
    id: 'sem-cross-section',
    name: 'Cross-Section SEM',
    category: 'Non-Contact',
    shortDefinition: 'A sample is cleaved or FIB-cut to expose a cross-section for sidewall and depth imaging.',
    definition:
      'Cross-section SEM prepares a sample by mechanical cleave or FIB (focused ion beam) milling to expose the side profile of etched features. It directly images etch depth, sidewall angle, aspect ratio, and undercut — providing ground-truth verification of etch process performance.',
    techniques: [
      'FIB cross-section preparation',
      'Mechanical cleave for bulk features',
      'Sidewall angle measurement',
      'Etch depth and profile analysis',
    ],
    applicableSteps: ['etching', 'deposition'],
    image: '/images/inspection/cross-section-sem.png',
    tags: ['sem', 'cross-section', 'fib'],
  },

  // ── DEPOSITION ───────────────────────────────────────────

  {
    id: 'xrf',
    name: 'X-Ray Fluorescence (XRF)',
    category: 'Non-Contact',
    shortDefinition: 'X-ray excitation causes elements to emit characteristic fluorescence for composition mapping.',
    definition:
      'XRF irradiates the sample with high-energy X-rays, causing constituent elements to emit fluorescent X-rays at characteristic energies. It measures thin film composition and thickness of metal, oxide, and nitride layers non-destructively. Widely used for ALD and CVD film verification.',
    techniques: [
      'Energy-dispersive XRF (EDXRF)',
      'Wavelength-dispersive XRF (WDXRF)',
      'Film thickness by fundamental parameters',
      'Multi-element mapping',
    ],
    applicableSteps: ['deposition', 'metal-wiring'],
    image: '/images/inspection/xrf.png',
    tags: ['composition', 'x-ray', 'film-thickness'],
  },

  {
    id: '4pp',
    name: '4-Point Probe',
    category: 'Contact',
    shortDefinition: 'Four electrical probes contact the film to measure sheet resistance across the wafer.',
    definition:
      'The 4-point probe passes a current through the outer two probes while measuring voltage across the inner two, eliminating contact resistance. It gives sheet resistance (Ω/□) of conductive films — critical for verifying dopant dose uniformity after ion implantation and metal film conductivity.',
    techniques: [
      'Linear 4-point array',
      'Van der Pauw method for irregular shapes',
      'Wafer-level sheet resistance mapping',
      'Resistivity profiling',
    ],
    applicableSteps: ['deposition', 'electrical-die-sorting'],
    image: '/images/inspection/4pp.png',
    tags: ['electrical', 'sheet-resistance', 'probing'],
  },

  // ── METAL WIRING ─────────────────────────────────────────

  {
    id: 'xrr',
    name: 'X-Ray Reflectivity (XRR)',
    category: 'Non-Contact',
    shortDefinition: 'Grazing-angle X-ray reflectivity profiles reveal metal film thickness and interface roughness.',
    definition:
      'XRR measures the intensity of X-rays reflected at grazing incidence as a function of angle. Oscillations in the reflectivity curve (Kiessig fringes) encode film thickness, density, and interface roughness. It is essential for verifying ultrathin barrier and seed layers in copper damascene metallization.',
    techniques: [
      'Kiessig fringe analysis',
      'Film density determination',
      'Interface roughness profiling',
      'Multi-layer stack modeling',
    ],
    applicableSteps: ['metal-wiring', 'deposition'],
    image: '/images/inspection/xrr.png',
    tags: ['x-ray', 'metal', 'thickness'],
  },

  {
    id: 'edx',
    name: 'Energy Dispersive X-ray (EDX/EDS)',
    category: 'Non-Contact',
    shortDefinition: 'Electron beam excitation generates X-rays that identify elemental composition at nanoscale.',
    definition:
      'EDX is performed inside an SEM: the electron beam excites atoms, causing emission of characteristic X-rays. A detector collects the spectrum to identify and quantify elements present. Used in metal wiring to detect contamination, verify barrier layer integrity, and map copper fill in damascene structures.',
    techniques: [
      'Point analysis for elemental ID',
      'Line scan profiling across interfaces',
      'Elemental mapping (2D compositional image)',
      'TEM-EDX for atomic-scale analysis',
    ],
    applicableSteps: ['metal-wiring', 'deposition', 'packaging'],
    image: '/images/inspection/edx.png',
    tags: ['elemental', 'composition', 'sem'],
  },

  // ── ELECTRICAL DIE SORTING ───────────────────────────────

  {
    id: 'wafer-probe',
    name: 'Wafer Probing',
    category: 'Contact',
    shortDefinition: 'Metal probe needles contact die pads to apply electrical test vectors and measure response.',
    definition:
      'Wafer probing uses a probe card with many precision needles that simultaneously contact bonding pads on each die. Automated test equipment (ATE) applies stimuli and measures electrical responses to verify functionality, speed, leakage, and parametric specs. Each die is binned as pass/fail/speed grade.',
    techniques: [
      'DC parametric testing',
      'Functional pattern testing',
      'Speed binning (Shmoo plots)',
      'Iddq leakage measurement',
    ],
    applicableSteps: ['electrical-die-sorting'],
    image: '/images/inspection/wafer-probe.png',
    tags: ['electrical', 'test', 'yield'],
  },

  {
    id: 'thermography',
    name: 'Infrared Thermography',
    category: 'Non-Contact',
    shortDefinition: 'Infrared cameras detect hot spots on active dies to localize leakage or shorts.',
    definition:
      'Infrared thermography images the thermal emission from a powered wafer or die. Hot spots indicate excessive leakage current, shorts, or latch-up conditions. Lock-in thermography (LIT) applies a modulated bias and uses phase-sensitive detection to image sub-milliwatt heat sources through overlying layers.',
    techniques: [
      'Static infrared imaging',
      'Lock-in thermography (LIT)',
      'Photon emission microscopy (companion)',
      'Thermal resistance mapping',
    ],
    applicableSteps: ['electrical-die-sorting', 'packaging'],
    image: '/images/inspection/thermography.png',
    tags: ['thermal', 'defect', 'failure-analysis'],
  },

  // ── PACKAGING ────────────────────────────────────────────

  {
    id: 'xray-imaging',
    name: 'X-Ray Imaging',
    category: 'Non-Contact',
    shortDefinition: 'Transmission X-ray imaging reveals voids, cracks, and bonding defects inside packages.',
    definition:
      'X-ray imaging transmits X-rays through the package and captures a 2D or 3D (CT) image. It reveals solder voids, delamination, wire-bond sweeping, and flip-chip bump integrity without opening the package. 3D X-ray CT provides volumetric reconstruction of internal structures.',
    techniques: [
      '2D X-ray transmission imaging',
      'X-ray CT (3D tomography)',
      'Void area fraction calculation',
      'Wire sweep detection',
    ],
    applicableSteps: ['packaging'],
    image: '/images/inspection/xray-imaging.png',
    tags: ['x-ray', 'packaging', 'void'],
  },

  {
    id: 'sam',
    name: 'Scanning Acoustic Microscopy (SAM)',
    category: 'Non-Contact',
    shortDefinition: 'Focused ultrasound pulses detect delamination and voids by analyzing echo reflections.',
    definition:
      'SAM focuses ultrasonic pulses into the package using a water-coupled transducer. Acoustic impedance mismatches at interfaces (delamination, voids, cracks) produce strong reflections. The time-of-flight and amplitude of echoes are mapped to create a 2D image of internal defects — without destroying the sample.',
    techniques: [
      'Pulse-echo mode for internal delamination',
      'Through-transmission mode',
      'C-mode scanning (depth slices)',
      'Time-of-flight imaging',
    ],
    applicableSteps: ['packaging'],
    image: '/images/inspection/sam.png',
    tags: ['acoustic', 'ultrasound', 'delamination'],
  },

  {
    id: 'visual-inspection',
    name: 'Automated Visual Inspection (AVI)',
    category: 'Non-Contact',
    shortDefinition: 'High-resolution cameras and AI algorithms detect surface defects on packages and dies.',
    definition:
      'AVI systems use high-resolution cameras (visible, UV, or IR) combined with machine learning algorithms to detect surface defects such as scratches, contamination, die cracks, missing bonds, and lead deformation. They replace manual microscope inspection with consistent, high-throughput automated screening.',
    techniques: [
      'Bright-field and dark-field illumination',
      'Deep learning defect classification',
      'Die-level and package-level inspection',
      'Statistical process control (SPC) integration',
    ],
    applicableSteps: ['packaging', 'electrical-die-sorting', 'wafer-manufacturing'],
    image: '/images/inspection/avi.png',
    tags: ['vision', 'ai', 'defect'],
  },
];

// ============================================================
// Helper Functions
// ============================================================

/** Returns all inspection technologies applicable to a given manufacturing step ID */
export function getInspectionForStep(stepId: string): InspectionTechnology[] {
  return INSPECTION_TECHNOLOGIES.filter((tech) =>
    tech.applicableSteps.includes(stepId)
  );
}

/** Groups an array of technologies by their category */
export function groupByCategory(
  techs: InspectionTechnology[]
): Record<InspectionCategory, InspectionTechnology[]> {
  return techs.reduce(
    (acc, tech) => {
      acc[tech.category].push(tech);
      return acc;
    },
    { Contact: [], 'Non-Contact': [] } as Record<InspectionCategory, InspectionTechnology[]>
  );
}

/** Returns all unique step IDs that have at least one inspection technology */
export function getInspectedStepIds(): string[] {
  const ids = new Set<string>();
  INSPECTION_TECHNOLOGIES.forEach((t) => t.applicableSteps.forEach((s) => ids.add(s)));
  return Array.from(ids);
}
