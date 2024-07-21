import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_xU0KpEGp.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { C as Card, d as CardContent, e as CardFooter, b as CardTitle } from '../chunks/card_BT3pZO7t.mjs';
import { L as Label, I as Input, B as Button, $ as $$Dashboard } from '../chunks/Dashboard_BZnJtW5m.mjs';
import { T as Table, a as TableCaption, b as TableHeader, c as TableRow, d as TableHead, e as TableBody, f as TableCell, g as TableFooter } from '../chunks/table_BJTHhqr7.mjs';
export { renderers } from '../renderers.mjs';

const CardLog = ({ title, value }) => {
  return /* @__PURE__ */ jsxs(Card, { className: "flex justify-center items-center flex-col p-2", children: [
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 justify-center items-center ", children: /* @__PURE__ */ jsx("h1", { className: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", children: value }) }) }),
    /* @__PURE__ */ jsx(CardFooter, { className: " p-0 m-0", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-center", children: title }) })
  ] });
};

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card"
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal"
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer"
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card"
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal"
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer"
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card"
  }
];
const LogData = () => {
  return /* @__PURE__ */ jsxs("div", { className: "w-full border rounded-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full flex justify-between items-end  border-b  p-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "search", children: "Search" }),
        /* @__PURE__ */ jsx(Input, { type: "search", id: "search", placeholder: "Search" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-end justify-end", children: /* @__PURE__ */ jsx(Button, { className: "w-max h-[40px]", children: "Cetak" }) })
    ] }),
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableCaption, { children: "A list of your recent invoices." }),
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { className: "w-[100px]", children: "Invoice" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Method" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Amount" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: invoices.map((invoice) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: invoice.invoice }),
        /* @__PURE__ */ jsx(TableCell, { children: invoice.paymentStatus }),
        /* @__PURE__ */ jsx(TableCell, { children: invoice.paymentMethod }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: invoice.totalAmount })
      ] }, invoice.invoice)) }),
      /* @__PURE__ */ jsx(TableFooter, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { colSpan: 3, children: "Total" }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$2,500.00" })
      ] }) })
    ] })
  ] });
};

const $$Log = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Log" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-4 gap-2"> ${renderComponent($$result2, "CardLog", CardLog, { "title": "Total Aktifitas", "value": 100 })} ${renderComponent($$result2, "CardLog", CardLog, { "title": "Total Aktifitas Dalam Seminggu", "value": 100 })} ${renderComponent($$result2, "CardLog", CardLog, { "title": "Total Aktifitas Dalam Sebulan", "value": 100 })} ${renderComponent($$result2, "CardLog", CardLog, { "title": "Total Aktifitas Dalam Setahun", "value": 100 })} </div> <div class="py-2"> ${renderComponent($$result2, "LogData", LogData, {})} </div> ` })}`;
}, "/home/user/kuis/src/pages/log.astro", void 0);

const $$file = "/home/user/kuis/src/pages/log.astro";
const $$url = "/log";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Log,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
