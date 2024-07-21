import { c as createComponent, r as renderTemplate, d as renderComponent } from '../chunks/astro/server_xU0KpEGp.mjs';
import 'kleur/colors';
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, f as DialogDescription, L as Label, I as Input, g as DialogFooter, B as Button, W as WithQuery, t as toast, h as DialogTrigger, $ as $$Dashboard } from '../chunks/Dashboard_BZnJtW5m.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { T as Table, a as TableCaption, b as TableHeader, c as TableRow, d as TableHead, e as TableBody, f as TableCell } from '../chunks/table_BJTHhqr7.mjs';
import { useState, useEffect } from 'react';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { l as localTime, B as ButtonLoader } from '../chunks/ButtonLoader_-3goP-Fe.mjs';
import pdfMake from 'pdfmake/build/pdfmake.js';
import { p as pdfMakeFonts } from '../chunks/generatePdf_DQYPVC_-.mjs';
export { renderers } from '../renderers.mjs';

const EditMapel = ({ isDialogOpen, setIsDialogOpen, data, mutate }) => {
  const [mapel, setMapel] = useState();
  return /* @__PURE__ */ jsx(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { children: [
        "Edit Mapel ",
        data.mapel
      ] }),
      /* @__PURE__ */ jsx(DialogDescription, { className: "text-red-600 text-xs" })
    ] }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        autoComplete: "false",
        onSubmit: (e) => mutate.mutate({ e, id: data.id, mapel }),
        method: "post",
        children: [
          /* @__PURE__ */ jsx("div", { className: "grid gap-4 py-4", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "text-right", children: "Mata Pelajaran" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                name: "email",
                type: "text",
                className: "col-span-3",
                onChange: (e) => setMapel(e.target.value)
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", children: "Update Mapel" }) })
        ]
      }
    )
  ] }) });
};

pdfMake.fonts = pdfMakeFonts;

