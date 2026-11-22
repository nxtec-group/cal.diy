// NXTEC: quien reserva sin sesión ve Cal.com en español aunque su navegador pida otro idioma; un usuario con sesión
// conserva el de su perfil (incidencia #7).
import { beforeEach, describe, expect, it, vi } from "vitest";

const getToken = vi.fn();
const getServerSession = vi.fn();

vi.mock("next-auth/jwt", () => ({ getToken: (...args: unknown[]) => getToken(...args) }));
vi.mock("@calcom/features/auth/lib/getServerSession", () => ({
  getServerSession: (...args: unknown[]) => getServerSession(...args),
}));

import { getLocale } from "./getLocale";
import { getLocaleFromRequest } from "./getLocaleFromRequest";

const enIngles = { headers: { "accept-language": "en-US,en;q=0.9" }, cookies: {} };

describe("idioma de Cal.com en NXTEC", () => {
  beforeEach(() => {
    getToken.mockReset();
    getServerSession.mockReset();
  });

  it("getLocale: sin sesión y con el navegador en inglés, español", async () => {
    getToken.mockResolvedValue(null);
    // biome-ignore lint/suspicious/noExplicitAny: petición mínima de prueba
    expect(await getLocale(enIngles as any)).toBe("es");
  });

  it("getLocale: con sesión, el idioma del perfil", async () => {
    getToken.mockResolvedValue({ locale: "en" });
    // biome-ignore lint/suspicious/noExplicitAny: petición mínima de prueba
    expect(await getLocale(enIngles as any)).toBe("en");
  });

  it("getLocaleFromRequest: sin sesión y con el navegador en inglés, español", async () => {
    getServerSession.mockResolvedValue(null);
    // biome-ignore lint/suspicious/noExplicitAny: petición mínima de prueba
    expect(await getLocaleFromRequest(enIngles as any)).toBe("es");
  });

  it("getLocaleFromRequest: con sesión, el idioma del perfil", async () => {
    getServerSession.mockResolvedValue({ user: { locale: "fr" } });
    // biome-ignore lint/suspicious/noExplicitAny: petición mínima de prueba
    expect(await getLocaleFromRequest(enIngles as any)).toBe("fr");
  });
});
