import React from "react";
import { Phone, MapPin, ShieldCheck, Clock3, Package, Smartphone, Bike, Star, ChevronRight, CheckCircle } from "lucide-react";

// Fallback shadow Card and CardContent components that map directly to standard divs to avoid breaking ui structure
const Card = ({ className = '', children, ...props }: any) => <div className={className} {...props}>{children}</div>;
const CardContent = ({ className = '', children, ...props }: any) => <div className={className} {...props}>{children}</div>;

export const LandingPage = ({ onStartDemo }: { onStartDemo: () => void }) => {
  const phoneRaw = "1437336660";
  const phoneDisplay = "(14) 3733-6660";
  const whatsappLink = `https://wa.me/55${phoneRaw}`;
  const callLink = `tel:${phoneRaw}`;
  const mapLink = "https://www.google.com/maps/search/?api=1&query=Av.+Maj.+Rangel,+1376+-+Centro,+Avar%C3%A9+-+SP,+18705-040";
  const appLink = "#baixar-app";

  const benefits = [
    {
      icon: Clock3,
      title: "Agilidade no dia a dia",
      text: "Chegue mais rápido aos seus compromissos com um atendimento ágil e prático em Avaré.",
    },
    {
      icon: ShieldCheck,
      title: "Confiança e segurança",
      text: "Serviço profissional para quem busca mais tranquilidade em cada corrida.",
    },
    {
      icon: Smartphone,
      title: "App para chamar fácil",
      text: "Solicite sua corrida de forma moderna e simples, direto pelo celular.",
    },
    {
      icon: Package,
      title: "Pequenas entregas",
      text: "Envie documentos, objetos e pequenas encomendas com mais rapidez e praticidade.",
    },
  ];

  const services = [
    "Corridas rápidas pela cidade",
    "Transporte para trabalho, banco, consultas e compromissos",
    "Atendimento no Centro e bairros de Avaré",
    "Pequenas entregas com agilidade",
    "Solicitação prática por telefone ou app",
  ];

  const trafficHighlights = [
    "Atendimento rápido em Avaré",
    "Chame pelo app ou telefone",
    "Corridas e pequenas entregas",
    "Mais praticidade no seu dia a dia",
  ];

  return (
    <div className="min-h-screen bg-[#07110c] text-white font-sans selection:bg-[#759a75] selection:text-black">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(117,154,117,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_30%)] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur z-20 relative">
            <div className="flex items-center gap-3">
              <img src="/logo-transparent.png" alt="Logo Mototaxi Millênio" className="h-12 w-12 drop-shadow-[0_0_15px_rgba(117,154,117,0.4)]" />
              <div>
                <p className="text-lg font-semibold tracking-tight">Mototaxi <span className="text-[#759a75]">Millênio</span></p>
                <p className="text-xs text-white/65">Avaré • Corridas • Entregas</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button onClick={onStartDemo} className="text-sm font-medium text-white/70 hover:text-white transition px-4">
                Administração
              </button>
              <a href={callLink}>
                <button className="rounded-full bg-white text-[#07110c] hover:bg-gray-100 font-semibold px-4 py-2 transition-all">Ligar agora</button>
              </a>
            </div>
          </div>
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:pb-28 lg:pt-10 z-10">
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#759a75]/30 bg-[#759a75]/10 px-4 py-2 text-sm text-[#dfe8df]">
              <Star className="h-4 w-4 text-[#759a75]" />
              Mobilidade ágil e atendimento confiável em Avaré - SP
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl animate-slide-up">
              Mototáxi premium para quem precisa de <span className="text-[#759a75]">rapidez</span>,
              <span className="text-[#c7d4c7]"> praticidade</span> e confiança.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/75 sm:text-xl animate-slide-up" style={{ animationDelay: "100ms" }}>
              O <strong className="text-white">Mototaxi Millênio</strong> leva você com mais agilidade pela cidade e também realiza
              <strong className="text-[#dfe8df]"> pequenas entregas</strong> com eficiência. Peça sua corrida pelo telefone ou baixe o app.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row animate-slide-up" style={{ animationDelay: "200ms" }}>
              <a href={appLink}>
                <button className="flex items-center justify-center h-12 w-full sm:w-auto rounded-full bg-[#759a75] px-7 text-base font-semibold text-[#07110c] hover:bg-[#89ad89] transition-all">
                  Baixar o app
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </a>
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <button className="flex items-center justify-center h-12 w-full sm:w-auto rounded-full border border-white/20 bg-white/5 px-7 text-base font-medium text-white hover:bg-white/10 transition-all">
                  Chamar agora
                </button>
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 animate-slide-up" style={{ animationDelay: "300ms" }}>
              {[
                "Atendimento rápido",
                "Motoristas experientes",
                "Pequenas entregas",
                "App e telefone",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-[#0c1510]/50 p-4 text-sm font-medium text-white/80 backdrop-blur text-center flex items-center justify-center">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pl-4 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="rounded-[28px] border border-white/10 bg-[#0d1812] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-[#9fba9f] font-semibold">Mototaxi Millênio</p>
                    <p className="mt-2 text-2xl font-bold">Rápido. Seguro. Profissional.</p>
                  </div>
                  <img src="/logo-transparent.png" alt="Logo" className="h-14 w-14 drop-shadow-lg" />
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-sm font-medium text-white/60">Serviço principal</p>
                    <p className="mt-1 text-lg font-semibold">Corridas urbanas com agilidade</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-sm font-medium text-white/60">Extra</p>
                    <p className="mt-1 text-lg font-semibold">Pequenas entregas pela cidade</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-[#759a75]/12 p-4">
                      <p className="text-sm font-medium text-[#cfe0cf]">Contato</p>
                      <p className="mt-1 font-semibold lg:text-lg">{phoneDisplay}</p>
                    </div>
                    <div className="rounded-2xl bg-[#759a75]/12 p-4">
                      <p className="text-sm font-medium text-[#cfe0cf]">Local</p>
                      <p className="mt-1 font-semibold lg:text-lg">Centro de Avaré</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#759a75]/20 bg-[#759a75]/10 p-4 text-sm leading-7 text-[#e4ece4]">
                    Ideal para trabalho, compromissos, banco, consultas, deslocamentos rápidos e entregas menores com praticidade.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-10">
        <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 md:grid-cols-4">
          {trafficHighlights.map((item) => (
            <div key={item} className="rounded-2xl bg-[#0c1510] border border-white/5 p-4 text-sm font-medium text-white/75 text-center">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8fb28f]">Por que escolher</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl leading-tight">
            Um serviço pensado para facilitar sua rotina com mais velocidade e confiança.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/70">
            Quando o tempo é curto, você precisa de um atendimento ágil, prático e confiável. O Mototaxi Millênio ajuda você a se deslocar com rapidez e também resolve pequenas entregas sem complicação.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="rounded-[28px] border border-white/10 bg-white/[0.04] text-white shadow-xl shadow-black/20 hover:bg-white/[0.06] transition-colors">
              <CardContent className="p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#759a75] text-[#07110c]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-white/70">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0c1510] overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8fb28f]">Serviços</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl leading-tight">
              Corridas e pequenas entregas com atendimento rápido em Avaré.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Seja para chegar logo ao seu destino ou enviar uma pequena encomenda com praticidade, o Mototaxi Millênio oferece uma solução moderna para o dia a dia.
            </p>
            <div className="mt-8 grid gap-4">
              {services.map((service) => (
                <div key={service} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#759a75] text-[#07110c] shrink-0">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                  <p className="text-white/80 font-medium">{service}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#759a75]/18 to-white/5 p-6 shadow-2xl shadow-black/20 h-auto self-center">
            <div className="h-full rounded-[28px] border border-white/10 bg-[#07110c] p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9fba9f]">Contato Direto</p>
              <h3 className="mt-4 text-3xl font-black leading-tight">Precisa chegar rápido ou fazer uma entrega?</h3>
              <p className="mt-4 text-lg leading-8 text-white/75">
                Chame o <strong className="text-white">Mototaxi Millênio</strong>. Atendimento ágil em Avaré para corridas e pequenas entregas com praticidade no seu dia.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Atendimento rápido",
                  "Ligue ou peça pelo app",
                  "Centro e toda Avaré",
                  "Mais comodidade no dia a dia",
                ].map((bullet) => (
                  <div key={bullet} className="rounded-2xl bg-white/5 border border-white/5 px-4 py-3 text-white/80 font-medium flex gap-3 items-center">
                    <CheckCircle className="h-5 w-5 text-[#759a75]" /> {bullet}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href={callLink} className="w-full">
                  <button className="h-14 w-full rounded-full bg-[#759a75] px-6 text-base font-bold text-[#07110c] hover:bg-[#89ad89] transition-all relative overflow-hidden group">
                    <span className="relative z-10 flex items-center justify-center gap-2"><Phone size={18} /> Ligar agora</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
                </a>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="w-full">
                  <button className="h-14 w-full rounded-full border border-white/15 bg-white/5 px-6 text-base font-medium text-white hover:bg-white/10 transition-all">
                    Chamar no WhatsApp
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="baixar-app" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-8 rounded-[32px] border border-white/10 bg-gradient-to-r from-[#759a75]/16 to-white/5 p-8 lg:grid-cols-[1fr_0.8fr] lg:p-12 shadow-2xl shadow-[#759a75]/5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9fba9f]">App Mototaxi Millênio</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight leading-tight">
              Baixe o app e tenha mais praticidade.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Facilite sua rotina com uma experiência moderna. Solicite corridas com mais comodidade e tenha o Mototaxi Millênio sempre à mão, direto no seu smartphone.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="h-14 w-full sm:w-auto rounded-full bg-[#759a75] px-8 text-base font-bold text-[#07110c] hover:bg-[#89ad89] transition-all shadow-lg shadow-[#759a75]/20">
                Baixar app Android
              </button>
              <button className="h-14 w-full sm:w-auto rounded-full border-2 border-white/15 bg-transparent px-8 text-base font-bold text-white hover:bg-white/10 transition-all">
                Baixar app iPhone
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0c1510] p-6 lg:ml-auto w-full md:w-[360px]">
            <div className="rounded-[24px] bg-white/5 p-8 h-full flex flex-col justify-center border border-white/5 shadow-inner">
               <img src="/logo-transparent.png" alt="Logo Mototaxi Millênio" className="w-44 h-44 mx-auto drop-shadow-[0_20px_30px_rgba(117,154,117,0.3)] mb-6" />
               <p className="text-center font-bold text-2xl text-white">Mototaxi Millênio</p>
               <div className="mt-4 inline-flex items-center justify-center self-center rounded-full bg-white/10 px-4 py-2">
                 <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                 <p className="text-center text-white/80 font-medium text-sm">Disponível em breve</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 sm:p-10 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8fb28f]">Contato</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight">Fale com o Mototaxi Millênio</h2>
            <div className="mt-8 space-y-6 text-white/75">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-[#132219] border border-[#759a75]/30 p-4 text-[#759a75] shadow-lg"><Phone className="h-6 w-6" /></div>
                <div className="pt-1">
                  <p className="text-sm font-medium text-white/50 text-transform uppercase tracking-wider">Telefone / WhatsApp</p>
                  <p className="text-xl font-bold text-white mt-1">{phoneDisplay}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-[#132219] border border-[#759a75]/30 p-4 text-[#759a75] shadow-lg"><MapPin className="h-6 w-6" /></div>
                <div className="pt-1">
                  <p className="text-sm font-medium text-white/50 text-transform uppercase tracking-wider">Endereço</p>
                  <p className="text-xl font-bold text-white mt-1">Av. Maj. Rangel, 1376</p>
                  <p className="text-lg">Centro, Avaré - SP, 18705-040</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href={callLink} className="w-full sm:w-auto">
                <button className="h-14 w-full rounded-full bg-[#759a75] px-8 text-base font-bold text-[#07110c] hover:bg-[#89ad89] transition-all shadow-lg shadow-[#759a75]/20 hover:shadow-none translate-y-0 hover:translate-y-1">Ligar agora</button>
              </a>
              <a href={mapLink} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                <button className="h-14 w-full rounded-full border-2 border-white/10 bg-transparent px-8 text-base font-bold text-white hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2">
                  <MapPin size={18} /> Ver localização
                </button>
              </a>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-white/5 to-[#759a75]/10 p-4">
            <div className="flex h-full min-h-[320px] items-center justify-center rounded-[26px] overflow-hidden border border-white/10 bg-[#0b140f] relative group shadow-inner">
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition duration-500"></div>
              {/* Using the generated og-image as styling fallback */}
              <img src="/og-image.jpg" alt="Localização Mototaxi" className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition duration-700 opacity-40 mix-blend-screen grayscale-[50%]" />
              <div className="relative z-20 text-center flex flex-col items-center">
                 <div className="bg-[#759a75] p-5 rounded-full mb-5 shadow-2xl text-[#07110c] ring-8 ring-[#759a75]/20">
                   <MapPin size={32} />
                 </div>
                 <p className="font-extrabold text-3xl text-white drop-shadow-md">Avaré - SP</p>
                 <p className="text-white/80 font-medium mt-2 max-w-xs block mx-auto bg-black/40 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur">Atendimento em toda a cidade e região</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050d09] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center text-white/50 text-sm flex flex-col items-center gap-6">
           <div className="flex items-center gap-3 mb-2 p-3 bg-white/5 rounded-2xl border border-white/5">
              <img src="/logo-transparent.png" alt="Logo Mototaxi Millênio" className="h-9 w-9 drop-shadow-md" />
              <span className="font-bold text-white text-xl tracking-tight">Mototaxi <span className="text-[#759a75]">Millênio</span></span>
           </div>
           <p className="text-base">&copy; {new Date().getFullYear()} Mototaxi Millênio. Avaré - SP. <br className="md:hidden"/> Todos os direitos reservados.</p>
           <button onClick={onStartDemo} className="text-white/30 hover:text-white/80 hover:bg-white/5 px-6 py-3 rounded-full transition-all mt-4 text-xs font-bold tracking-widest uppercase border border-transparent hover:border-white/10">
             Área Administrativa e Gestão
           </button>
        </div>
      </footer>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#759a75] px-6 py-4 text-base font-extrabold text-[#07110c] shadow-2xl shadow-[#759a75]/40 transition-all hover:scale-105 hover:bg-[#89ad89] flex items-center gap-2"
      >
        <span>Chamar agora</span>
      </a>
    </div>
  );
};