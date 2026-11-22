// NXTEC · Carta en los correos (incidencia #5): renderiza los correos clave con la base común y comprueba
// que llevan la Carta (logo NXTEC arriba y en el pie, sin la marca ni el gris de Cal) y que los
// comentarios condicionales de Outlook siguen equilibrados. Con NXTEC_CARTA_OUT=<carpeta> deja además
// cada HTML en esa carpeta para mirarlo en un navegador.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import type { TFunction } from "i18next";
import { beforeAll, describe, expect, it } from "vitest";

import type { CalendarEvent, Person } from "@calcom/types/Calendar";

import renderEmail from "./renderEmail";

const es = JSON.parse(
  readFileSync(path.join(__dirname, "../../i18n/locales/es/common.json"), "utf8")
) as Record<string, string>;

// Traducción mínima con las cadenas reales de es/common.json y la interpolación {{var}} de i18next.
const t = ((key: string, vars?: Record<string, unknown>) =>
  (es[key] ?? key).replace(/\{\{\s*(\w+)\s*\}\}/g, (_m, name: string) =>
    String(vars?.[name] ?? "")
  )) as unknown as TFunction;

const organizer: Person = {
  id: 1,
  name: "Ángel",
  email: "angel@example.com",
  timeZone: "Europe/Madrid",
  language: { translate: t, locale: "es" },
};
const attendee: Person = {
  name: "Cliente de prueba",
  email: "cliente@example.com",
  timeZone: "Europe/Madrid",
  language: { translate: t, locale: "es" },
};
const calEvent = {
  type: "Reunión de 30 min",
  title: "Reunión de 30 min entre Ángel y Cliente de prueba",
  startTime: "2026-11-24T09:00:00Z",
  endTime: "2026-11-24T09:30:00Z",
  organizer,
  attendees: [attendee],
  uid: "reserva-de-prueba",
  location: "integrations:google:meet",
  additionalNotes: "",
} as unknown as CalendarEvent;

const CASOS: Array<[string, () => Promise<string>]> = [
  ["reserva-confirmada", () => renderEmail("AttendeeScheduledEmail", { calEvent, attendee })],
  ["reserva-organizador", () => renderEmail("OrganizerScheduledEmail", { calEvent, attendee: organizer })],
  ["reserva-cancelada", () => renderEmail("AttendeeCancelledEmail", { calEvent, attendee })],
  ["recordatorio-pendiente", () => renderEmail("OrganizerRequestReminderEmail", { calEvent, attendee: organizer })],
  [
    "contrasena",
    () =>
      renderEmail("ForgotPasswordEmail", {
        language: t,
        user: { name: "Cliente de prueba", email: "cliente@example.com" },
        resetLink: "https://calendar.nxtec.es/auth/forgot-password/prueba",
      }),
  ],
];

describe("Carta NXTEC", () => {
  const html: Record<string, string> = {};

  beforeAll(async () => {
    process.env.CALENDSO_ENCRYPTION_KEY ||= "0123456789abcdef0123456789abcdef";
    for (const [nombre, render] of CASOS) html[nombre] = await render();
    const out = process.env.NXTEC_CARTA_OUT;
    if (out) {
      mkdirSync(out, { recursive: true });
      for (const [nombre, contenido] of Object.entries(html)) writeFileSync(path.join(out, `${nombre}.html`), contenido);
    }
  });

  it.each(CASOS.map(([nombre]) => nombre))("%s lleva la Carta NXTEC", (nombre) => {
    const h = html[nombre];
    // Logo NXTEC arriba y en el pie, sobre placa blanca, y el pie con la web y el ©.
    expect(h.match(/\/emails\/logo\.png/g)?.length).toBe(2);
    expect(h).toContain('alt="NXTEC"');
    expect(h).toContain("https://nxtec.es");
    expect(h).toMatch(/© \d{4} NXTEC/);
    expect(h).toContain('content="light"');
    // Sin la fuente ni el gris de fondo de Cal.
    expect(h).not.toContain("Roboto");
    expect(h).not.toContain("#F3F4F6");
  });

  it.each(CASOS.map(([nombre]) => nombre))("%s tiene los comentarios de Outlook equilibrados", (nombre) => {
    const h = html[nombre];
    expect((h.match(/<!--\[if/g) ?? []).length).toBe((h.match(/<!\[endif\]-->/g) ?? []).length);
  });

  it("ningún componente ni plantilla vuelve a fijar Roboto ni el fondo gris de Cal", () => {
    const raices = ["components", "templates"].map((d) => path.join(__dirname, d));
    for (const raiz of raices) {
      for (const f of readdirSync(raiz).filter((n) => n.endsWith(".tsx"))) {
        const codigo = readFileSync(path.join(raiz, f), "utf8");
        // OrganizerPaymentRefundFailedEmail fija su propia fuente; queda fuera de la Carta (ver la PR).
        if (f === "OrganizerPaymentRefundFailedEmail.tsx") continue;
        expect(codigo, f).not.toContain("Roboto");
        expect(codigo.includes('backgroundColor: "#F3F4F6"') && raiz.endsWith("components"), f).toBe(false);
      }
    }
  });
});
