import type { ScanResponse } from "./api";

const KEY = "patchpilot:lastScan";

export function saveLastScan(scan: ScanResponse) {
  localStorage.setItem(KEY, JSON.stringify(scan));
}

export function loadLastScan(): ScanResponse | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ScanResponse;
  } catch {
    return null;
  }
}

export function clearLastScan() {
  localStorage.removeItem(KEY);
}
