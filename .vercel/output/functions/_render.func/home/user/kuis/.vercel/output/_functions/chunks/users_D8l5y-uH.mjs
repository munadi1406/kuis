import { k as createComponent, l as renderTemplate, p as renderComponent, m as maybeRenderHead } from './astro/server_C9L6Sq8c.mjs';
import 'kleur/colors';
import { W as WithQuery, t as toast, L as Label, I as Input, D as Dialog, a as DialogTrigger, B as Button, d as DialogContent, e as DialogHeader, f as DialogTitle, g as DialogFooter, S as Select, h as SelectTrigger, i as SelectValue, j as SelectContent, k as SelectItem, $ as $$Dashboard } from './Dashboard_Bt_cIbUM.mjs';
import { createClient } from '@supabase/supabase-js';
import { jsxs, jsx } from 'react/jsx-runtime';
import { T as Table, a as TableCaption, b as TableHeader, c as TableRow, d as TableHead, e as TableBody, f as TableCell } from './table_RhVWFkcH.mjs';
import { lazy, useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { DialogDescription } from '@radix-ui/react-dialog';
import pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { C as CardUser } from './CardUser_D2JTLd9b.mjs';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePdf = (data) => {
  const documentDefinition = {
    content: [
      {
        text: 'Daftar Pengguna',
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 10],
      },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', 'auto'],
          body: [
            ['No', 'Username', 'Email', 'Role'],
            ...data.map((user, index) => [index + 1, user.username, user.email, user.role]),
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

  pdfMake.createPdf(documentDefinition).download('users.pdf');
};

const ChangePassword = lazy(() => "./ChangePassword");
createClient(
  "https://mbkrjdzimlemcuyphnla.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ia3JqZHppbWxlbWN1eXBobmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3NTA1MTgsImV4cCI6MjAyMjMyNjUxOH0.8qjpePe0w0clItrLZFEwOlppzeVigqeAZ1CzNHetxDk"
);
const UsersData = () => {
  const [datas, setdata] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogPasswordOpen, setIsDialogPasswordOpen] = useState(false);
  const [userData, setUserdata] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [editUser, setEditUser] = useState({ username: "", id: 0 });
  const handleClickEditUser = ({ username, id }) => {
    setEditUser({
      username,
      id
    });
  };
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    const name = e.target.name;
    setdata((prev) => ({
      ...prev,
      [name]: e.target.value
    }));
  };
  const tableRef = useRef();
  const mutation = useMutation({
    mutationFn: async (event) => {
      event.preventDefault();
      const regist = await axios.post(`api/auth/register`, datas);
      return regist;
    },
    onSuccess: (data) => {
      setIsDialogOpen(false);
      window.location.reload();
    },
    onError: (error) => {
      setMsg(error.response.data.message);
    }
  });
  const roleChange = useMutation({
    mutationFn: async (datas2) => {
      const changeRole = await axios.post(`api/user/role`, datas2);
      return changeRole;
    },
    onSuccess: (data) => {
      toast({
        title: "Berhasil",
        description: `Role Berhasil Di ubah`
      });
    },
    onError: (error) => {
      toast({
        title: "Gagal",
        variant: "destructive",
        description: `Role Gagal Di ubah`
      });
    }
  });
  const getUserData = async (query) => {
    try {
      const response = await axios.get(`/api/user/data?search=${query}`);
      const dataSearch = response.data.data;
      console.log({ dataSearch });
      setUserdata(dataSearch);
      return dataSearch;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  const handleSearchUsers = useMutation({
    mutationFn: async (username) => {
      const dataSearch = await getUserData(username);
      return dataSearch;
    }
  });
  let searchTimeout;
  const search = (e) => {
    const query = e.target.value;
    if (query.length > 3) {
      setIsSearch(true);
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(async () => {
        handleSearchUsers.mutate(query);
      }, 2e3);
    } else {
      setIsSearch(false);
    }
  };
  useEffect(() => {
    if (!isSearch) {
      getUserData("");
    }
  }, [isSearch]);
  return /* @__PURE__ */ jsxs("div", { className: "border rounded-md", children: [
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
          /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setIsDialogOpen(true), children: "Buat Akun" }) }),
          /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [
            /* @__PURE__ */ jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsx(DialogTitle, { children: "Buat Akun" }),
              /* @__PURE__ */ jsx(DialogDescription, { className: "text-red-600 text-xs", children: msg })
            ] }),
            /* @__PURE__ */ jsxs(
              "form",
              {
                autoComplete: "false",
                onSubmit: mutation.mutate,
                method: "post",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "text-right", children: "Email" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: "email",
                          name: "email",
                          type: "email",
                          className: "col-span-3",
                          onChange: handleChange
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "username", className: "text-right", children: "Username" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: "username",
                          name: "username",
                          className: "col-span-3",
                          onChange: handleChange
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "password", className: "text-right", children: "Password" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: "password",
                          name: "password",
                          type: "password",
                          className: "col-span-3",
                          onChange: handleChange
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(Label, { htmlFor: "confPassword", className: "text-right", children: "Konfirmasi Password" }),
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: "confPassword",
                          type: "password",
                          className: "col-span-3",
                          onChange: handleChange,
                          name: "passwordConfirm"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", children: "Buat Akun " }) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Dialog, { children: [
          /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { children: "Cetak" }) }),
          /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[900px]", children: [
            /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Cetak" }) }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { ref: tableRef, children: [
              /* @__PURE__ */ jsx("div", { className: "w-full mb-4 text-center text-xl font-semibold uppercase underline underline-offset-2", children: "Laporan Surat Masuk" }),
              /* @__PURE__ */ jsxs("table", { className: "border-collapse border border-black w-full", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { className: "border border-black py-2", children: "No" }),
                  /* @__PURE__ */ jsx("th", { className: "border border-black py-2", children: "Username" }),
                  /* @__PURE__ */ jsx("th", { className: "border border-black py-2", children: "Email" }),
                  /* @__PURE__ */ jsx("th", { className: "border border-black py-2", children: "Role" })
                ] }) }),
                /* @__PURE__ */ jsx("tbody", { children: userData && userData.map(
                  ({ email, username, role, id }, i) => role !== "admin" && /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx(
                      "td",
                      {
                        className: "border border-black text-center p-1 ",
                        children: i + 1
                      }
                    ),
                    /* @__PURE__ */ jsx("td", { className: "border border-black p-1", children: username }),
                    /* @__PURE__ */ jsx("td", { className: "border border-black p-1", children: email }),
                    /* @__PURE__ */ jsx("td", { className: "border border-black p-1", children: role })
                  ] }, i)
                ) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(Button, { className: "w-max ", onClick: () => generatePdf(userData), children: "Cetak" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableCaption, { children: "Daftar Users" }),
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "No" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Username" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Email" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Role" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: userData && userData.map(
        ({ email, username, role, id }, i) => role !== "admin" && /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: i + 1 }),
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: username }),
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: email }),
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: /* @__PURE__ */ jsxs(
            Select,
            {
              onValueChange: (e) => roleChange.mutate({ role: e, id }),
              disabled: roleChange.isPending,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Users" }) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "admin", selected: true, children: "Admin" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "users", selected: true, children: "Users" })
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => {
                setIsDialogPasswordOpen(true), handleClickEditUser({
                  username,
                  id
                });
              },
              children: "Edit"
            }
          ) })
        ] }, email)
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      ChangePassword,
      {
        isDialogOpen: isDialogPasswordOpen,
        setIsDialogOpen: setIsDialogPasswordOpen,
        data: editUser
      }
    )
  ] });
};
const UsersData$1 = WithQuery(UsersData);

