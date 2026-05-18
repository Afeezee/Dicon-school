import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = siteConfig.ogImageAlt;
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default function TwitterImage(): ImageResponse {
  return new ImageResponse(
    (
      <div tw="flex h-full w-full bg-[#0A0A0A] text-[#F0E8D0]">
        <div tw="flex h-full w-full flex-col justify-between border border-[#C8A84B] px-18 py-14">
          <div tw="flex items-center gap-5">
            <div tw="flex h-16 w-16 items-center justify-center rounded-[24px] border-2 border-[#C8A84B] bg-[#141414] text-[40px] font-bold text-[#E8C96A]">
              D
            </div>
            <div tw="flex flex-col">
              <span tw="font-semibold text-[22px] uppercase tracking-[0.28em] text-[#E8C96A]">D&apos;Icon School</span>
              <span tw="text-[18px] text-[#9A8870]">Official Website</span>
            </div>
          </div>

          <div tw="flex flex-col gap-4">
            <h1 tw="m-0 max-w-[900px] text-[64px] leading-[1.08] text-[#F0E8D0]">
              Train where icons are made.
            </h1>
            <p tw="m-0 max-w-[880px] text-[28px] leading-[1.32] text-[#C9B89F]">
              Explore the school, founder story, filmography, alumni success, admissions, and gallery.
            </p>
          </div>

          <div tw="flex items-center justify-between text-[20px] text-[#9A8870]">
            <span>Founded by Ibrahim Yekini (Itele D&apos;Icon)</span>
            <span tw="text-[#E8C96A]">diconschool.com</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}