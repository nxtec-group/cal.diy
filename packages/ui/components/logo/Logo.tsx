import { APP_NAME, LOGO_DARK } from "@calcom/lib/constants";
import classNames from "@calcom/ui/classNames";

// NXTEC: el logotipo claro brilla sobre fondo oscuro y no se invierte; en tema claro se usa el oscuro.
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
  const size = small ? "h-6 w-auto" : "h-8 w-auto";
  return (
    <h3 className={classNames("logo", inline && "inline", className)}>
      <strong>
        {icon ? (
          <img className="mx-auto w-9" alt={APP_NAME} title={APP_NAME} src={`${src}?type=icon`} />
        ) : (
          <>
            <img className={classNames(size, "hidden dark:block")} alt={APP_NAME} title={APP_NAME} src={src} />
            <img className={classNames(size, "dark:hidden")} alt={APP_NAME} title={APP_NAME} src={LOGO_DARK} />
          </>
        )}
      </strong>
    </h3>
  );
}