const $$Users = createComponent(async ($$result, $$props, $$slots) => {
  const supabaseAD = createClient(
    "https://mbkrjdzimlemcuyphnla.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ia3JqZHppbWxlbWN1eXBobmxhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjc1MDUxOCwiZXhwIjoyMDIyMzI2NTE4fQ.DPqjt_Ym7tqK-jepWE7UJ5RCX7q9kzXddRc4HFUKKy0",
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
  const {
    data: { users }
  } = await supabaseAD.auth.admin.listUsers();
  let totalUsers = 0;
  let newUsersThisWeek = 0;
  totalUsers = users.length;
  const oneWeekAgo = /* @__PURE__ */ new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  newUsersThisWeek = users.filter((user) => {
    const createdAt = new Date(user.created_at);
    return createdAt >= oneWeekAgo;
  }).length;
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Users" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-4 gap-2"> ${renderComponent($$result2, "CardUser", CardUser, { "title": "Total User", "value": totalUsers })} ${renderComponent($$result2, "CardUser", CardUser, { "title": "Total User Baru", "value": newUsersThisWeek })} </div> <div class="py-2"> ${renderComponent($$result2, "UsersData", UsersData$1, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/user/kuis/src/components/users/UsersData", "client:component-export": "default" })} </div> ` })}`;
}, "/home/user/kuis/src/pages/users.astro", void 0);
const $$file = "/home/user/kuis/src/pages/users.astro";
const $$url = "/users";

export { $$Users as default, $$file as file, $$url as url };
