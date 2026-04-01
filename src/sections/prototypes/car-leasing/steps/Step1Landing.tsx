import React from 'react'
import { Button } from '@/components/molecules/Button'
import { Slider } from '@/components/molecules/Slider'
import { Checkbox } from '@/components/molecules/Checkbox'
import { Card } from '@/components/molecules/Card'
import { Typography } from '@/components/atoms/Typography'
import { Icon } from '@/components/atoms/Icon'
import { FAQ, type FAQItem } from '@/components/templates/FAQ'
import { Footer, type FooterColumn, type SocialLink } from '@/components/templates/Footer'
import { Carousel, type CarouselSlide } from '@/components/templates/Carousel'

const EUR_TO_BGN = 1.956
const fmt = (n: number) =>
  Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')

// Figma asset URL (valid for 7 days)
const MAN_PHOTO = 'https://www.figma.com/api/mcp/asset/6f743b62-171f-4139-832a-6ac6e410016c'
const BG_TEXTURE = 'https://www.figma.com/api/mcp/asset/b1b5b047-bb28-4cd0-9293-922b70b9c041'
const GOOGLE_RATING_IMG = 'https://www.figma.com/api/mcp/asset/46004dde-961c-4cea-8aed-99cee8cfd642'

// ── Data ────────────────────────────────────────────────────

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Какво представлява застраховката Авто-Каско?',
    answer: 'Авто-Каско е доброволна застраховка, която покрива щети по Вашия автомобил независимо от вината – при катастрофа, природни бедствия, кражба и вандализъм.',
  },
  {
    question: 'Каква е разликата между „Гражданска отговорност" и Авто-Каско?',
    answer: 'ГО е задължителна застраховка, покриваща щети, нанесени на трети лица. Каско е доброволна и покрива щети по Вашето собствено превозно средство.',
  },
  {
    question: 'Какво обикновено не се покрива?',
    answer: 'Стандартните изключения включват умишлени щети, управление под влияние на алкохол, нормално износване и механични повреди без външна причина.',
  },
  {
    question: 'От какво зависи цената на Авто-Каско?',
    answer: 'Цената зависи от марката и модела на автомобила, годината на производство, кубатурата на двигателя, историята на щетите и избраното самоучастие.',
  },
  {
    question: 'Какво е „самоучастие"?',
    answer: 'Самоучастието е частта от щетата, която покривате сами при всяка претенция. По-голямото самоучастие обикновено означава по-ниска застрахователна премия.',
  },
]

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Продукти',
    links: [
      { label: 'Гражданска отговорност', href: '#' },
      { label: 'Каско', href: '#' },
      { label: 'За дома', href: '#' },
      { label: 'Пътна застраховка', href: '#' },
      { label: 'Домашен интернет и ТВ', href: '#' },
      { label: 'Заеми', href: '#' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { label: 'За нас', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Рецензии', href: '#' },
      { label: 'Статии', href: '#' },
      { label: 'Политика за поверителност', href: '#' },
      { label: 'Свържете се с нас', href: '#' },
    ],
  },
]

const SOCIAL_LINKS: SocialLink[] = [
  { icon: 'fa-facebook-f', href: '#', label: 'Facebook' },
  { icon: 'fa-instagram',  href: '#', label: 'Instagram' },
  { icon: 'fa-x-twitter',  href: '#', label: 'X / Twitter' },
  { icon: 'fa-youtube',    href: '#', label: 'YouTube' },
  { icon: 'fa-linkedin-in',href: '#', label: 'LinkedIn' },
]

// ── Sub-components ───────────────────────────────────────────

function ReviewCard({ text, author, bg }: { text: string; author: string; bg: string }) {
  return (
    <div
      className="flex flex-col justify-between gap-[var(--xxl)] p-[var(--xxl)] rounded-[var(--radius-xl)] min-h-[280px]"
      style={{ background: bg }}
    >
      <div className="flex flex-col gap-[var(--m)]">
        {/* Stars */}
        <div className="flex gap-[var(--xxs)]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon key={i} name="fa-star" size="sm" weight="solid" className="text-[#fbbc04]" />
          ))}
        </div>
        <Typography variant="textLg" color="white" className="leading-[1.4]">
          {text}
        </Typography>
      </div>
      <Typography variant="textM" color="white">
        {author}
      </Typography>
    </div>
  )
}

// ── Props ────────────────────────────────────────────────────

interface Step1Props {
  loanAmount: number // EUR
  leasingType: 'financial' | 'operational'
  consent: boolean
  onLoanChange: (v: number) => void
  onLeasingTypeChange: (t: 'financial' | 'operational') => void
  onConsentChange: (v: boolean) => void
  onContinue: () => void
}

// ── Component ────────────────────────────────────────────────

