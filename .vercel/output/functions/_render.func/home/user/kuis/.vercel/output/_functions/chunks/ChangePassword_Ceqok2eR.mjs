import { jsx, jsxs } from 'react/jsx-runtime';
import { u as useToast, D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, f as DialogDescription, L as Label, I as Input, g as DialogFooter, B as Button } from './Dashboard_BZnJtW5m.mjs';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const ChangePassword = ({ isDialogOpen, setIsDialogOpen, data }) => {
  const [datas, setdata] = useState({});
  const [msg, setMsg] = useState();
  const { toast } = useToast();
  const handleChange = (e) => {
    const name = e.target.name;
    setdata((prev) => ({
      ...prev,
      [name]: e.target.value
    }));
  };
  const { mutate } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      const changePassword = axios.post("api/user/password-ad", {
        ...datas,
        id: data.id
      });
      return changePassword;
    },
    onSuccess: () => {
      setIsDialogOpen(false);
      toast({
        title: "Berhasil",
        description: `Password Untuk ${data.username} Berhasil Di Ganti`
      });
    },
    onError: (error) => {
      setMsg(error.response.data.message);
    }
  });
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { children: [
        "Ganti Password ",
        data.username
      ] }),
      /* @__PURE__ */ jsx(DialogDescription, { className: "text-red-600 text-xs", children: msg })
    ] }),
    /* @__PURE__ */ jsxs("form", { autoComplete: "false", onSubmit: mutate, method: "post", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", className: "text-right", children: "Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              name: "password",
              type: "password",
              className: "col-span-3",
              onChange: handleChange,
              required: true
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
              name: "confirmPassword",
              required: true
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", children: "Simpan" }) })
    ] })
  ] }) }) });
};

export { ChangePassword as default };
