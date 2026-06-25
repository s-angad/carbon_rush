// ─── CarbonRush AI — Complete Demo Data ───────────────────────────────────────
// This file stores all demo/seed data locally for the fully functional platform.
// Includes: Aadhaar verification records, projects, carbon credits, blockchain
// transactions, community members, marketplace listings, and fraud alerts.

// ─── Aadhaar-style Identity Verification (India DPI Layer) ─────────────────────
export interface AadhaarVerification {
  aadhaarId: string;
  name: string;
  state: string;
  district: string;
  verified: boolean;
  verifiedAt: string;
  carbonPassportId: string;
  linkedProjects: string[];
  communityRole: string;
  bankLinked: boolean;
  phoneLinked: boolean;
}

export const aadhaarRecords: AadhaarVerification[] = [
  { aadhaarId: "XXXX-XXXX-1234", name: "Priya Sharma", state: "West Bengal", district: "South 24 Parganas", verified: true, verifiedAt: "2024-03-15T10:30:00Z", carbonPassportId: "CRP-00001", linkedProjects: ["Sundarbans Mangrove Delta"], communityRole: "Project Lead", bankLinked: true, phoneLinked: true },
  { aadhaarId: "XXXX-XXXX-5678", name: "Rajesh Kumar", state: "Gujarat", district: "Devbhumi Dwarka", verified: true, verifiedAt: "2024-04-22T14:15:00Z", carbonPassportId: "CRP-00002", linkedProjects: ["Gulf of Kutch Marine"], communityRole: "Verifier", bankLinked: true, phoneLinked: true },
  { aadhaarId: "XXXX-XXXX-9012", name: "Ananya Patel", state: "Tamil Nadu", district: "Cuddalore", verified: true, verifiedAt: "2024-02-10T09:45:00Z", carbonPassportId: "CRP-00003", linkedProjects: ["Pichavaram Seagrass", "Muthupet Lagoon"], communityRole: "Community Leader", bankLinked: true, phoneLinked: true },
  { aadhaarId: "XXXX-XXXX-3456", name: "Vikram Singh", state: "Odisha", district: "Kendrapara", verified: true, verifiedAt: "2024-05-08T11:20:00Z", carbonPassportId: "CRP-00004", linkedProjects: ["Bhitarkanika Corridor"], communityRole: "Field Surveyor", bankLinked: true, phoneLinked: false },
  { aadhaarId: "XXXX-XXXX-7890", name: "Meera Nair", state: "Kerala", district: "Alappuzha", verified: true, verifiedAt: "2024-06-01T08:30:00Z", carbonPassportId: "CRP-00007", linkedProjects: ["Vembanad Wetlands"], communityRole: "Data Collector", bankLinked: false, phoneLinked: true },
  { aadhaarId: "XXXX-XXXX-2345", name: "Arjun Reddy", state: "Andhra Pradesh", district: "East Godavari", verified: true, verifiedAt: "2024-01-20T16:00:00Z", carbonPassportId: "CRP-00005", linkedProjects: ["Coringa Wildlife", "Godavari Delta"], communityRole: "NGO Coordinator", bankLinked: true, phoneLinked: true },
  { aadhaarId: "XXXX-XXXX-6789", name: "Deepa Menon", state: "Odisha", district: "Puri", verified: false, verifiedAt: "", carbonPassportId: "", linkedProjects: [], communityRole: "Applicant", bankLinked: false, phoneLinked: true },
  { aadhaarId: "XXXX-XXXX-0123", name: "Suresh Babu", state: "Tamil Nadu", district: "Thanjavur", verified: true, verifiedAt: "2024-07-12T13:45:00Z", carbonPassportId: "CRP-00008", linkedProjects: ["Muthupet Lagoon"], communityRole: "Fisherman Lead", bankLinked: true, phoneLinked: true },
  { aadhaarId: "XXXX-XXXX-4567", name: "Kavitha Rao", state: "Karnataka", district: "Uttara Kannada", verified: true, verifiedAt: "2024-08-05T10:10:00Z", carbonPassportId: "CRP-00009", linkedProjects: ["Karnataka Mangroves"], communityRole: "Restoration Expert", bankLinked: true, phoneLinked: true },
  { aadhaarId: "XXXX-XXXX-8901", name: "Amit Deshmukh", state: "Maharashtra", district: "Ratnagiri", verified: true, verifiedAt: "2024-03-28T15:30:00Z", carbonPassportId: "CRP-00010", linkedProjects: ["Ratnagiri Coast"], communityRole: "MSME Owner", bankLinked: true, phoneLinked: true },
];

