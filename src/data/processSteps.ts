// Process step data — used by both the pipeline strip and detail sections
export interface ProcessStep {
  id: string;
  index: number;
  name: string;
  shortName: string;
  color: string;           // primary accent color
  secondaryColor: string;
  description: string;     // short card description
  detail: string;          // longer section description
  facts: string[];         // bullet facts shown in detail section
  icon: string;            // emoji icon for fallback
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'wafer-manufacturing',
    index: 0,
    name: 'Wafer Manufacturing',
    shortName: 'Wafer',
    color: '#00f0ff',
    secondaryColor: '#0080ff',
    icon: '⬡',
    description: 'Pure silicon ingots are sliced into ultra-thin circular discs called wafers.',
    detail:
      'Silicon wafers are the foundation of every semiconductor. Raw silicon is purified to 99.9999999% purity, then grown into large cylindrical ingots via the Czochralski method. These ingots are sliced into thin wafers (typically 775µm thick for 300mm wafers), then polished to atomic-level flatness.',
    facts: [
      'Silicon purity: 99.9999999% (9N)',
      'Wafer diameter: 300mm (modern fabs)',
      'Thickness: ~775µm before thinning',
      'Surface roughness: < 0.1nm RMS',
    ],
  },
  {
    id: 'oxidation',
    index: 1,
    name: 'Oxidation',
    shortName: 'Oxidation',
    color: '#ff8800',
    secondaryColor: '#ff4400',
    icon: '🔥',
    description: 'A thin SiO₂ layer is grown on the wafer surface at high temperature to act as insulation.',
    detail:
      'Thermal oxidation grows a silicon dioxide (SiO₂) layer on the wafer surface by exposing it to oxygen or water vapor at 900–1200°C. This oxide layer serves as a gate dielectric, field isolation, and a hard mask for subsequent processing steps. Thickness is controlled precisely from a few nanometers to several microns.',
    facts: [
      'Temperature: 900–1200°C',
      'Dry oxidation: O₂ atmosphere',
      'Wet oxidation: H₂O atmosphere (faster)',
      'Gate oxide thickness: 1–5nm in modern nodes',
    ],
  },
  {
    id: 'photolithography',
    index: 2,
    name: 'Photolithography',
    shortName: 'Lithography',
    color: '#b000ff',
    secondaryColor: '#7700cc',
    icon: '💡',
    description: 'UV light transfers circuit patterns from a photomask onto a light-sensitive photoresist.',
    detail:
      'Photolithography is the core patterning step. A photosensitive coating (photoresist) is applied to the wafer, then exposed through a photomask using UV or EUV light. Exposed regions undergo a chemical change, allowing selective removal during development. Modern EUV lithography achieves sub-5nm feature sizes.',
    facts: [
      'EUV wavelength: 13.5nm',
      'ArF immersion: 193nm wavelength',
      'Resolution: < 5nm with multiple patterning',
      'Overlay accuracy: < 1nm',
    ],
  },
  {
    id: 'etching',
    index: 3,
    name: 'Etching',
    shortName: 'Etching',
    color: '#ff3366',
    secondaryColor: '#cc0033',
    icon: '⚡',
    description: 'Unwanted material is selectively removed using plasma or wet chemical processes.',
    detail:
      'Etching removes material in the areas not protected by photoresist, transferring the lithographic pattern into the underlying layer. Dry (plasma) etching offers high anisotropy for vertical sidewalls critical in modern 3D transistors. Wet etching uses chemicals for isotropic removal with high selectivity.',
    facts: [
      'Plasma etch rate: 10–500 nm/min',
      'Selectivity: > 100:1 for advanced processes',
      'Aspect ratio: up to 50:1 in 3D NAND',
      'Etch uniformity: < 1% across 300mm wafer',
    ],
  },
  {
    id: 'deposition',
    index: 4,
    name: 'Deposition & Ion Implantation',
    shortName: 'Deposition',
    color: '#00ff88',
    secondaryColor: '#00cc66',
    icon: '🧲',
    description: 'Thin films are deposited and dopants are implanted to set electrical properties.',
    detail:
      'Thin film deposition (CVD, PVD, ALD) adds functional layers — from gate oxides to metal conductors. Ion implantation follows, bombarding the wafer with dopant ions (boron, phosphorus, arsenic) at precise energies to create p-type and n-type regions that form transistors.',
    facts: [
      'ALD precision: 1 atomic layer per cycle',
      'Ion energy: 1 keV – 1 MeV',
      'Dose accuracy: < 0.5% variation',
      'Film uniformity: < 0.5% across wafer',
    ],
  },
  {
    id: 'metal-wiring',
    index: 5,
    name: 'Metal Wiring',
    shortName: 'Metal Wiring',
    color: '#ffdd00',
    secondaryColor: '#cc9900',
    icon: '🔗',
    description: 'Copper interconnects link transistors into functional circuits across multiple layers.',
    detail:
      'Back-end-of-line (BEOL) processing creates the copper interconnect network that wires together billions of transistors. The damascene process deposits copper into etched trenches, then polishes it flat with CMP. Modern chips have 10–15+ metal layers with widths approaching 10nm.',
    facts: [
      'Metal layers: 10–15 in modern chips',
      'Minimum metal width: ~10nm',
      'Copper resistivity: 1.68 µΩ·cm',
      'CMP uniformity: < 5nm planarity',
    ],
  },
  {
    id: 'electrical-die-sorting',
    index: 6,
    name: 'Electrical Die Sorting',
    shortName: 'Die Sorting',
    color: '#33aaff',
    secondaryColor: '#0066cc',
    icon: '🔬',
    description: 'Each die is electrically tested and classified by performance grade before dicing.',
    detail:
      'Wafer-level testing (WLT) probes every die on the wafer to verify electrical functionality. Automated test equipment applies thousands of test vectors, measuring timing, power, and functionality. Dies are binned by speed grade (e.g., CPU frequency bins) — faster dies command higher prices.',
    facts: [
      'Test coverage: > 99.9% of defects',
      'Probe contact force: < 5g per needle',
      'Typical yield: 60–95% depending on node',
      'Test time: 1–10 seconds per die',
    ],
  },
  {
    id: 'packaging',
    index: 7,
    name: 'Packaging',
    shortName: 'Packaging',
    color: '#ff44aa',
    secondaryColor: '#cc0077',
    icon: '📦',
    description: 'Good dies are cut, bonded, and encapsulated for protection and electrical connection.',
    detail:
      'Dicing separates the wafer into individual dies. Each die is attached to a substrate, wire-bonded or flip-chip connected, then encapsulated in epoxy or a lid. Advanced packaging (chiplets, 3D stacking, CoWoS) integrates multiple dies for higher performance and bandwidth.',
    facts: [
      'Flip-chip bump pitch: < 100µm',
      '3D stacking: HBM with < 50µm TSV',
      'Package types: BGA, LGA, QFP, CSP',
      'Thermal resistance: < 0.1°C/W (high-end)',
    ],
  },
];
