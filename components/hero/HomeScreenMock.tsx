import Image from 'next/image';
import { u } from './phone-scale';
import {
  CallMadeIcon,
  ChevronUpIcon,
  ContentCopyIcon,
  EyeIcon,
  GridViewIcon,
  HomeIcon,
  QrCodeScannerIcon,
  ReceiptLongIcon,
  ScalesPattern,
  SettingsIcon,
  SolanaIcon,
  SwapIcon,
} from './wallet-icons';

/**
 * The wallet's home screen, rebuilt for the web with hardcoded holdings.
 *
 * Mirrors apps/mobile/app/(app)/(tabs)/index.tsx in salmon-wallet-v3 and the
 * components it composes (HeaderContent, BalanceCardCarousel, ActionButtonRow,
 * TokenListItem, GlassTabBar): same tokens, same measurements, expressed
 * against the 440pt reference screen via u(). Colors come from
 * packages/shared/src/theme/colors.ts.
 *
 * Every figure is internally consistent: each row's USD value is
 * amount × price, the card total is the sum of the rows ($2,011.54), and the
 * 24h change (+1.65% / +$32.66) is the weighted result of the per-token moves.
 */

const COLORS = {
  textPrimary: '#FFFFFF',
  textMuted: 'rgba(255, 255, 255, 0.7)',
  textBalance: '#e0e0e0',
  accentBorder: 'rgba(255, 92, 69, 0.8)',
  positive: '#80ff54',
  negative: '#FF5252',
  neutral: '#9E9E9E',
  glassBg: 'rgba(56, 63, 82, 0.1)',
  glassBorder: 'rgba(64, 73, 98, 0.5)',
  tabActive: '#FF5C45',
  tabInactive: 'rgba(255, 255, 255, 0.6)',
  dotInactive: 'rgba(255, 255, 255, 0.3)',
} as const;

interface MockToken {
  symbol: string;
  name: string;
  logo: string;
  price: string;
  change: string;
  direction: 'up' | 'down' | 'flat';
  usdValue: string;
  amount: string;
}

const TOKENS: MockToken[] = [
  {
    symbol: 'SOL',
    name: 'Solana',
    logo: '/images/tokens/sol.png',
    price: '$163.50',
    change: '+2.40 % (+$31.42)',
    direction: 'up',
    usdValue: '$1,340.70',
    amount: '8.2 SOL',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    logo: '/images/tokens/usdc.png',
    price: '$1.00',
    change: '0.00 % ($0.00)',
    direction: 'flat',
    usdValue: '$350.00',
    amount: '350 USDC',
  },
  {
    symbol: 'JUP',
    name: 'Jupiter',
    logo: '/images/tokens/jup.png',
    price: '$0.52',
    change: '-1.80 % (-$3.93)',
    direction: 'down',
    usdValue: '$214.24',
    amount: '412 JUP',
  },
  {
    symbol: 'BONK',
    name: 'Bonk',
    logo: '/images/tokens/bonk.png',
    price: '$0.00',
    change: '+5.10 % (+$5.17)',
    direction: 'up',
    usdValue: '$106.60',
    amount: '5,200,000 BONK',
  },
];

const changeColor = (direction: MockToken['direction']) =>
  direction === 'up' ? COLORS.positive : direction === 'down' ? COLORS.negative : COLORS.neutral;

const TABS = [
  { label: 'Home', icon: HomeIcon, active: true },
  { label: 'Collectibles', icon: GridViewIcon, active: false },
  { label: 'Swap', icon: SwapIcon, active: false },
] as const;

