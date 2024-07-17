import { k as createComponent, l as renderTemplate, p as renderComponent, m as maybeRenderHead } from './astro/server_C9L6Sq8c.mjs';
import 'kleur/colors';
import { c as cn, b as buttonVariants, $ as $$Dashboard$1 } from './Dashboard_Bt_cIbUM.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card_l2R7sklx.mjs';
import * as React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { ChevronRightIcon, CheckIcon, DotFilledIcon } from '@radix-ui/react-icons';

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ContextMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRightIcon, { className: "ml-auto h-4 w-4" })
    ]
  }
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;
const ContextMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ContextMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;
const ContextMenuContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  ContextMenuPrimitive.Content,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;
const ContextMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  ContextMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;
const ContextMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  ContextMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;
const ContextMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ContextMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(DotFilledIcon, { className: "h-4 w-4 fill-current" }) }) }),
      children
    ]
  }
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;
const ContextMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  ContextMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;
const ContextMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ContextMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const Cards = ({ title, date, skor, id }) => {
  return /* @__PURE__ */ jsxs(ContextMenu, { children: [
    /* @__PURE__ */ jsx(ContextMenuTrigger, { children: /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: title }),
        /* @__PURE__ */ jsx(CardDescription, { children: date })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 justify-center items-center ", children: [
        /* @__PURE__ */ jsx("h1", { className: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", children: skor }),
        /* @__PURE__ */ jsx("div", { className: "w-full border", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: `/kuis/${id}`,
            className: buttonVariants({ className: "w-full" }),
            children: "Lihat Selengkapnya"
          }
        ) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs(ContextMenuContent, { children: [
      /* @__PURE__ */ jsx(ContextMenuItem, { children: /* @__PURE__ */ jsx("a", { href: `/kuis/${id}`, children: "Detail" }) }),
      /* @__PURE__ */ jsx(ContextMenuItem, { className: "bg-red-500 text-white", children: "Hapus" })
    ] })
  ] });
};

const $$Dashboard = createComponent(($$result, $$props, $$slots) => {
  const cardData = [
    { id: 1, title: "Card 1", date: "2024-01-01", skor: 85 },
    { id: 2, title: "Card 2", date: "2024-01-02", skor: 90 },
    { id: 3, title: "Card 3", date: "2024-01-03", skor: 75 },
    { id: 4, title: "Card 4", date: "2024-01-04", skor: 88 },
    { id: 5, title: "Card 5", date: "2024-01-05", skor: 92 },
    { id: 6, title: "Card 6", date: "2024-01-06", skor: 80 },
    { id: 7, title: "Card 7", date: "2024-01-07", skor: 85 },
    { id: 8, title: "Card 8", date: "2024-01-08", skor: 87 },
    { id: 9, title: "Card 9", date: "2024-01-09", skor: 90 },
    { id: 10, title: "Card 10", date: "2024-01-10", skor: 95 }
  ];
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$Dashboard$1, { "title": "dashboard" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2"> ${cardData.map((e) => renderTemplate`${renderComponent($$result2, "Cards", Cards, { "title": e.title, "skor": e.skor, "id": e.id, "date": e.date, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/Card", "client:component-export": "default" })}`)} </div> ` })}`;
}, "/home/user/kuis/src/pages/dashboard.astro", void 0);

const $$file = "/home/user/kuis/src/pages/dashboard.astro";
const $$url = "/dashboard";

export { $$Dashboard as default, $$file as file, $$url as url };
