export const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-headline-s text-on-surface mt-10 mb-2.5 first:mt-0" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-title-l text-on-surface mt-7 mb-2" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-body-l text-on-surface-variant max-w-[680px] mb-0" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="text-body-l text-on-surface-variant max-w-[680px] pl-5 flex flex-col gap-1.5" {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="text-on-surface font-semibold" {...props} />,
};