// ─── Carbon Projects ───────────────────────────────────────────────────────────
export interface CarbonProject {
  id: string;
  name: string;
  type: "Mangrove" | "Wetland" | "Seagrass" | "Saltmarsh" | "Coral";
  location: string;
  state: string;
  coordinates: { lat: number; lng: number };
  area: number; // hectares
  carbonSequestered: number; // tCO2
  creditsIssued: number;
  creditsRetired: number;
  verificationScore: number; // 0-100
  ndviAverage: number;
  status: "active" | "pending" | "under_review";
  startDate: string;
  lastVerified: string;
  communityMembers: number;
  biodiversityScore: number;
  waterQuality: number;
  registry: string;
}

export const carbonProjects: CarbonProject[] = [
  { id: "PRJ-001", name: "Sundarbans Mangrove Delta", type: "Mangrove", location: "South 24 Parganas", state: "West Bengal", coordinates: { lat: 21.9497, lng: 88.8977 }, area: 4500, carbonSequestered: 12450, creditsIssued: 11200, creditsRetired: 3400, verificationScore: 98, ndviAverage: 0.78, status: "active", startDate: "2022-06-15", lastVerified: "2025-06-20", communityMembers: 342, biodiversityScore: 94, waterQuality: 88, registry: "Verra VCS" },
  { id: "PRJ-002", name: "Gulf of Kutch Marine Reserve", type: "Wetland", location: "Devbhumi Dwarka", state: "Gujarat", coordinates: { lat: 22.4707, lng: 69.0807 }, area: 3200, carbonSequestered: 8920, creditsIssued: 8100, creditsRetired: 2100, verificationScore: 96, ndviAverage: 0.65, status: "active", startDate: "2022-09-01", lastVerified: "2025-06-18", communityMembers: 218, biodiversityScore: 87, waterQuality: 82, registry: "Gold Standard" },
  { id: "PRJ-003", name: "Pichavaram Seagrass Bed", type: "Seagrass", location: "Cuddalore", state: "Tamil Nadu", coordinates: { lat: 11.4181, lng: 79.7815 }, area: 1800, carbonSequestered: 6340, creditsIssued: 5900, creditsRetired: 1800, verificationScore: 94, ndviAverage: 0.72, status: "active", startDate: "2023-01-10", lastVerified: "2025-06-15", communityMembers: 156, biodiversityScore: 91, waterQuality: 90, registry: "Verra VCS" },
  { id: "PRJ-004", name: "Chilika Lake Reserve", type: "Wetland", location: "Puri", state: "Odisha", coordinates: { lat: 19.7088, lng: 85.3184 }, area: 6800, carbonSequestered: 15200, creditsIssued: 14500, creditsRetired: 5200, verificationScore: 97, ndviAverage: 0.81, status: "active", startDate: "2022-03-20", lastVerified: "2025-06-22", communityMembers: 485, biodiversityScore: 96, waterQuality: 85, registry: "Verra VCS" },
  { id: "PRJ-005", name: "Bhitarkanika Corridor", type: "Mangrove", location: "Kendrapara", state: "Odisha", coordinates: { lat: 20.7286, lng: 86.8710 }, area: 3800, carbonSequestered: 9870, creditsIssued: 9200, creditsRetired: 2800, verificationScore: 95, ndviAverage: 0.76, status: "active", startDate: "2022-11-05", lastVerified: "2025-06-19", communityMembers: 267, biodiversityScore: 92, waterQuality: 86, registry: "Gold Standard" },
  { id: "PRJ-006", name: "Coringa Wildlife Sanctuary", type: "Mangrove", location: "East Godavari", state: "Andhra Pradesh", coordinates: { lat: 16.8002, lng: 82.2651 }, area: 2500, carbonSequestered: 7650, creditsIssued: 7000, creditsRetired: 1500, verificationScore: 93, ndviAverage: 0.69, status: "under_review", startDate: "2023-04-15", lastVerified: "2025-06-10", communityMembers: 189, biodiversityScore: 85, waterQuality: 79, registry: "Verra VCS" },
  { id: "PRJ-007", name: "Vembanad Wetlands", type: "Wetland", location: "Alappuzha", state: "Kerala", coordinates: { lat: 9.6145, lng: 76.3581 }, area: 2100, carbonSequestered: 4890, creditsIssued: 4500, creditsRetired: 1200, verificationScore: 92, ndviAverage: 0.68, status: "active", startDate: "2023-07-01", lastVerified: "2025-06-12", communityMembers: 134, biodiversityScore: 88, waterQuality: 84, registry: "Gold Standard" },
  { id: "PRJ-008", name: "Muthupet Lagoon", type: "Wetland", location: "Thanjavur", state: "Tamil Nadu", coordinates: { lat: 10.3667, lng: 79.5167 }, area: 1600, carbonSequestered: 5430, creditsIssued: 5000, creditsRetired: 900, verificationScore: 91, ndviAverage: 0.64, status: "active", startDate: "2023-02-28", lastVerified: "2025-06-14", communityMembers: 112, biodiversityScore: 83, waterQuality: 81, registry: "Verra VCS" },
  { id: "PRJ-009", name: "Godavari Delta Restoration", type: "Mangrove", location: "East Godavari", state: "Andhra Pradesh", coordinates: { lat: 16.7500, lng: 82.2500 }, area: 3100, carbonSequestered: 8200, creditsIssued: 7800, creditsRetired: 2200, verificationScore: 94, ndviAverage: 0.74, status: "active", startDate: "2023-09-10", lastVerified: "2025-06-21", communityMembers: 201, biodiversityScore: 90, waterQuality: 87, registry: "Gold Standard" },
  { id: "PRJ-010", name: "Ratnagiri Saltmarsh", type: "Saltmarsh", location: "Ratnagiri", state: "Maharashtra", coordinates: { lat: 16.9944, lng: 73.3000 }, area: 900, carbonSequestered: 2890, creditsIssued: 2600, creditsRetired: 600, verificationScore: 89, ndviAverage: 0.58, status: "pending", startDate: "2024-01-15", lastVerified: "2025-06-08", communityMembers: 78, biodiversityScore: 81, waterQuality: 78, registry: "Verra VCS" },
];

