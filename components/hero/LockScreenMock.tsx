import Image from 'next/image';

/**
 * The wallet's lock screen, rebuilt for the web.
 *
 * Mirrors apps/mobile/src/components/GateContainer/LockContent.tsx in
 * salmon-wallet-v3: same copy, same tokens, same measurements. Every size below
 * is the value that file uses, expressed against a 390pt screen, so the mock
 * stays true to the app at whatever width the hero renders it.
 */

/** Design px on a 390pt screen → a share of the phone frame's width. */
const u = (px: number) => `${(px * 100) / 390}cqw`;

const ACCENT = '#FF5C45';
const ACCENT_END = 'rgba(161, 42, 42, 0.9)';

export default function LockScreenMock() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex select-none flex-col items-center justify-center bg-[#10131c]"
      style={{ paddingInline: u(36), gap: u(40) }}
    >
      {/* Logo + greeting + password field */}
      <div className="flex w-full flex-col items-center" style={{ gap: u(31) }}>
        <Image
          src="/images/logo.png"
          alt=""
          width={140}
          height={140}
          priority
          style={{ width: u(140), height: u(140) }}
        />

        <p
          className="text-center font-bold text-white"
          style={{ fontSize: u(24), lineHeight: u(38) }}
        >
          Welcome back
        </p>

        <div
          className="flex w-full items-center"
          style={{
            minHeight: u(54),
            paddingInline: u(16),
            paddingBlock: u(8),
            borderRadius: u(9),
            border: '0.75px solid #404962',
            backgroundColor: 'rgba(64, 73, 98, 0.2)',
          }}
        >
          <span className="text-[#8A8D98]" style={{ fontSize: u(18) }}>
            Enter Your Password
          </span>
        </div>
      </div>

      {/* Unlock + forgot password */}
      <div className="flex w-full flex-col" style={{ gap: u(22) }}>
        <div
          className="flex w-full items-center justify-center font-bold text-white"
          style={{
            minHeight: u(52),
            paddingBlock: u(8),
            borderRadius: u(20),
            border: `1px solid ${ACCENT}cc`,
            backgroundImage: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_END})`,
            boxShadow: '0 0 12px rgba(0, 0, 0, 0.64)',
            fontSize: u(16),
          }}
        >
          Unlock
        </div>

        <p
          className="text-center font-bold text-white"
          style={{ fontSize: u(16), padding: u(12) }}
        >
          I forgot my password
        </p>
      </div>
    </div>
  );
}
