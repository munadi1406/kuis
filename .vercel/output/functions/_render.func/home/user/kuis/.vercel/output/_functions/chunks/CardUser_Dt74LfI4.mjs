import { jsxs, jsx } from 'react/jsx-runtime';
import { C as Card, d as CardContent, e as CardFooter, b as CardTitle } from './card_BT3pZO7t.mjs';

const CardUser = ({ title, value }) => {
  return /* @__PURE__ */ jsxs(Card, { className: "flex justify-center items-center flex-col p-2", children: [
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 justify-center items-center ", children: /* @__PURE__ */ jsx("h1", { className: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", children: value }) }) }),
    /* @__PURE__ */ jsx(CardFooter, { className: " p-0 m-0", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-center", children: title }) })
  ] });
};

export { CardUser as C };
