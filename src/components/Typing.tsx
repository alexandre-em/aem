export const TitleH1 = ({ ...props }) => (
  <h1 className="text-3xl font-black mt-2 mb-2 text-foreground" {...props}>
    {props.children}
  </h1>
);
export const TitleH2 = ({ ...props }) => (
  <h2 className="text-2xl font-extrabold mt-1 mb-2 text-foreground" {...props}>
    {props.children}
  </h2>
);
export const TitleH3 = ({ ...props }) => (
  <h3 className="text-xl font-bold mb-2 text-foreground" {...props}>
    {props.children}
  </h3>
);
export const TitleH4 = ({ ...props }) => (
  <h4 className="text-lg font-semibold mb-1 text-foreground" {...props}>
    {props.children}
  </h4>
);

export const Bold = ({ ...props }) => (
  <b className="font-bold mb-1 text-foreground" {...props}>
    {props.children}
  </b>
);

export const Link = ({ ...props }) => (
  <a className="text-muted-foreground" {...props}>
    {props.children}
  </a>
);