// ─── Blockchain Transactions ────────────────────────────────────────────────────
export interface BlockchainTx {
  hash: string;
  type: "Mint NFT" | "Transfer Credit" | "Retire Credit" | "Verify Project";
  from: string;
  to: string;
  amount: string;
  timestamp: string;
  status: "confirmed" | "pending";
  block: number;
  gas: string;
  projectId: string;
}

export const blockchainTransactions: BlockchainTx[] = [
  { hash: "0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456", type: "Mint NFT", from: "0xCarbonRush...Minter", to: "0xPriya...1234", amount: "CRP-00001", timestamp: "2 min ago", status: "confirmed", block: 58241093, gas: "0.0042 MATIC", projectId: "PRJ-001" },
  { hash: "0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a", type: "Transfer Credit", from: "0xRajesh...5678", to: "0xGreenFund...9012", amount: "500 tCO₂", timestamp: "15 min ago", status: "confirmed", block: 58241089, gas: "0.0038 MATIC", projectId: "PRJ-002" },
  { hash: "0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2", type: "Retire Credit", from: "0xTataSteel...3456", to: "0x000...Burn", amount: "1,200 tCO₂", timestamp: "1 hr ago", status: "confirmed", block: 58241045, gas: "0.0051 MATIC", projectId: "PRJ-004" },
  { hash: "0xd4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3", type: "Verify Project", from: "0xCarbonRush...AI", to: "0xRegistry...Verra", amount: "PRJ-005", timestamp: "2 hr ago", status: "confirmed", block: 58241001, gas: "0.0065 MATIC", projectId: "PRJ-005" },
  { hash: "0xe5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4", type: "Transfer Credit", from: "0xArjun...2345", to: "0xRelianceGreen...6789", amount: "800 tCO₂", timestamp: "3 hr ago", status: "confirmed", block: 58240987, gas: "0.0041 MATIC", projectId: "PRJ-005" },
  { hash: "0xf6789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4e5", type: "Mint NFT", from: "0xCarbonRush...Minter", to: "0xAnanya...9012", amount: "CRP-00003", timestamp: "4 hr ago", status: "confirmed", block: 58240943, gas: "0.0044 MATIC", projectId: "PRJ-003" },
  { hash: "0x6789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4e5f6", type: "Retire Credit", from: "0xInfosys...0123", to: "0x000...Burn", amount: "2,500 tCO₂", timestamp: "5 hr ago", status: "confirmed", block: 58240899, gas: "0.0058 MATIC", projectId: "PRJ-001" },
  { hash: "0x789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4e5f67", type: "Transfer Credit", from: "0xKavitha...4567", to: "0xAdaniGreen...8901", amount: "350 tCO₂", timestamp: "6 hr ago", status: "confirmed", block: 58240855, gas: "0.0039 MATIC", projectId: "PRJ-009" },
  { hash: "0x89012345678901234567890abcdef1234567890abcdef1234567ab2c3d4e5f678", type: "Verify Project", from: "0xCarbonRush...AI", to: "0xRegistry...Gold", amount: "PRJ-007", timestamp: "8 hr ago", status: "confirmed", block: 58240801, gas: "0.0062 MATIC", projectId: "PRJ-007" },
  { hash: "0x9012345678901234567890abcdef1234567890abcdef1234567ab2c3d4e5f6789", type: "Mint NFT", from: "0xCarbonRush...Minter", to: "0xAmit...8901", amount: "CRP-00010", timestamp: "10 hr ago", status: "confirmed", block: 58240756, gas: "0.0043 MATIC", projectId: "PRJ-010" },
  { hash: "0x012345678901234567890abcdef1234567890abcdef1234567ab2c3d4e5f67890", type: "Transfer Credit", from: "0xMeera...7890", to: "0xHDFCGreen...2345", amount: "150 tCO₂", timestamp: "12 hr ago", status: "confirmed", block: 58240712, gas: "0.0037 MATIC", projectId: "PRJ-007" },
  { hash: "0x12345678901234567890abcdef1234567890abcdef1234567ab2c3d4e5f678901", type: "Retire Credit", from: "0xMahindra...6789", to: "0x000...Burn", amount: "900 tCO₂", timestamp: "1 day ago", status: "confirmed", block: 58240668, gas: "0.0049 MATIC", projectId: "PRJ-002" },
];

