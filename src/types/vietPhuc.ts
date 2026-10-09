/**
 * Types cho dự án Việt Hoa Di Tân — Xưởng Phối Việt Phục
 * Tuân thủ Gemini Contract v1
 */

export type GarmentGender = 'nam' | 'nu';

export type ContextType = 'dao_pho' | 'le_hoi' | 'su_kien_cuoi_hoi' | 'cong_so';

export type StyleType = 'truyen_thong' | 'toi_gian' | 'cach_tan';

export interface ColorOption {
  id: string;
  name: string;
  vietnameseName: string;
  hex: string;
  pantPairing: string;
  description: string;
}

export interface AccessoryOption {
  id: string;
  name: string;
  category: 'headwear' | 'footwear' | 'handheld' | 'jewelry' | 'modern';
  description: string;
  isModern?: boolean;
}

export interface OutfitState {
  garmentId: string;
  garmentName: string;
  gender: GarmentGender;
  context: ContextType;
  style: StyleType;
  primaryColor: ColorOption;
  pantsColor: string; // 'white' | 'black' | 'navy'
  hasInnerLayer: boolean;
  innerCollarColor: string;
  accessories: string[];
  renderStatus: 'idle' | 'rendering' | 'ready' | 'error';
  geminiStatus: 'idle' | 'analyzing' | 'done' | 'error' | 'skipped';
  feedback: GeminiContractV1 | null;
  activeTestCaseId: string | null;
  errorMessage?: string;
  isFallback?: boolean;
}

export interface Finding {
  rule_id: string;
  message: string;
  evidence_ids: string[];
}

export interface Suggestion {
  target: 'color' | 'accessory';
  action: 'keep' | 'replace' | 'remove';
  value: string;
  reason: string;
}

export interface GeminiContractV1 {
  schema_version: '1.0';
  style_feedback: {
    summary: string;
  };
  culture_check: {
    status: 'ok' | 'needs_attention' | 'insufficient_evidence';
    findings: Finding[];
  };
  suggestions: Suggestion[];
  explanation: string;
  is_fallback?: boolean;
  fallback_reason?: string;
}

export interface CulturalRule {
  id: string;
  title: string;
  rule: string;
  evidence: string;
  evidence_ids: string[];
  historical_context: string;
}

export interface TestCase {
  id: string;
  code: string; // 'TC01', 'TC02', ...
  title: string;
  description: string;
  expectedStatus: 'ok' | 'needs_attention' | 'insufficient_evidence' | 'error';
  outfitPreset: Partial<OutfitState>;
  mockContract: GeminiContractV1 | null;
  notes: string;
}

