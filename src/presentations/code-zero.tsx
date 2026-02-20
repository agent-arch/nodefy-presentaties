'use client'
import SlideEngine, {
  Tag, H1, H2, H3, Subtitle, Card, CardLabel, CardValue, CardDetail,
  Grid2, Grid3, PlatformCard, StatusRow, TechRow, Quote, CompBar, StatBlock, NumBullet, NumCard,
} from '@/components/SlideEngine'

export default function CodeZeroPresentation() {
  const slides = [
    // SLIDE 1: Title
    <div key="title" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '70vh' }}>
      <Tag>Quick Scan — 20 februari 2026</Tag>
      <H1 style={{ fontSize: 44 }}>CODE-ZERO</H1>
      <Subtitle style={{ fontSize: 18, maxWidth: 480 }}>
        Een overzicht van advertentieplatformen, tracking, techstack en advertenties voor het nautische lifestyle merk CODE-ZERO B.V.
      </Subtitle>
      <Grid2>
        <Card>
          <CardLabel>Merk</CardLabel>
          <CardValue size={18}>Nautische mode</CardValue>
          <CardDetail>Opgericht 2017, Nederland</CardDetail>
        </Card>
        <Card>
          <CardLabel>Actieve markten</CardLabel>
          <CardValue size={18}>5 talen</CardValue>
          <CardDetail>NL, DE, FR, IT, EN</CardDetail>
        </Card>
      </Grid2>
      <div style={{ marginTop: 24, fontSize: 16, fontWeight: 700, color: 'var(--text)', opacity: 0.4 }}>nodefy</div>
    </div>,

    // SLIDE 2: Advertentieplatformen
    <div key="platforms">
      <Tag>01 Advertentieplatformen</Tag>
      <H2>Welke kanalen zien we?</H2>
      <Subtitle>CODE-ZERO is actief op meerdere advertentieplatformen. Hieronder een overzicht van wat we detecteren.</Subtitle>
      <Grid3>
        <PlatformCard icon="📘" name="Meta Ads" detail="Facebook, Instagram, Messenger, Threads" badge="~110 ads" badgeType="active" />
        <PlatformCard icon="🔍" name="Google Ads" detail="Search, Shopping, PMax" badge="67 ads" badgeType="active" />
        <PlatformCard icon="🪟" name="Microsoft Ads" detail="Bing Search" badge="Actief" badgeType="active" />
      </Grid3>
      <Grid3>
        <PlatformCard icon="📧" name="Klaviyo" detail="E-mail marketing" badge="Actief" badgeType="active" />
        <PlatformCard icon="🔬" name="MS Clarity" detail="Heatmaps & sessies" badge="Actief" badgeType="active" />
        <PlatformCard icon="📌" name="Pinterest" detail="—" badge="Niet gevonden" badgeType="missing" />
      </Grid3>
      <Quote>&ldquo;CODE-ZERO adverteert op 3 betaalde kanalen (Meta, Google, Microsoft) en gebruikt Klaviyo voor e-mail. Pinterest is niet gevonden — een gemiste kans voor een lifestyle merk.&rdquo;</Quote>
    </div>,

    // SLIDE 3: Tracking
    <div key="tracking">
      <Tag>02 Tracking & Data</Tag>
      <H2>Tracking score: onvoldoende</H2>
      <Grid2>
        <Card style={{ textAlign: 'center' }}>
          <CardLabel>Tracking Score</CardLabel>
          <CardValue color="red" size={56}>37</CardValue>
          <CardDetail>van 100 punten</CardDetail>
        </Card>
        <Card style={{ textAlign: 'center' }}>
          <CardLabel>Server-side tracking</CardLabel>
          <CardValue color="red" size={32}>Nee</CardValue>
          <CardDetail>Alles client-side</CardDetail>
        </Card>
      </Grid2>
      <Card>
        <H3>Key issues</H3>
        <StatusRow icon="✕" color="red" label="Geen Meta Pixel gevonden" value="Kritiek" />
        <StatusRow icon="✕" color="red" label="Geen Meta Conversions API (CAPI)" value="Kritiek" />
        <StatusRow icon="✕" color="red" label="Geen server-side GTM" value="Kritiek" />
        <StatusRow icon="!" color="amber" label="GA4 cookie lifetime: 7 dagen (ITP)" value="Risico" />
        <StatusRow icon="!" color="amber" label="Consent configuratie incompleet" value="Risico" />
      </Card>
      <div style={{ marginTop: 16 }}>
        <H3>Vergelijking concurrenten</H3>
        <CompBar label="CODE-ZERO" score={37} color="red" />
        <CompBar label="sailfactory.nl" score={39} color="amber" />
        <CompBar label="toptex.com" score={74} color="green" />
      </div>
    </div>,

    // SLIDE 4: Techstack
    <div key="techstack">
      <Tag>03 Techstack</Tag>
      <H2>Wat draait er onder de motorkap?</H2>
      <Subtitle>De technische basis van code-zero.com</Subtitle>
      <Card>
        <H3>Platform & Server</H3>
        <TechRow label="E-commerce platform" value="Shopware 6" />
        <TechRow label="Server" value="Apache" />
        <TechRow label="PHP versie" value="8.4.16" />
        <TechRow label="SSL" value="Actief ✓" />
        <TechRow label="Meertalig" value="5 talen (sw-language-id)" />
      </Card>
      <Card>
        <H3>Marketing Tools</H3>
        <TechRow label="Analytics" value="Google Analytics 4" />
        <TechRow label="E-mail marketing" value="Klaviyo" />
        <TechRow label="Heatmapping" value="Microsoft Clarity" />
        <TechRow label="Tag Manager" value="Niet gevonden" valueColor="var(--red)" />
        <TechRow label="Meta Pixel" value="Niet gevonden" valueColor="var(--red)" />
        <TechRow label="Server-side tracking" value="Niet aanwezig" valueColor="var(--red)" />
      </Card>
      <Card>
        <H3>Opvallend</H3>
        <CardDetail>Shopware 6 ondersteunt server-side tracking integraties en heeft goede GTM-compatibiliteit. De technische basis is solide — het ontbreekt aan de juiste configuratie, niet aan de mogelijkheden.</CardDetail>
      </Card>
    </div>,

    // SLIDE 5: Meta Ads
    <div key="meta-ads">
      <Tag>04 Meta Ads Analyse</Tag>
      <H2>~110 ads, weinig variatie</H2>
      <Subtitle>CODE-ZERO draait sinds juli 2024 Meta Ads op Facebook, Instagram, Messenger en Threads. In 5 talen.</Subtitle>
      <StatBlock number="110+" label="Totaal ads in de Meta Ad Library<br/>(actief + inactief)" />
      <Card>
        <H3>Meest geadverteerde producten</H3>
        <TechRow label="Jacket Waypoint" value="€170" />
        <TechRow label="Puffer Vest Monte Baldo" value="€149" />
        <TechRow label="Polo shirts (div.)" value="€70 – €90" />
        <TechRow label="Hoodies & Sweatshirts" value="€80 – €100" />
        <TechRow label="Smocktop" value="€200" />
      </Card>
      <Card>
        <H3>Campagne periodes</H3>
        <TechRow label="Jul '24 – Mrt '25" value="8 maanden doorlopend" />
        <TechRow label="Apr – Jun '25" value="Lente/zomer push" />
        <TechRow label="Sep – Okt '25" value="Herfst campagne" />
        <TechRow label="Jan – Feb '26" value="Outlet + nieuw" />
      </Card>
    </div>,

    // SLIDE 6: Ads problemen
    <div key="ads-issues">
      <Tag>04 Ads Analyse — vervolg</Tag>
      <H2>Wat valt op?</H2>
      <Card style={{ borderLeft: '3px solid var(--red)' }}>
        <H3>Uniforme copy</H3>
        <p style={{ fontSize: 15, fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: 8 }}>
          &ldquo;CODE-ZERO combines functional style with top quality – no compromises. Grab your favorite before it&apos;s gone.&rdquo;
        </p>
        <CardDetail style={{ marginTop: 12 }}>Deze tekst wordt herhaald in minstens 6 verschillende ads. Geen A/B testing op messaging zichtbaar.</CardDetail>
      </Card>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <NumBullet num={1} title="Alleen productfoto's" detail="witte achtergrond, geen lifestyle, geen UGC, nauwelijks video" />
        <NumBullet num={2} title="Geen funnel-aanpak" detail="alles is direct 'Shop Now'. Geen awareness, geen consideration fase" />
        <NumBullet num={3} title="Geen retargeting" detail="zonder Meta Pixel is dit ook niet mogelijk" />
        <NumBullet num={4} title="CTA's inconsistent" detail="Shop Now / Learn More / Watch More door elkaar" />
        <NumBullet num={5} title="Content onbenut" detail="zeilevenementen, professionele zeilers: geen van deze assets in ads" />
      </ul>
      <Card style={{ marginTop: 16 }}>
        <H3>Google Ads</H3>
        <CardDetail><strong>67 ads</strong> gevonden in Google Ads Transparency Center. Geverifieerde adverteerder. Search + Shopping actief. Inclusief Stake F1 Teamwear co-branding.</CardDetail>
      </Card>
    </div>,

    // SLIDE 7: Conclusie
    <div key="conclusie">
      <Tag>05 Conclusie</Tag>
      <H2>Sterk merk, grote digitale kansen</H2>
      <Subtitle>CODE-ZERO heeft een authentiek merkverhaal en is actief op meerdere kanalen. De digitale executie heeft ruimte voor verbetering.</Subtitle>
      <NumCard num={1} title="Tracking basis fixen" detail="Meta Pixel + CAPI installeren, server-side tracking opzetten. Dit is de eerste prioriteit — zonder tracking is optimalisatie onmogelijk." borderColor="var(--red)" />
      <NumCard num={2} title="Ads strategie herbouwen" detail="Funnel-aanpak (awareness → consideration → conversion), creatieve variatie met lifestyle content en zeilevenementen, retargeting opzetten." borderColor="var(--amber)" />
      <NumCard num={3} title="Content & storytelling benutten" detail="Zeilevenementen, professionele zeilers, F1 partnerships — dit zijn unieke assets die nu niet in de marketing zitten. Enorm onbenut potentieel." borderColor="var(--green)" />
      <Quote>&ldquo;De technische basis (Shopware 6) is solide. Het merk is authentiek. De kanalen zijn er. Wat ontbreekt is de juiste configuratie en strategie om alles samen te laten werken.&rdquo;</Quote>
    </div>,

    // SLIDE 8: Concurrenten
    <div key="competitors">
      <Tag>06 Concurrentie</Tag>
      <H2>Waar staat CODE-ZERO in de markt?</H2>
      <Subtitle>7 concurrenten geanalyseerd in de nautische lifestyle & sailing fashion markt.</Subtitle>

      <Card>
        <H3>Vergelijkingsmatrix</H3>
        <div style={{ overflowX: 'auto', margin: '8px -8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '8px 6px', color: 'var(--text-muted)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Merk</th>
                <th style={{ textAlign: 'center', padding: '8px 4px', color: 'var(--text-muted)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase' }}>Lifestyle</th>
                <th style={{ textAlign: 'center', padding: '8px 4px', color: 'var(--text-muted)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase' }}>Prijs</th>
                <th style={{ textAlign: 'center', padding: '8px 4px', color: 'var(--text-muted)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase' }}>Digital</th>
                <th style={{ textAlign: 'center', padding: '8px 4px', color: 'var(--text-muted)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase' }}>NL/DE</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'CODE-ZERO', lifestyle: '⭐⭐⭐⭐⭐', price: '€70-140', digital: '⭐⭐⭐', nlde: '⭐⭐⭐⭐', highlight: true },
                { name: 'North Sails', lifestyle: '⭐⭐⭐⭐', price: '€80-250', digital: '⭐⭐⭐⭐⭐', nlde: '⭐⭐⭐' },
                { name: 'Helly Hansen', lifestyle: '⭐⭐⭐', price: '€60-200', digital: '⭐⭐⭐⭐', nlde: '⭐⭐⭐⭐' },
                { name: 'Henri Lloyd', lifestyle: '⭐⭐⭐⭐', price: '€50-200', digital: '⭐⭐⭐', nlde: '⭐⭐' },
                { name: 'Musto', lifestyle: '⭐⭐', price: '€80-300', digital: '⭐⭐⭐', nlde: '⭐⭐' },
                { name: 'Gaastra/NZA', lifestyle: '⭐⭐⭐⭐', price: '€50-150', digital: '⭐', nlde: '⭐⭐⭐⭐' },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: r.highlight ? 'var(--red)08' : 'transparent' }}>
                  <td style={{ padding: '10px 6px', fontWeight: r.highlight ? 700 : 500, color: r.highlight ? 'var(--red)' : 'var(--text)' }}>{r.name}</td>
                  <td style={{ textAlign: 'center', padding: '10px 4px', fontSize: 11 }}>{r.lifestyle}</td>
                  <td style={{ textAlign: 'center', padding: '10px 4px', fontSize: 11, color: 'var(--text-secondary)' }}>{r.price}</td>
                  <td style={{ textAlign: 'center', padding: '10px 4px', fontSize: 11 }}>{r.digital}</td>
                  <td style={{ textAlign: 'center', padding: '10px 4px', fontSize: 11 }}>{r.nlde}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card style={{ borderLeft: '3px solid var(--green)' }}>
        <H3>🎯 Grootste kans: Gaastra/NZA vacuüm</H3>
        <CardDetail>Gaastra/NZA is een stervend merk zonder digitale strategie. Hun doelgroep (NL/DE, 35+, nautisch lifestyle) is wees. CODE-ZERO kan deze klanten opvangen met gerichte Meta/Google campagnes.</CardDetail>
      </Card>

      <Card style={{ borderLeft: '3px solid var(--amber)' }}>
        <H3>⚠️ Grootste concurrent: North Sails</H3>
        <CardDetail>600K+ Instagram followers, SailGP sponsoring, flagship stores. Maar: premium pricing (€150+). CODE-ZERO zit in het sweet spot daaronder (€70-140).</CardDetail>
      </Card>

      <Quote>&ldquo;CODE-ZERO opereert in een unieke sweet spot: lifestyle sailing fashion die betaalbaar, stijlvol en authentiek is. De meeste concurrenten zijn óf te technisch, óf te groot en verwaterd, óf stervend.&rdquo;</Quote>
    </div>,

    // SLIDE 9: Closing
    <div key="closing" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
      <Tag>Quick Scan</Tag>
      <H1 style={{ fontSize: 36 }}>Vragen?</H1>
      <Subtitle style={{ maxWidth: 400, margin: '16px auto 40px' }}>Wij denken graag mee over de volgende stappen voor CODE-ZERO.</Subtitle>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--navy)', letterSpacing: -0.5 }}>nodefy</div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>AI-Infused Digital Marketing</div>
      <div style={{ marginTop: 20, fontSize: 14, color: 'var(--text-secondary)' }}>ruben@nodefy.nl</div>
    </div>,
  ]

  return (
    <SlideEngine
      title="CODE-ZERO Quick Scan"
      client="CODE-ZERO B.V."
      date="2026-02-20"
      type="Quick Scan"
      slides={slides}
    />
  )
}