// ─── Community Members ──────────────────────────────────────────────────────────
export interface CommunityMember {
  id: string;
  name: string;
  role: string;
  location: string;
  projectsInvolved: number;
  creditsEarned: number;
  joinedAt: string;
  verified: boolean;
  payoutReceived: number; // in INR
  language: string;
}

export const communityMembers: CommunityMember[] = [
  { id: "CM-001", name: "Priya Sharma", role: "Project Lead", location: "West Bengal", projectsInvolved: 3, creditsEarned: 4520, joinedAt: "2022-06", verified: true, payoutReceived: 285000, language: "Bengali" },
  { id: "CM-002", name: "Rajesh Kumar", role: "Field Verifier", location: "Gujarat", projectsInvolved: 2, creditsEarned: 3200, joinedAt: "2022-09", verified: true, payoutReceived: 198000, language: "Gujarati" },
  { id: "CM-003", name: "Ananya Patel", role: "Community Leader", location: "Tamil Nadu", projectsInvolved: 4, creditsEarned: 6800, joinedAt: "2022-02", verified: true, payoutReceived: 425000, language: "Tamil" },
  { id: "CM-004", name: "Vikram Singh", role: "Data Collector", location: "Odisha", projectsInvolved: 2, creditsEarned: 1890, joinedAt: "2023-05", verified: true, payoutReceived: 112000, language: "Odia" },
  { id: "CM-005", name: "Meera Nair", role: "Restoration Expert", location: "Kerala", projectsInvolved: 1, creditsEarned: 950, joinedAt: "2023-10", verified: true, payoutReceived: 58000, language: "Malayalam" },
  { id: "CM-006", name: "Arjun Reddy", role: "NGO Coordinator", location: "Andhra Pradesh", projectsInvolved: 5, creditsEarned: 8700, joinedAt: "2022-01", verified: true, payoutReceived: 540000, language: "Telugu" },
  { id: "CM-007", name: "Deepa Menon", role: "Fisherman Lead", location: "Odisha", projectsInvolved: 1, creditsEarned: 780, joinedAt: "2024-02", verified: false, payoutReceived: 0, language: "Odia" },
  { id: "CM-008", name: "Suresh Babu", role: "MSME Owner", location: "Tamil Nadu", projectsInvolved: 2, creditsEarned: 2100, joinedAt: "2023-08", verified: true, payoutReceived: 132000, language: "Tamil" },
  { id: "CM-009", name: "Kavitha Rao", role: "Scientist", location: "Karnataka", projectsInvolved: 3, creditsEarned: 5200, joinedAt: "2022-07", verified: true, payoutReceived: 325000, language: "Kannada" },
  { id: "CM-010", name: "Amit Deshmukh", role: "MSME Owner", location: "Maharashtra", projectsInvolved: 2, creditsEarned: 2800, joinedAt: "2023-03", verified: true, payoutReceived: 175000, language: "Marathi" },
];

