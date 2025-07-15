import clsx from "clsx";
import React from "react";

type TextProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Title1 = ({ children, className }: TextProps) => (
  <h1 className={clsx("text-2xl font-bold text-textPrimary", className)}>
    {children}
  </h1>
);

export const Title2 = ({ children, className }: TextProps) => (
  <h2 className={clsx("text-titleLg font-bold text-textPrimary", className)}>
    {children}
  </h2>
);

export const Title3 = ({ children, className }: TextProps) => (
  <h3 className={clsx("text-lg font-bold text-textPrimary", className)}>
    {children}
  </h3>
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
  <p className={clsx("text-xs text-textSecondary", className)}>{children}</p>
);
