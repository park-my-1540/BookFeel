import clsx from "clsx";
import React from "react";

type TextProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Title1 = ({ children, className }: TextProps) => (
  <h1 className={clsx("text-2xl font-mangoBold text-textPrimary", className)}>
    {children}
  </h1>
);

export const Title2 = ({ children, className }: TextProps) => (
  <h2
    className={clsx("text-titleLg font-mangoBold text-textPrimary", className)}
  >
    {children}
  </h2>
);

export const Title3 = ({ children, className }: TextProps) => (
  <h3 className={clsx("text-lg font-mangoBold text-textPrimary", className)}>
    {children}
  </h3>
);
export const Title4 = ({ children, className }: TextProps) => (
  <h4 className={clsx("text-xl font-mangoBold text-textPrimary", className)}>
    {children}
  </h4>
);

export const Body1 = ({ children, className }: TextProps) => (
  <p className={clsx("text-md font-medium text-textPrimary", className)}>
    {children}
  </p>
);

export const Body2 = ({ children, className }: TextProps) => (
  <p className={clsx("text-sm font-medium text-textPrimary", className)}>
    {children}
  </p>
);

export const Body2Bold = ({ children, className }: TextProps) => (
  <p className={clsx("text-sm font-bold text-textPrimary", className)}>
    {children}
  </p>
);

export const Caption = ({ children, className }: TextProps) => (
  <p className={clsx("text-base text-textSubtitle", className)}>{children}</p>
);

export const Small = ({ children, className }: TextProps) => (
  <p className={clsx("text-sm text-textSecondary", className)}>{children}</p>
);

export const Heading1 = ({ children, className }: TextProps) => (
  <h1 className={clsx("text-2xl font-MontBold text-textPrimary", className)}>
    {children}
  </h1>
);
export const Heading2 = ({ children, className }: TextProps) => (
  <h2
    className={clsx(
      "text-4xl font-MontBold text-textPrimary pt-md py-sm",
      className
    )}
  >
    {children}
  </h2>
);
export const HeadingXL = ({ children, className }: TextProps) => (
  <h2 className={clsx("text-4xl font-MontBold", className)}>{children}</h2>
);