// ─── Marketplace Listings ────────────────────────────────────────────────────────
export interface MarketplaceListing {
  id: string;
  projectName: string;
  seller: string;
  credits: number;
  pricePerCredit: number; // USD
  vintage: number;
  registry: string;
  type: string;
  status: "active" | "sold" | "expired";
  listedAt: string;
}

export const marketplaceListings: MarketplaceListing[] = [
  { id: "MKT-001", projectName: "Sundarbans Mangrove Delta", seller: "CarbonRush Verified", credits: 2500, pricePerCredit: 24.50, vintage: 2024, registry: "Verra VCS", type: "Mangrove", status: "active", listedAt: "2025-06-20" },
  { id: "MKT-002", projectName: "Chilika Lake Reserve", seller: "Odisha Green Fund", credits: 1800, pricePerCredit: 22.00, vintage: 2024, registry: "Verra VCS", type: "Wetland", status: "active", listedAt: "2025-06-19" },
  { id: "MKT-003", projectName: "Bhitarkanika Corridor", seller: "CarbonRush Verified", credits: 1200, pricePerCredit: 26.75, vintage: 2024, registry: "Gold Standard", type: "Mangrove", status: "active", listedAt: "2025-06-18" },
  { id: "MKT-004", projectName: "Pichavaram Seagrass", seller: "Tamil Nadu CC", credits: 800, pricePerCredit: 28.00, vintage: 2024, registry: "Verra VCS", type: "Seagrass", status: "active", listedAt: "2025-06-17" },
  { id: "MKT-005", projectName: "Godavari Delta", seller: "AP Restoration Trust", credits: 1500, pricePerCredit: 23.25, vintage: 2024, registry: "Gold Standard", type: "Mangrove", status: "sold", listedAt: "2025-06-15" },
  { id: "MKT-006", projectName: "Gulf of Kutch Marine", seller: "Gujarat Marine Trust", credits: 2000, pricePerCredit: 21.50, vintage: 2025, registry: "Gold Standard", type: "Wetland", status: "active", listedAt: "2025-06-22" },
  { id: "MKT-007", projectName: "Vembanad Wetlands", seller: "Kerala Green Initiative", credits: 600, pricePerCredit: 25.00, vintage: 2024, registry: "Gold Standard", type: "Wetland", status: "active", listedAt: "2025-06-21" },
  { id: "MKT-008", projectName: "Ratnagiri Saltmarsh", seller: "Maharashtra Coast Fund", credits: 400, pricePerCredit: 19.75, vintage: 2025, registry: "Verra VCS", type: "Saltmarsh", status: "active", listedAt: "2025-06-20" },
];

// ─── Fraud Alerts ───────────────────────────────────────────────────────────────
export interface FraudAlert {
  id: string;
  type: "duplicate_claim" | "boundary_overlap" | "ndvi_anomaly" | "identity_mismatch" | "carbon_inflation";
  severity: "critical" | "high" | "medium" | "low";
  projectId: string;
  projectName: string;
  description: string;
  detectedAt: string;
  status: "investigating" | "resolved" | "dismissed";
  aiConfidence: number;
}

