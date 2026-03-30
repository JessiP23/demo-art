"use client";

import { motion } from "framer-motion";
import {
  budgetBands,
  moodOptions,
  paletteOptions,
  roomOptions,
  styleOptions,
  styleSignals,
  type TasteProfile,
} from "../lib/artmatch-data";

type OnboardingPanelProps = {
  profile: TasteProfile;
  onBudgetChange: (budgetBand: string) => void;
  onPreferenceChange: (field: keyof TasteProfile, value: string) => void;
};

export function OnboardingPanel({
  profile,
  onBudgetChange,
  onPreferenceChange,
}: OnboardingPanelProps) {
  return (
    <section className="grid gap-6 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_12px_40px_-22px_rgba(0,0,0,0.35)] lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/55">
          Onboarding / Taste Capture
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
          Explainable taste matching.
        </h2>
        <div className="flex flex-wrap gap-2">
          {styleSignals.map((signal) => (
            <span
              key={signal}
              className="rounded-full border border-black/10 bg-stone-100 px-3 py-1.5 text-xs font-medium text-black/75"
            >
              {signal}
            </span>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-4 rounded-2xl border border-black/10 bg-stone-50 p-4"
      >
        <p className="text-sm font-medium text-black/70">{profile.roomType} profile</p>
        <div className="space-y-2 text-sm text-black/70">
          <p>{profile.style}</p>
          <p>{profile.palette}</p>
          <p>{profile.mood}</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/55">Style</p>
          <div className="flex flex-wrap gap-2">
            {styleOptions.map((option) => {
              const active = profile.style === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onPreferenceChange("style", option.value)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    active
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-black/75 hover:border-black/30"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/55">Palette</p>
          <div className="flex flex-wrap gap-2">
            {paletteOptions.map((option) => {
              const active = profile.palette === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onPreferenceChange("palette", option.value)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    active
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-black/75 hover:border-black/30"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/55">Mood</p>
          <div className="flex flex-wrap gap-2">
            {moodOptions.map((option) => {
              const active = profile.mood === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onPreferenceChange("mood", option.value)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    active
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-black/75 hover:border-black/30"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/55">
            Primary room
          </p>
          <div className="flex flex-wrap gap-2">
            {roomOptions.map((option) => {
              const active = profile.roomType === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onPreferenceChange("roomType", option.value)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    active
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-black/75 hover:border-black/30"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-2 pt-2">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/55">
            Budget band
          </p>
          <div className="grid grid-cols-3 gap-2">
            {budgetBands.map((band) => {
              const active = band === profile.budgetBand;
              return (
                <button
                  key={band}
                  type="button"
                  onClick={() => onBudgetChange(band)}
                  className={`rounded-xl border px-2 py-2 text-xs font-medium transition ${
                    active
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-black/75 hover:border-black/30"
                  }`}
                >
                  {band}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
