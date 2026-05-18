import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = siteConfig.ogImageAlt;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div tw="flex h-full w-full bg-[#0A0A0A] text-[#F0E8D0]">
        <div tw="flex h-full w-full flex-col justify-between border border-[#C8A84B] px-20 py-18">
          <div tw="flex items-center justify-between">
            <div tw="flex items-center gap-5">
              <div tw="flex h-18 w-18 items-center justify-center rounded-[26px] border-2 border-[#C8A84B] bg-[#141414] text-[48px] font-bold text-[#E8C96A]">
                D
              </div>
              <div tw="flex flex-col">
                <span tw="font-semibold text-[26px] uppercase tracking-[0.32em] text-[#E8C96A]">D&apos;Icon School</span>
                <span tw="text-[22px] text-[#9A8870]">Official Website</span>
              </div>
            </div>
            <div tw="rounded-full border border-[#8B1A1A] bg-[#8B1A1A]/20 px-6 py-3 text-[20px] uppercase tracking-[0.24em] text-[#F6CDCD]">
              Yoruba Performing Arts
            </div>
          </div>

          <div tw="flex flex-col gap-6">
            <div tw="h-[2px] w-36 bg-[#C8A84B]" />
            <h1 tw="m-0 max-w-[880px] text-[78px] leading-[1.06] text-[#F0E8D0]">
              Where Talent Becomes Legacy.
            </h1>
            <p tw="m-0 max-w-[920px] text-[30px] leading-[1.35] text-[#C9B89F]">
              Acting, directing, scriptwriting, and production training led by Ibrahim Yekini (Itele D&apos;Icon).
            </p>
          </div>

          <div tw="flex items-center justify-between text-[22px] text-[#9A8870]">
            <span>Movies, alumni, admissions, gallery, and official school information.</span>
            <span tw="text-[#E8C96A]">diconschool.com</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}