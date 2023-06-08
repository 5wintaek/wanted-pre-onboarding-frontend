export function LoginButton({ children, ...restProps }) {
  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
}
