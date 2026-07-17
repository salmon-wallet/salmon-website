import { u } from './phone-scale';

/**
 * iPhone 17 Pro Max hardware shell for the hero phone.
 *
 * Device metrics (logical points): 440×956 display, 62pt display corner
 * radius, Dynamic Island 126×37 at 11pt from the top, 54pt-high status bar
 * content, 150×5 home indicator. All values are expressed against the 440pt
 * screen width so the frame scales with whatever size the hero renders it.
 */
export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  // cqw units resolve against the nearest ancestor container, so the parent —
  // not this element — must carry @container for the frame's own radius/shadow.
  return (
    <div
      className="relative h-full w-full"
      style={{
        borderRadius: u(62),
        boxShadow: `0 0 0 ${u(5)} #010101, 0 0 0 ${u(9)} #4a4d55, 0 0 0 ${u(10)} #16181d, 0 0 80px rgba(255, 92, 69, 0.1)`,
      }}
    >
      <div
        className="absolute inset-0 select-none overflow-hidden bg-[#10131c]"
        style={{ borderRadius: u(62) }}
      >
        {children}

        {/* Status bar — content centres on the Dynamic Island's midline */}
        <div
          className="absolute left-0 right-0 top-0 z-40 flex items-center justify-between text-white"
          style={{ height: u(59), paddingLeft: u(52), paddingRight: u(38) }}
        >
          <span className="font-semibold" style={{ fontSize: u(17) }}>
            9:41
          </span>
          <span className="flex items-center" style={{ gap: u(7) }}>
            {/* Cellular */}
            <svg style={{ width: u(19), height: u(12) }} viewBox="0 0 19 12" aria-hidden="true">
              <rect x="0" y="7.5" width="3.5" height="4.5" rx="1" fill="currentColor" />
              <rect x="5" y="5" width="3.5" height="7" rx="1" fill="currentColor" />
              <rect x="10" y="2.5" width="3.5" height="9.5" rx="1" fill="currentColor" />
              <rect x="15" y="0" width="3.5" height="12" rx="1" fill="currentColor" />
            </svg>
            {/* Wi-Fi */}
            <svg style={{ width: u(17), height: u(12) }} viewBox="0 0 17 12" fill="none" aria-hidden="true">
              <path
                d="M1 4.2C3.1 2.2 5.7 1.1 8.5 1.1s5.4 1.1 7.5 3.1"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
              <path
                d="M3.6 7C5 5.7 6.7 5 8.5 5s3.5.7 4.9 2"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
              />
              <circle cx="8.5" cy="10.2" r="1.7" fill="currentColor" />
            </svg>
            {/* Battery */}
            <svg style={{ width: u(26), height: u(12) }} viewBox="0 0 26 12" fill="none" aria-hidden="true">
              <rect x="0.6" y="0.6" width="21.8" height="10.8" rx="3" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />
              <rect x="2.4" y="2.4" width="18.2" height="7.2" rx="1.7" fill="currentColor" />
              <path d="M24.2 4v4a2.2 2.2 0 0 0 0-4z" fill="currentColor" fillOpacity="0.4" />
            </svg>
          </span>
        </div>

        {/* Dynamic Island */}
        <div
          className="absolute left-1/2 z-40 -translate-x-1/2 rounded-full bg-black"
          style={{ top: u(11), width: u(126), height: u(37) }}
        />

        {/* Home indicator */}
        <div
          className="absolute left-1/2 z-40 -translate-x-1/2 rounded-full bg-white"
          style={{ bottom: u(8), width: u(150), height: u(5) }}
        />
      </div>
    </div>
  );
}