export function Step1Landing({
  loanAmount,
  leasingType,
  consent,
  onLoanChange,
  onLeasingTypeChange,
  onConsentChange,
  onContinue,
}: Step1Props) {

  const reviewSlides: CarouselSlide[] = [
    {
      id: 'review-1',
      content: (
        <ReviewCard
          bg="var(--primary-700)"
          author="Любослав Дунчев"
          text="Препоръчвам с две ръце! Вече за втори път използвам услугите на Тръсти.Бг и честно казано съм повече от доволен! За 5 минути ми направиха застраховка и получих полицата на електронната поща."
        />
      ),
    },
    {
      id: 'review-2',
      content: (
        <ReviewCard
          bg="var(--accent-600)"
          author="Elly Velkova"
          text="Единствената фирма, която успя да ми направи гражданска по телефона. Съвременни, компетентни — изключително внимателен, коректен и ангажиран да съдейства в полза на клиента. Препоръчвам!"
        />
      ),
    },
  ]

  return (
    <div className="w-full min-h-full font-sans bg-[var(--surface)]">

      {/* ── Navbar ── */}
      <header className="bg-[var(--surface-adjacent)] flex items-center justify-between px-[var(--xl)] py-[var(--m)] sticky top-0 z-10"
        style={{ boxShadow: '0 1px 0 var(--primary-200)' }}>
        <button className="bg-transparent border-none cursor-pointer p-[var(--xs)] flex" aria-label="Меню">
          <Icon name="fa-bars" size="md" />
        </button>
        <div className="flex items-center gap-[var(--s)]">
          <img src="/trusti-fav.png" alt="" style={{ height: 22, width: 'auto' }} />
          <Typography variant="h6" as="span" style={{ letterSpacing: '-0.02em' }}>trusti</Typography>
        </div>
        <button className="bg-transparent border-none cursor-pointer p-[var(--xs)] flex" aria-label="Профил">
          <Icon name="fa-user" size="md" weight="regular" />
        </button>
      </header>

      {/* ── Hero ── */}
      <div className="relative pb-[var(--8xl)]"
        style={{
          backgroundImage: 'url(/background-greenlish.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}>
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(8,28,18,0.80)' }} />

        <div className="relative z-10 px-[var(--xl)] pt-[var(--4xl)] max-w-[480px] mx-auto">

          {/* Google badge */}
          <div className="inline-flex items-center gap-[var(--s)] rounded-full px-[var(--m)] py-[var(--xs)] mb-[var(--l)]"
            style={{ background: 'rgba(255,255,255,0.10)' }}>
            <span className="font-bold text-[13px] text-[#4285F4] font-sans">G</span>
            <Icon name="fa-star" size="xs" weight="solid" className="text-[#fbbc04]" />
            <Typography variant="textSm" color="white" as="span" className="font-semibold">4.9</Typography>
            <Typography variant="caption" color="white" as="span" className="opacity-75">on Google reviews</Typography>
          </div>

          {/* Label */}
          <Typography variant="caption" color="white"
            className="uppercase tracking-[0.06em] opacity-65 mb-[var(--s)] block font-semibold">
            Авто лизинг
          </Typography>

          {/* Heading */}
          <Typography variant="h1" color="white" className="mb-[var(--s)]" style={{ letterSpacing: '-0.025em' }}>
            Мечтаният автомобил,<br />без компромиси
          </Typography>

          <Typography variant="textSm" color="white" className="opacity-80 mb-[var(--xxl)]">
            Сравнете оферти и платете по-малко
          </Typography>

          {/* Leasing type toggle */}
          <div className="inline-flex rounded-full p-[var(--xxs)]"
            style={{ background: 'rgba(255,255,255,0.12)' }}>
            {(['financial', 'operational'] as const).map(type => (
              <button
                key={type}
                onClick={() => onLeasingTypeChange(type)}
                className="rounded-full px-[var(--l)] py-[var(--s)] text-[13px] font-medium font-sans transition-all duration-200 cursor-pointer border-none"
                style={{
                  background: leasingType === type ? '#fff' : 'transparent',
                  color: leasingType === type ? 'var(--primary-900)' : 'rgba(255,255,255,0.85)',
                  whiteSpace: 'nowrap',
                }}
              >
                {type === 'financial' ? 'Финансов лизинг' : 'Обратен лизинг'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Calculator Card ── */}
      <div className="px-[var(--l)] max-w-[480px] mx-auto" style={{ marginTop: -40, position: 'relative', zIndex: 2 }}>
        <Card variant="elevated" padding="lg">
          {/* Amount display */}
          <div className="flex items-baseline justify-between mb-[var(--l)]">
            <Typography variant="textSm" color="secondary">Сума</Typography>
            <div className="flex items-baseline gap-[var(--xs)]">
              <Typography variant="h5" as="span" style={{ letterSpacing: '-0.02em' }}>
                {fmt(loanAmount)} €
              </Typography>
              <Typography variant="caption" color="muted" as="span">|</Typography>
              <Typography variant="h6" as="span" color="secondary">
                {fmt(loanAmount * EUR_TO_BGN)} лв.
              </Typography>
            </div>
          </div>

          <Slider value={loanAmount} onChange={onLoanChange} min={500} max={80000} step={500} showValue={false} />

          <div className="flex justify-between mt-[var(--s)] mb-[var(--xl)]">
            <Typography variant="caption" color="muted">0 лв. / 0 €</Typography>
            <Typography variant="caption" color="muted">
              {fmt(80000 * EUR_TO_BGN)} лв. / {fmt(80000)} €
            </Typography>
          </div>

          <div className="mb-[var(--l)]">
            <Checkbox
              checked={consent}
              onChange={onConsentChange}
              label='С натискане на "Вземете оферти" Вие се съгласявате с нашите Общи условия.'
            />
          </div>

          <Button variant="primary" size="xl" fullWidth onClick={onContinue}>
            Вземете оферти
          </Button>
        </Card>
      </div>

      {/* ── Social proof ── */}
      <div className="max-w-[480px] mx-auto px-[var(--xl)] py-[var(--4xl)] flex flex-col items-center gap-[var(--m)]">
        <div className="flex items-center gap-[var(--s)]">
          {/* Avatar stack */}
          <div className="flex">
            {['#6c8ebf', '#82b366', '#d79b00', '#ae4132'].map((color, i) => (
              <div key={i} className="w-[34px] h-[34px] rounded-full flex items-center justify-center relative"
                style={{
                  background: color,
                  border: '2px solid var(--surface-adjacent)',
                  marginLeft: i > 0 ? -10 : 0,
                  zIndex: 4 - i,
                }}>
                <Icon name="fa-user" size="xs" weight="solid" className="text-white" />
              </div>
            ))}
          </div>
          {/* Count pill */}
          <div className="bg-[var(--accent-600)] text-white rounded-full px-[var(--m)] py-[var(--xs)]">
            <Typography variant="textSm" color="white" as="span" className="font-bold" style={{ letterSpacing: '-0.01em' }}>
              10 000 +
            </Typography>
          </div>
        </div>
        <Typography variant="textSm" color="secondary" className="text-center font-medium">
          Над 10 000 доволни клиенти
        </Typography>
      </div>

      {/* ── Защо да изберете Trusti ── */}
      <section className="bg-[var(--surface-adjacent)] px-[var(--xl)] py-[var(--5xl)]">
        <div className="max-w-[440px] mx-auto flex flex-col gap-[var(--4xl)]">

          {/* Photo */}
          <div className="rounded-[var(--radius-xl)] overflow-hidden" style={{ height: 260 }}>
            <img src={MAN_PHOTO} alt="Мъж с телефон"
              className="w-full h-full object-cover block" />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-[var(--m)]">
            <Typography variant="h2">Защо да изберете Trusti</Typography>
            <Typography variant="textLg" color="secondary" className="leading-[1.4]">
              В Trusti правим избора на услуги бърз и лесен. Сравнявате оферти от водещи компании на едно място и избирате най-добрия Авто лизинг за Вас
            </Typography>
          </div>

          {/* Benefits */}
          <div className="flex flex-col gap-[var(--xxl)]">
            {[
              { icon: 'fa-list',  label: 'Лесно сравнете офертите' },
              { icon: 'fa-wifi',  label: 'Изцяло онлайн' },
              { icon: 'fa-tag',   label: 'Получете достъп до ексклузивни отстъпки' },
            ].map(item => (
              <div key={item.icon} className="flex items-center gap-[var(--xxl)]">
                <div className="w-[48px] h-[48px] rounded-full bg-[var(--surface)] flex items-center justify-center shrink-0">
                  <Icon name={item.icon} size="lg" weight="regular" className="text-[var(--accent-600)]" />
                </div>
                <Typography variant="textM" className="font-semibold leading-[1.3]">{item.label}</Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Google Reviews ── */}
      <section className="relative px-[var(--xl)] py-[var(--5xl)] overflow-hidden"
        style={{ background: 'var(--primary-900)' }}>
        {/* Texture overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `url(${BG_TEXTURE})`, backgroundSize: 'cover', opacity: 0.2 }} />

        <div className="relative max-w-[440px] mx-auto flex flex-col gap-[var(--4xl)]">

          {/* Rating + heading */}
          <div className="flex flex-col gap-[var(--l)]">
            <img src={GOOGLE_RATING_IMG} alt="Google 4.9 ★★★★★"
              style={{ height: 52, width: 'auto', objectFit: 'contain', objectPosition: 'left' }} />
            <Typography variant="h2" color="white" style={{ letterSpacing: '-0.02em' }}>
              Хиляди шофьори избраха Trusti
            </Typography>
            <Typography variant="text" className="text-[var(--primary-400)]">
              Бързо, изцяло онлайн и с рейтинг 4.9 в Google
            </Typography>
          </div>

          {/* Carousel */}
          <Carousel slides={reviewSlides} />
        </div>
      </section>

      {/* ── Само 3 стъпки ── */}
      <section className="bg-[var(--surface)] px-[var(--xl)] py-[var(--5xl)]">
        <div className="max-w-[440px] mx-auto flex flex-col gap-[var(--4xl)]">

          <Typography variant="h2" className="text-center" style={{ letterSpacing: '-0.02em' }}>
            Само 3 стъпки до Вашия лизинг за автомобил
          </Typography>

          <div className="flex flex-col gap-[var(--l)]">
            {[
              { icon: 'fa-credit-card-blank', label: 'Сравнявате оферти' },
              { icon: 'fa-list',              label: 'Въвеждате данните си' },
              { icon: 'fa-paper-plane',       label: 'Изпращате заявка' },
            ].map(step => (
              <Card key={step.icon} variant="elevated" padding="lg">
                <div className="flex flex-col items-center gap-[var(--xl)]">
                  <Icon name={step.icon} size="xl" weight="regular" className="text-[var(--accent-600)]" />
                  <div className="w-full h-px bg-[var(--primary-200)]" />
                  <Typography variant="textLg" className="text-center">{step.label}</Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Insurance promo ── */}
      <section className="relative px-[var(--xl)] py-[var(--5xl)] overflow-hidden"
        style={{ background: 'var(--primary-900)' }}>
        {/* Texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `url(${BG_TEXTURE})`, backgroundSize: 'cover', opacity: 0.4 }} />

        <div className="relative max-w-[440px] mx-auto flex flex-col items-center gap-[var(--4xl)] text-center">

          <Typography variant="h2" color="white" style={{ letterSpacing: '-0.02em' }}>
            Сключете застраховка с нашия AI брокер и запазете 20 лв. за нещо по-приятно
          </Typography>

          <Button variant="primary" size="l" leadingIcon="fa-sparkles">
            AI Брокер
          </Button>

          {/* Chat mockup */}
          <div className="w-full rounded-[var(--radius-xl)] p-[var(--4xl)] flex flex-col gap-[var(--m)]"
            style={{
              border: '3px solid var(--accent-600)',
              background: 'rgba(247,104,3,0.08)',
              boxShadow: '0 -26px 57px rgba(247,104,1,0.2), 0 -103px 103px rgba(247,104,1,0.17)',
            }}>

            <Typography variant="caption" className="text-[rgba(255,255,255,0.5)] self-start">
              Trusti AI Асистент
            </Typography>

            {/* Bot message */}
            <div className="rounded-[var(--radius-lg)] p-[var(--m)]"
              style={{ background: 'rgba(255,243,235,0.15)', border: '2px solid rgba(255,165,0,0.2)' }}>
              <Typography variant="textSm" color="white" className="text-left leading-[1.4]">
                Гражданската Ви изтича след 12 дни. Желаете ли да я подновим заедно?
              </Typography>
            </div>

            {/* User reply */}
            <div className="flex justify-end">
              <div className="rounded-[var(--radius-lg)] px-[var(--l)] py-[var(--m)]"
                style={{ background: 'rgba(247,104,3,0.2)', border: '2px solid rgba(247,104,3,0.4)' }}>
                <Typography variant="textSm" color="white">Да</Typography>
              </div>
            </div>

            {/* Typing */}
            <div className="rounded-[var(--radius-lg)] px-[var(--l)] py-[var(--m)] self-start"
              style={{ background: 'rgba(255,243,235,0.15)', border: '2px solid rgba(255,165,0,0.2)' }}>
              <Typography variant="text" className="text-[rgba(255,255,255,0.6)]">•••</Typography>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[var(--surface-adjacent)] px-[var(--xl)] py-[var(--5xl)]">
        <FAQ
          title="Имaте въпроси? Ние имаме отговори."
          items={FAQ_ITEMS}
          className="max-w-[440px]"
        />
      </section>

      {/* ── Footer ── */}
      <Footer
        logoText="trusti"
        columns={FOOTER_COLUMNS}
        socialLinks={SOCIAL_LINKS}
        legalText="© 2023 Trusti. Тръсти ЕООД е застрахователен брокер, регистриран и одобрен от КФН с удостоверение № 734-3Б от 02.02.2021 г. Всички права запазени."
      />

    </div>
  )
}
