import NextLink, { LinkProps } from "next/link";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<LinkProps, "href"> & { href?: LinkProps["href"] };

const Button = ({ children, href, ...rest }: ButtonProps): JSX.Element => {
  if (href)
    return (
      <NextLink
        {...(rest as LinkProps)}
        href={href}
        onClick={
          rest.disabled
            ? (e) => {
                e.preventDefault();

                return false;
              }
            : rest.onClick
        }
      >
        {children}
      </NextLink>
    );

  return <button {...rest}>{children}</button>;
};

export default Button;
