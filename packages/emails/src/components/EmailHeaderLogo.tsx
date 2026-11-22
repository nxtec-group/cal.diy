import { WEBAPP_URL } from "@calcom/lib/constants";

import RawHtml from "./RawHtml";
import Row from "./Row";

// NXTEC · Carta: logo centrado arriba del correo, sobre una placa blanca para que siga viéndose cuando
// Gmail u Outlook invierten los colores en modo oscuro. El logo es el de /emails/logo.png (186x38).
export const NxtecLogoPlate = ({ width, height }: { width: number; height: number }) => (
  <a
    href={WEBAPP_URL}
    target="_blank"
    rel="noreferrer"
    style={{
      display: "inline-block",
      padding: "6px 8px",
      backgroundColor: "#FFFFFF",
      backgroundImage: "linear-gradient(#FFFFFF, #FFFFFF)",
      borderRadius: "12px",
      textDecoration: "none",
    }}>
    <img
      src={`${WEBAPP_URL}/emails/logo.png`}
      width={width}
      height={height}
      alt="NXTEC"
      style={{ display: "block", width: `${width}px`, height: `${height}px`, border: "0", outline: "none" }}
    />
  </a>
);

const EmailHeaderLogo = () => (
  <>
    <RawHtml
      html={`<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->`}
    />
    <div style={{ margin: "0px auto", maxWidth: 600 }}>
      <Row align="center" border="0" style={{ width: "100%" }}>
        <td align="center" style={{ padding: "0 25px 8px", textAlign: "center" }}>
          <NxtecLogoPlate width={118} height={24} />
        </td>
      </Row>
    </div>
    <RawHtml html="<!--[if mso | IE]></td></tr></table><![endif]-->" />
  </>
);

export default EmailHeaderLogo;
