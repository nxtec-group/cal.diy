import classNames from "classnames";

import { Logo } from "@calcom/ui/components/logo";

import Loader from "@components/Loader";

interface Props {
  footerText?: React.ReactNode | string;
  showLogo?: boolean;
  heading?: string;
  loading?: boolean;
}

export default function AuthContainer(props: React.PropsWithChildren<Props>) {
  return (
    <div className="bg-default flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {props.showLogo && <Logo inline={false} className="mx-auto mb-10" />}

      <div className={classNames(props.showLogo ? "text-center" : "", "sm:mx-auto sm:w-full sm:max-w-md")}>
        {props.heading && <h2 className="font-cal text-emphasis text-center text-3xl">{props.heading}</h2>}
      </div>
      {props.loading && (
        <div className="bg-cal-muted absolute z-50 flex h-screen w-full items-center">
          <Loader />
        </div>
      )}
      <div className="mt-8 w-full sm:mx-auto sm:max-w-md">
        <div className="bg-default dark:bg-cal-muted border-subtle rounded-2xl border px-4 py-10 sm:px-10">
          {props.children}
        </div>
        <div className="text-default mt-8 text-center text-sm">{props.footerText}</div>
      </div>
    </div>
  );
}
