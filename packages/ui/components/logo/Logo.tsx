import { APP_NAME, LOGO, LOGO_DARK } from "@calcom/lib/constants";
import classNames from "@calcom/ui/classNames";

// NXTEC: el logotipo claro brilla sobre fondo oscuro y no se invierte; en tema claro se usa el oscuro.
// Instalación propia sin organizaciones: los dos salen de ficheros fijos (sin el fetch de /api/logo).
export function Logo({
  small,
  icon,
  inline = true,
  className,
  src = "/api/logo",
}: {
  small?: boolean;
  icon?: boolean;
  inline?: boolean;
  className?: string;
  src?: string;
}) {
  const size = small ? "h-5 w-auto" : "h-7 w-auto";
  return (
    <h3 className={classNames("logo", inline && "inline", className)}>
      <strong>
        {icon ? (
          <img className="mx-auto w-9" alt={APP_NAME} title={APP_NAME} src={`${src}?type=icon`} />
        ) : (
          <>
            <img className={classNames(size, "hidden dark:block")} alt={APP_NAME} title={APP_NAME} src={LOGO} />
            <img className={classNames(size, "block dark:hidden")} alt={APP_NAME} title={APP_NAME} src={LOGO_DARK} />
          </>
        )}
      </strong>
    </h3>
  );
}
