"use client";
import { Button } from "./Button";
import { IconSymbol } from "./IconSymbol";
export function PrintCVButton() {
  return <Button onClick={() => window.print()}><IconSymbol name="print" size={18} /> Print / save as PDF</Button>;
}