export const fraudAlerts: FraudAlert[] = [
  { id: "FRD-001", type: "duplicate_claim", severity: "critical", projectId: "PRJ-EXT-001", projectName: "Unknown Mangrove Project", description: "Detected duplicate carbon credit claims overlapping with verified Sundarbans project boundaries. 2,400 tCO₂ potentially double-counted.", detectedAt: "2025-06-22T14:30:00Z", status: "investigating", aiConfidence: 98.7 },
  { id: "FRD-002", type: "ndvi_anomaly", severity: "high", projectId: "PRJ-006", projectName: "Coringa Wildlife Sanctuary", description: "Sudden 23% NDVI drop in eastern sector inconsistent with seasonal patterns. Possible unauthorized clearing detected.", detectedAt: "2025-06-21T09:15:00Z", status: "investigating", aiConfidence: 94.2 },
  { id: "FRD-003", type: "carbon_inflation", severity: "medium", projectId: "PRJ-010", projectName: "Ratnagiri Saltmarsh", description: "Carbon sequestration estimates 34% higher than model predictions for similar saltmarsh ecosystems. Recalibration recommended.", detectedAt: "2025-06-20T16:45:00Z", status: "resolved", aiConfidence: 87.5 },
  { id: "FRD-004", type: "boundary_overlap", severity: "high", projectId: "PRJ-009", projectName: "Godavari Delta", description: "12% boundary overlap detected with adjacent non-registered land use area. GPS verification needed.", detectedAt: "2025-06-19T11:20:00Z", status: "resolved", aiConfidence: 92.1 },
  { id: "FRD-005", type: "identity_mismatch", severity: "low", projectId: "PRJ-007", projectName: "Vembanad Wetlands", description: "Minor discrepancy in beneficiary records — 3 community members have incomplete Aadhaar linkage.", detectedAt: "2025-06-18T08:00:00Z", status: "dismissed", aiConfidence: 76.3 },
];

// ─── Platform Statistics ─────────────────────────────────────────────────────────
export const platformStats = {
  totalCarbonSequestered: 847532,
  totalCreditsIssued: 623841,
  totalCreditsRetired: 198400,
  totalProjects: 512,
  activeProjects: 487,
  totalCommunityMembers: 2847,
  totalPayoutsINR: 142500000, // ₹14.25 Cr
  averageVerificationScore: 97.3,
  blockchainTransactions: 45231,
  nftsMinted: 512,
  smartContracts: 3,
  polygonNetwork: "Mainnet",
  latestBlock: 58241093,
  fraudsDetected: 47,
  fraudsPrevented: 45,
  carbonValue: 18700000, // $18.7M
};

// ─── ESG Report Data ─────────────────────────────────────────────────────────────
export const esgReportData = {
  environmental: {
    totalCarbonOffset: "847,532 tCO₂e",
    biodiversitySpeciesProtected: 342,
    waterQualityImprovement: "23% avg improvement",
    mangroveAreaRestored: "12,400 hectares",
    coastalErosionReduction: "34%",
    marineBiodiversityIndex: 8.7,
  },
  social: {
    communitiesBenefited: 2847,
    directJobs: 1240,
    indirectJobs: 3800,
    womenParticipation: "42%",
    financialInclusion: "89% bank-linked",
    languagesSupported: 12,
    avgIncomeIncrease: "28%",
  },
  governance: {
    transparencyScore: "98/100",
    auditFrequency: "Quarterly",
    blockchainVerification: "100%",
    regulatoryCompliance: ["Verra VCS", "Gold Standard", "UNFCCC CDM"],
    dataProtection: "ISO 27001 Compliant",
    thirdPartyAudits: 12,
  },
};

// ─── Smart Contract Info ──────────────────────────────────────────────────────────
export const smartContracts = [
  {
    name: "CarbonPassportNFT",
    address: "0x742d...3a91",
    network: "Polygon Mainnet",
    standard: "ERC-721",
    totalMinted: 512,
    description: "Issues unique Carbon Passport NFTs for each verified blue carbon project. Each NFT contains immutable verification data, carbon metrics, and provenance chain.",
    functions: ["mintPassport()", "verifyCarbon()", "getProjectData()", "transferOwnership()"],
    events: ["PassportMinted", "CarbonVerified", "OwnershipTransferred"],
    gasEstimate: "~0.004 MATIC per mint",
  },
  {
    name: "CarbonCreditToken",
    address: "0x891f...7b24",
    network: "Polygon Mainnet",
    standard: "ERC-20",
    totalSupply: "623,841 CCT",
    description: "Fungible carbon credit tokens representing 1 tCO₂e each. Supports transfer, retirement (burn), and fractional trading on the CarbonRush marketplace.",
    functions: ["transfer()", "retire()", "batchTransfer()", "approve()", "balanceOf()"],
    events: ["Transfer", "CreditRetired", "Approval"],
    gasEstimate: "~0.003 MATIC per transfer",
  },
  {
    name: "VerificationOracle",
    address: "0x5c3d...9e17",
    network: "Polygon Mainnet",
    standard: "Custom",
    totalVerifications: 45231,
    description: "On-chain verification oracle that records AI verification results, NDVI data, and carbon estimation outputs. Provides tamper-proof audit trail for all project verifications.",
    functions: ["submitVerification()", "getVerificationHistory()", "flagAnomaly()", "updateNDVI()"],
    events: ["VerificationSubmitted", "AnomalyFlagged", "NDVIUpdated"],
    gasEstimate: "~0.006 MATIC per verification",
  },
];

