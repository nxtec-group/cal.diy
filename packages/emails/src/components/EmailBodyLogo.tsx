import { NxtecLogoPlate } from "./EmailHeaderLogo";
import RawHtml from "./RawHtml";
import Row from "./Row";

const FONT = "Poppins, Helvetica, Arial, sans-serif";

const CommentIE = ({ html = "" }) => <RawHtml html={`<!--[if mso | IE]>${html}<![endif]-->`} />;

const EmailBodyLogo = () => {
  return (
    <>
      <CommentIE
        html={`</td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"></td>`}
      />
      <div style={{ margin: "0px auto", maxWidth: 600 }}>
        <Row align="center" border="0" style={{ width: "100%" }}>
          <td
            style={{
              direction: "ltr",
              fontSize: "0px",
              padding: "0px",
              textAlign: "center",
            }}>
            <CommentIE
              html={`<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;" >`}
            />
            <div
              className="mj-column-per-100 mj-outlook-group-fix"
              style={{
                fontSize: "0px",
                textAlign: "left",
                direction: "ltr",
                display: "inline-block",
                verticalAlign: "top",
                width: "100%",
              }}>
              {/* NXTEC · Carta: pie con filete, logo y lema a la izquierda, la web a la derecha y el © debajo. */}
              <Row border="0" style={{ verticalAlign: "top" }} width="100%">
                <td style={{ padding: "32px 25px 0", wordBreak: "break-word" }}>
                  <table
                    role="presentation"
                    cellPadding="0"
                    cellSpacing="0"
                    border={0}
                    width="100%"
                    style={{ width: "100%", borderTop: "1px solid #E5E7EB" }}>
                    <tbody>
                      <tr>
                        <td align="left" valign="middle" style={{ padding: "24px 0 0", textAlign: "left" }}>
                          <NxtecLogoPlate width={88} height={18} />
                          <p
                            style={{
                              margin: "8px 0 0 8px",
                              fontFamily: FONT,
                              fontSize: "12px",
                              lineHeight: "18px",
                              color: "#6B7280",
                            }}>
                            Tech Solutions
                          </p>
                        </td>
                        <td align="right" valign="middle" style={{ padding: "24px 0 0", textAlign: "right" }}>
                          <a
                            href="https://nxtec.es"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              fontFamily: FONT,
                              fontSize: "13px",
                              lineHeight: "20px",
                              color: "#3E3E3E",
                              textDecoration: "none",
                            }}>
                            nxtec.es
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} align="center" style={{ padding: "20px 0 8px", textAlign: "center" }}>
                          <p
                            style={{
                              margin: 0,
                              fontFamily: FONT,
                              fontSize: "12px",
                              lineHeight: "18px",
                              color: "#6B7280",
                            }}>
                            © {new Date().getFullYear()} NXTEC
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </Row>
            </div>
            <CommentIE html="</td></tr></table>" />
          </td>
        </Row>
      </div>
    </>
  );
};

export default EmailBodyLogo;
