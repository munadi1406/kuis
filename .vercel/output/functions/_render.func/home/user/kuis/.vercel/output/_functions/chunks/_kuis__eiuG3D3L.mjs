import { k as createComponent, l as renderTemplate, p as renderComponent, o as createAstro, m as maybeRenderHead } from './astro/server_C9L6Sq8c.mjs';
import 'kleur/colors';
import { L as Label, I as Input, B as Button, $ as $$Dashboard } from './Dashboard_-s-1A4aB.mjs';
import { C as CardUser } from './CardUser_E5MrXS7V.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { T as Table, a as TableCaption, b as TableHeader, c as TableRow, d as TableHead, e as TableBody, f as TableCell, g as TableFooter } from './table_CzpXkMJU.mjs';

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
const KuisSubmittion = () => {
  return /* @__PURE__ */ jsxs("div", { className: "w-full border rounded-md ", children: [
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

const $$Astro = createAstro();
const $$kuis = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$kuis;
  const { kuis } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": kuis }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid md:grid-cols-6 grid-cols-1 gap-2"> <div class="grid grid-cols-1 order-1 gap-2 p-2 rounded-md border md:col-span-4"> <div> ${renderComponent($$result2, "CardUser", CardUser, { "title": "Jumlah Kuis Dikerjakan", "value": 100 })} </div> <div class="flex justify-center items-center gap-2 flex-wrap"> ${renderComponent($$result2, "Button", Button, {}, { "default": ($$result3) => renderTemplate`Cetak Nilai` })} ${renderComponent($$result2, "Button", Button, {}, { "default": ($$result3) => renderTemplate`Pertanyaan Paling Sering Salah` })} ${renderComponent($$result2, "Button", Button, {}, { "default": ($$result3) => renderTemplate`Analisis Kesulitan Soal` })} </div> </div> <div class="md:col-span-2 col-span-1 md:order-2  order-2 border p-2 rounded-md flex flex-col gap-2 "> <h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 flex gap-2 items-center"> ${kuis} <div class="bg-green-500 rounded-md text-xs px-2 py-1 text-white">
buka
</div> </h2> <p class="text-sm"> ${`${(/* @__PURE__ */ new Date()).toLocaleString()}-${(/* @__PURE__ */ new Date()).toLocaleString()}`} </p> <p class="leading-7 ">
Once upon a time, in a far-off land, there was a very lazy king who
        spent all day lounging on his throne. One day, his advisors came to him
        with a problem: the kingdom was running out of money.
</p> ${renderComponent($$result2, "Button", Button, {}, { "default": ($$result3) => renderTemplate`Edit Kuis` })} </div> <div class="w-full order-3 col-span-full flex flex-col gap-2 border p-2 rounded-md"> ${renderComponent($$result2, "KuisSubmittion", KuisSubmittion, {})} </div> </div> ` })}`;
}, "/home/user/kuis/src/pages/kuis/[kuis].astro", void 0);

const $$file = "/home/user/kuis/src/pages/kuis/[kuis].astro";
const $$url = "/kuis/[kuis]";

export { $$kuis as default, $$file as file, $$url as url };