// ─── Buyer Specific Data ─────────────────────────────────────────────────────────
export interface BuyerEmissions {
  month: string;
  emissions: number;
  offset: number;
}

export const buyerEmissionsData: BuyerEmissions[] = [
  { month: "Jan", emissions: 120, offset: 50 },
  { month: "Feb", emissions: 130, offset: 60 },
  { month: "Mar", emissions: 125, offset: 80 },
  { month: "Apr", emissions: 140, offset: 100 },
  { month: "May", emissions: 135, offset: 120 },
  { month: "Jun", emissions: 150, offset: 150 },
];

export interface CarbonPurchase {
  id: string;
  date: string;
  project: string;
  credits: number;
  amount: number; // in INR
  status: "Completed" | "Pending";
  passportId: string;
}

export const buyerPurchases: CarbonPurchase[] = [
  { id: "PUR-001", date: "2024-05-10", project: "Sundarbans Mangrove Delta", credits: 500, amount: 1250000, status: "Completed", passportId: "CRP-00001" },
  { id: "PUR-002", date: "2024-06-01", project: "Chilika Lake Reserve", credits: 300, amount: 660000, status: "Completed", passportId: "CRP-00004" },
];

// ─── Grower Specific Data ────────────────────────────────────────────────────────
export interface GrowerProject {
  id: string;
  name: string;
  location: string;
  area: number;
  trees: number;
  status: "pending_ai_review" | "pending_ngo_review" | "verified" | "rejected";
  date: string;
  aiScore?: number;
  carbonTons?: number;
}

export const growerProjects: GrowerProject[] = [
  { id: "GP-001", name: "Sundarbans Plot A", location: "South 24 Parganas, WB", area: 15, trees: 4500, status: "verified", date: "2024-01-15", aiScore: 98, carbonTons: 320 },
  { id: "GP-002", name: "Sundarbans Plot B", location: "South 24 Parganas, WB", area: 10, trees: 3000, status: "pending_ngo_review", date: "2024-05-20", aiScore: 94, carbonTons: 210 },
  { id: "GP-003", name: "Sundarbans Plot C", location: "South 24 Parganas, WB", area: 5, trees: 1500, status: "pending_ai_review", date: "2024-06-10" },
];

export interface EvidenceUpload {
  id: string;
  projectId: string;
  fileName: string;
  fileType: string;
  date: string;
  status: "Processing" | "Verified" | "Rejected";
}

export const evidenceUploads: EvidenceUpload[] = [
  { id: "EV-001", projectId: "GP-002", fileName: "drone_survey_1.jpg", fileType: "image/jpeg", date: "2024-05-18", status: "Verified" },
  { id: "EV-002", projectId: "GP-002", fileName: "land_deed.pdf", fileType: "application/pdf", date: "2024-05-18", status: "Verified" },
  { id: "EV-003", projectId: "GP-003", fileName: "planting_photos.zip", fileType: "application/zip", date: "2024-06-10", status: "Processing" },
];

export interface Payout {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "Paid" | "Pending" | "Processing";
  project: string;
}

export const growerPayouts: Payout[] = [
  { id: "PAY-001", date: "2024-02-01", amount: 45000, method: "Bank Transfer (...4567)", status: "Paid", project: "Sundarbans Plot A" },
  { id: "PAY-002", date: "2024-06-25", amount: 15000, method: "UPI (grower@ybl)", status: "Pending", project: "Sundarbans Plot B" },
];