const generatePdf = async (data) => {
  const datas = await axios.get(`/api/mapel/all`);
  
  try {
    const documentDefinition = {
      content: [
        {
          text: "Daftar Mata Pelajaran",
          style: "header",
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "*"],
            body: [
              ["No", "Mata Pelajaran", "Created At"],
              ...datas.data.data.map(({ created_at, id, mapel }, i) => [
                  i + 1,
                  mapel,
                  String(localTime(created_at)),
                ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download("mapel.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

const MapelData = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [mapel, setMapel] = useState("");
  const [msg, setMsg] = useState("");
  const [currentData, setCurrentData] = useState({ id: 0, mapel: 0 });
  const [query, setQuery] = useState("");
  const {
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    refetch
  } = useInfiniteQuery({
    queryKey: ["mapel"],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get(
        `/api/mapel?id=${pageParam || 0}&search=${query}`
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.data.lastId,
    staleTime: 5e3,
    initialPageParam: 0
  });
  const { mutate } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      const createMapel = await axios.post("api/mapel", {
        mataPelajaran: mapel
      });
      return createMapel;
    },
    onSuccess: (data2) => {
      refetch();
      setIsDialogOpen(false);
      toast({
        title: "Berhasil",
        description: `Mata Pelajaran Berhasil Di Tambahkan`
      });
    },
    onError: (error) => {
      setMsg(error.response.data.message);
      toast({
        title: "Gagal",
        variant: "destructive",
        description: `Mata Pelajaran Gagal Di Tambahkan`
      });
    }
  });
  const deleteMapel = useMutation({
    mutationFn: async (id) => {
      const isDelete = await axios.delete(`api/mapel?id=${id}`);
      return isDelete;
    },
    onSuccess: (data2) => {
      refetch();
      toast({
        title: "Berhasil",
        description: `Mata Pelajaran Berhasil Di Hapus`
      });
    },
    onError: (error) => {
      toast({
        title: "Gagal",
        variant: "destructive",
        description: `Mata Pelajaran Gagal Di Hapus`
      });
    }
  });
  const updateMapel = useMutation({
    mutationFn: async ({ e, id, mapel: mapel2 }) => {
      e.preventDefault();
      const isUpdate = await axios.put(`api/mapel`, {
        id,
        mataPelajaran: mapel2
      });
      return isUpdate;
    },
    onSuccess: (data2) => {
      refetch();
      setIsDialogEditOpen(false);
      toast({
        title: "Berhasil",
        description: `Mata Pelajaran Berhasil Di Update`
      });
    },
    onError: (error) => {
      toast({
        title: "Gagal",
        variant: "destructive",
        description: `Mata Pelajaran Gagal Di Update`
      });
    }
  });
  let searchTimeout;
  const search = (e) => {
    const query2 = e.target.value;
    if (query2.length > 3) {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(async () => {
        setQuery(query2);
      }, 2e3);
    } else {
      setQuery("");
    }
  };
  useEffect(() => {
    refetch();
  }, [query]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(Fragment, { children: "Loading..." });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full flex justify-between items-end  border-b  p-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "search", children: "Search" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "search",
            id: "search",
            placeholder: "Search",
            onChange: search
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-end gap-2", children: [
        /* @__PURE__ */ jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [
          /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setIsDialogOpen(true), children: "Buat Mapel" }) }),
          /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [
            /* @__PURE__ */ jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsx(DialogTitle, { children: "Buat Mapel" }),
              /* @__PURE__ */ jsx(DialogDescription, { className: "text-red-600 text-xs", children: msg })
            ] }),
            /* @__PURE__ */ jsxs("form", { autoComplete: "false", onSubmit: mutate, method: "post", children: [
              /* @__PURE__ */ jsx("div", { className: "grid gap-4 py-4", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "text-right", children: "Mata Pelajaran" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "email",
                    name: "email",
                    type: "text",
                    className: "col-span-3",
                    onChange: (e) => setMapel(e.target.value)
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", children: "Tambah Mapel" }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => generatePdf(data.pages),
            disabled: !data || data.length <= 0,
            children: "Cetak"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableCaption, { children: "Daftar Mata Pelajaran" }),
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { className: "w-[100px]", children: "No" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Mapel" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Created At" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: data.pages && data.pages.flatMap((page) => page.data.data).map(({ created_at, id, mapel: mapel2 }, i) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: i + 1 }),
        /* @__PURE__ */ jsx(TableCell, { children: mapel2 }),
        /* @__PURE__ */ jsx(TableCell, { children: localTime(created_at) }),
        /* @__PURE__ */ jsxs(TableCell, { className: "flex  items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => {
                setIsDialogEditOpen(true), setCurrentData({ id, mapel: mapel2 });
              },
              children: "Edit"
            }
          ),
          /* @__PURE__ */ jsx(Button, { onClick: () => deleteMapel.mutate(id), variant: "destructive", children: "Hapus" })
        ] })
      ] }, id)) })
    ] }),
    hasNextPage && /* @__PURE__ */ jsx(
      ButtonLoader,
      {
        text: `${isFetchingNextPage ? "Loading..." : "Load More"}`,
        loading: isFetchingNextPage,
        onClick: fetchNextPage,
        disabled: isFetchingNextPage
      }
    ),
    /* @__PURE__ */ jsx(
      EditMapel,
      {
        isDialogOpen: isDialogEditOpen,
        setIsDialogOpen: setIsDialogEditOpen,
        data: currentData,
        mutate: updateMapel
      }
    )
  ] });
};
const MapelData$1 = WithQuery(MapelData);

const $$Mapel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Mata Pelajaran" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MapelData", MapelData$1, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/mapel/MapelData", "client:component-export": "default" })} ` })}`;
}, "/home/user/kuis/src/pages/mapel.astro", void 0);

const $$file = "/home/user/kuis/src/pages/mapel.astro";
const $$url = "/mapel";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Mapel,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