export default function HomeScreenMock() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex flex-col bg-[#10131c]">
      {/* Wallet header — the collapsed gate bar the balance card slides under */}
      <div
        className="absolute left-0 right-0 top-0 z-20 bg-[#10131c]"
        style={{
          height: u(118),
          borderBottomLeftRadius: u(24),
          borderBottomRightRadius: u(24),
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between"
          style={{ height: u(56), paddingInline: u(18) }}
        >
          <div className="flex min-w-0 flex-1 items-center" style={{ gap: u(10) }}>
            <span
              className="flex items-center justify-center bg-[#8B5CF6] font-bold text-white"
              style={{ width: u(28), height: u(28), borderRadius: u(14), fontSize: u(10) }}
            >
              A1
            </span>
            <span
              className="truncate font-semibold"
              style={{ fontSize: u(12), letterSpacing: u(0.12), color: COLORS.textPrimary }}
            >
              Account 1 (6yKH…P8wM)
            </span>
            <ContentCopyIcon size={u(23)} color={COLORS.textPrimary} />
          </div>
          <SettingsIcon size={u(30)} color={COLORS.textMuted} />
        </div>
      </div>

      {/* Balance card — Solana gradient + scales overlay, content clears the header */}
      <div
        className="relative z-10 overflow-hidden"
        style={{
          marginTop: u(62),
          borderRadius: u(26),
          background: 'linear-gradient(180deg, #4A1A8C 0%, #2D1052 35%, #1A0A33 75%, #1A0A33 100%)',
          boxShadow: '0 12px 16px rgba(0, 0, 0, 0.8)',
        }}
      >
        <ScalesPattern stroke="rgba(153, 69, 255, 0.15)" />
        <div
          className="relative flex flex-col items-center"
          style={{ paddingTop: u(75), paddingInline: u(24), paddingBottom: u(16), gap: u(8) }}
        >
          <div style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }}>
            <SolanaIcon size={u(45)} color={COLORS.textPrimary} />
          </div>

          <div className="flex flex-col items-center" style={{ gap: u(4) }}>
            <div
              className="flex items-center"
              style={{ gap: u(12), textShadow: `0 ${u(3)} ${u(18)} rgba(0, 0, 0, 1)` }}
            >
              <span
                className="font-semibold"
                style={{
                  fontSize: u(60),
                  lineHeight: 1.1,
                  letterSpacing: u(-0.245),
                  color: COLORS.textBalance,
                }}
              >
                $2,011
                <span style={{ color: COLORS.textPrimary, opacity: 0.4 }}>.54</span>
              </span>
              <span style={{ padding: u(4) }}>
                <EyeIcon size={u(20)} color={COLORS.textMuted} />
              </span>
            </div>

            <div
              className="flex items-center font-medium"
              style={{
                fontSize: u(12),
                lineHeight: 1.3,
                letterSpacing: u(0.13),
                color: COLORS.positive,
              }}
            >
              <span>+1.65 %</span>
              <span style={{ marginInline: u(2) }}>
                <ChevronUpIcon size={u(15)} color={COLORS.positive} />
              </span>
              <span>(+$32.66)</span>
            </div>
          </div>

          {/* Pagination dots: Solana active, Bitcoin and Ethereum waiting */}
          <div className="flex items-center" style={{ marginTop: u(8) }}>
            {[true, false, false].map((active, i) => (
              <span
                key={i}
                className="rounded-full"
                style={{
                  width: u(4),
                  height: u(4),
                  marginInline: u(3),
                  backgroundColor: active ? COLORS.textPrimary : COLORS.dotInactive,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Send / Receive / Activity */}
      <div
        className="flex items-center justify-between"
        style={{ marginBlock: u(24), paddingInline: u(40) }}
      >
        <span
          className="flex items-center justify-center"
          style={{
            width: u(112),
            height: u(47),
            gap: u(8),
            borderRadius: u(14),
            fontSize: u(16),
            lineHeight: 1.35,
            color: COLORS.textBalance,
            background: 'linear-gradient(93deg, #FF5C45, rgba(161, 42, 42, 0.9))',
            border: `1px solid ${COLORS.accentBorder}`,
          }}
        >
          <CallMadeIcon size={u(18)} color={COLORS.textBalance} />
          Send
        </span>
        {(
          [
            { label: 'Receive', Icon: QrCodeScannerIcon },
            { label: 'Activity', Icon: ReceiptLongIcon },
          ] as const
        ).map(({ label, Icon }) => (
          <span
            key={label}
            className="flex items-center justify-center backdrop-blur-[4px]"
            style={{
              width: u(112),
              height: u(47),
              gap: u(8),
              borderRadius: u(14),
              fontSize: u(16),
              lineHeight: 1.35,
              color: COLORS.textBalance,
              backgroundColor: COLORS.glassBg,
              border: '1px solid rgba(255, 92, 69, 0.45)',
            }}
          >
            <Icon size={u(18)} color={COLORS.textBalance} />
            {label}
          </span>
        ))}
      </div>

      {/* Token list */}
      <div className="flex flex-col">
        {TOKENS.map((token) => (
          <div
            key={token.symbol}
            className="flex items-center backdrop-blur-[4px]"
            style={{
              marginInline: u(24),
              marginBottom: u(8),
              padding: u(12),
              gap: u(12),
              borderRadius: u(12),
              backgroundColor: COLORS.glassBg,
              border: `1px solid ${COLORS.glassBorder}`,
            }}
          >
            <Image
              src={token.logo}
              alt=""
              width={76}
              height={76}
              className="shrink-0 object-cover"
              style={{ width: u(38), height: u(38), borderRadius: u(22) }}
            />

            <div className="min-w-0 flex-1">
              <p
                className="truncate font-medium"
                style={{
                  fontSize: u(13.65),
                  lineHeight: 1.4,
                  letterSpacing: u(-0.07),
                  color: COLORS.textBalance,
                }}
              >
                {token.name}
              </p>
              <p className="flex items-center whitespace-nowrap" style={{ gap: u(2) }}>
                <span
                  className="font-semibold"
                  style={{
                    fontSize: u(13.65),
                    lineHeight: 1.4,
                    letterSpacing: u(-0.07),
                    color: COLORS.textMuted,
                  }}
                >
                  {token.price}
                </span>
                <span style={{ fontSize: u(13.65), color: changeColor(token.direction) }}>
                  {token.direction === 'down' ? '▼' : '▲'}
                </span>
                <span
                  className="font-light"
                  style={{
                    fontSize: u(11.375),
                    letterSpacing: u(-0.06),
                    color: changeColor(token.direction),
                  }}
                >
                  {token.change}
                </span>
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-end" style={{ gap: u(4) }}>
              <span
                className="font-medium"
                style={{ fontSize: u(18), letterSpacing: u(-0.09), color: COLORS.textBalance }}
              >
                {token.usdValue}
              </span>
              <span className="font-medium" style={{ fontSize: u(12), color: COLORS.textPrimary }}>
                {token.amount}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Glass tab bar over a bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30"
        style={{
          paddingInline: u(16),
          paddingTop: u(16),
          paddingBottom: u(42),
          background: 'linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <div
          className="w-full overflow-hidden backdrop-blur-[12px]"
          style={{
            borderRadius: u(28),
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.22)',
          }}
        >
          <div
            className="flex items-center justify-around"
            style={{ minHeight: u(68), paddingInline: u(12), paddingBlock: u(4) }}
          >
            {TABS.map(({ label, icon: Icon, active }) => {
              const color = active ? COLORS.tabActive : COLORS.tabInactive;
              return (
                <span
                  key={label}
                  className="flex flex-1 flex-col items-center justify-center"
                  style={{ minHeight: u(60), gap: u(2) }}
                >
                  <Icon size={u(26)} color={color} />
                  <span
                    className="font-semibold"
                    style={{ fontSize: u(11), lineHeight: `${(13 * 100) / 440}cqw`, letterSpacing: u(0.2), color }}
                  >
                    {label}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
