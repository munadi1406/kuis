import { k as createComponent, l as renderTemplate, p as renderComponent, m as maybeRenderHead } from './astro/server_C9L6Sq8c.mjs';
import 'kleur/colors';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { Fragment as Fragment$1, useState } from 'react';
import { c as cn, L as Label, I as Input, B as Button, $ as $$Dashboard } from './Dashboard_Bt_cIbUM.mjs';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";

function Form({
  soalArray,
  opsiJawabanArray,
  handleInputChange
}) {
  return /* @__PURE__ */ jsx(Fragment, { children: soalArray.map((e) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(Label, { htmlFor: `Soal-Ke-${e + 1}`, children: `Soal Ke ${e + 1}` }),
    /* @__PURE__ */ jsx(
      Textarea,
      {
        id: `Soal-Ke-${e + 1}`,
        placeholder: `Soal Ke ${e + 1}`,
        row: 3,
        name: `soal-${e}`,
        onChange: handleInputChange,
        required: true
      },
      e
    ),
    opsiJawabanArray.map((jawabanI) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "grid grid-cols-6 w-full border-l-2 border-blue-600",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "col-span-1 flex flex-col justify-center items-center", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: `jawaban${e}`,
                className: "text-xs text-blue1 text-center p-1",
                children: "Click Jika Ini Jawaban Yang Benar"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                name: `isTrue${e}`,
                id: `jawabanId${jawabanI}`,
                value: true,
                onChange: handleInputChange,
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: " col-span-5 w-full", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: `Jawaban Ke ${jawabanI + 1}`, children: `Jawaban Ke ${jawabanI + 1}` }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: `Jawaban-Ke-${jawabanI + 1}`,
                name: `jawaban${jawabanI}-${e}`,
                onChange: handleInputChange,
                required: true
              }
            )
          ] })
        ]
      },
      jawabanI
    ))
  ] }, e)) });
}

function CreateQuiz() {
  const [jumlahSoal, setJumlahSoal] = useState(1);
  const [jumlahOpsiJawaban, setJumlahOpsiJawaban] = useState(4);
  const [judul, setJudul] = useState("");
  useState("");
  const [duration, setDuration] = useState(0);
  useState("");
  useState("");
  const [isFromFile, setIsFromFile] = useState(false);
  const soalArray = Array.from({ length: jumlahSoal }, (_, index) => index);
  const opsiJawabanArray = Array.from(
    { length: jumlahOpsiJawaban },
    (_, index) => index
  );
  const [soalData, setSoalData] = useState([]);
  const handleInputChange = (event) => {
    const { name, value, id } = event.target;
    if (name.startsWith("soal")) {
      const soalIndex = parseInt(name.split("soal-")[1]);
      setSoalData((prevData) => {
        prevData[soalIndex] = { question: value, answerOption: [] };
        return [...prevData];
      });
    } else if (name.startsWith("jawaban")) {
      const soalIndex = parseInt(name.split("jawaban")[1].split("-")[1]);
      const jawabanIndex = parseInt(name.split("jawaban")[1].split("-")[0]);
      if (!soalData[soalIndex]) return;
      setSoalData((prevData) => {
        if (!prevData[soalIndex].answerOption[jawabanIndex]) {
          prevData[soalIndex].answerOption[jawabanIndex] = {
            answerOption: value,
            answerIsTrue: false
          };
        } else {
          prevData[soalIndex].answerOption[jawabanIndex].answerOption = value;
        }
        return [...prevData];
      });
    } else if (name.startsWith("isTrue")) {
      const idSoal = name.split("isTrue")[1];
      const idJawaban = id.split("jawabanId")[1];
      if (!soalData[idSoal]) return;
      soalData[idSoal].answerOption.forEach((option, index) => {
        option.answerIsTrue = index.toString() === idJawaban ? true : false;
      });
      setSoalData(soalData);
    }
  };
  const [text, setText] = useState();
  const handleChangePdf = async (e) => {
    const file = e.target.files[0];
    const textt = await readFileContents(file);
    if (textt) {
      setText(textt);
    }
    setIsFromFile(true);
  };
  const readFileContents = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContents = event.target.result;
        resolve(fileContents);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };
  return /* @__PURE__ */ jsxs("form", { className: "grid md:grid-cols-6 grid-cols-1 gap-2", autoComplete: "none", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "grid grid-cols-1 order-1   gap-2 p-2 rounded-md border col-span-4",
        autoComplete: "none",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex  justify-center items-center gap-2 w-full flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-full gap-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "namaKuis", children: "Nama Kuis" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  label: "Nama Quiz",
                  placeholder: "Masukkan Nama Quiz",
                  required: true,
                  onChange: (e) => setJudul(e.target.value),
                  id: "namaKuis"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-full gap-1.5", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "Deskripsi", children: "Deskripsi Quiz" }),
              /* @__PURE__ */ jsx(Textarea, { id: "Deskripsi" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 w-full", children: !isFromFile ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "w-full gap-1.5", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "jumlahSoal", children: "Jumlah Soal" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "jumlahSoal",
                    placeholder: "Masukkan Jumlah Soal ",
                    value: jumlahSoal,
                    onChange: (e) => setJumlahSoal(e.target.value),
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "w-full gap-1.5", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "jumlahSoal", children: "Opsi Jawaban" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "opsiJawaban",
                    placeholder: "Masukkan Jumlah Opsi Jawaban Di Setiap Soal",
                    value: jumlahOpsiJawaban,
                    onChange: (e) => setJumlahOpsiJawaban(e.target.value),
                    required: true
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx(
              Input,
              {
                label: "File Pdf",
                accept: ".txt",
                type: "file",
                onChange: handleChangePdf,
                style: "col-span-2"
              }
            ) }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex w-full" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:order-2 order-3 border p-2 rounded-md flex flex-col gap-2 md:sticky top-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full gap-1.5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "date1", children: "Tanggal Mulai" }),
        /* @__PURE__ */ jsx(Input, { type: "date", required: true, id: "date1" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full gap-1.5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "date2", children: "Tanggal Selesai" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "date",
            placeholder: "Masukkan Nama Quiz",
            required: true,
            id: "date2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full gap-1.5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "lamaPengerjaan", children: "Lama Pengerjaan" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            label: "Lama Pengerjaan Quiz",
            placeholder: "Masukkan Lama Pengerjaan Kuis Dalam Menit...",
            required: true,
            onChange: (e) => setDuration(e.target.value),
            id: "lamaPengerjaan"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full gap-1.5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "lamaPengerjaan", children: "Token Kuis" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            label: "Lama Pengerjaan Quiz",
            placeholder: "Masukkan Token Kuis...",
            required: true,
            onChange: (e) => setDuration(e.target.value),
            id: "tokenKuis"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Button, { children: "Simpan" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full md:order-3 order-2 col-span-4 flex flex-col gap-2 border p-2 rounded-md", children: /* @__PURE__ */ jsx(
      Form,
      {
        opsiJawabanArray,
        handleInputChange,
        soalArray
      }
    ) })
  ] });
}

const $$CreateKuis = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "title": "Buat Kuis" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div> ${renderComponent($$result2, "CreateQuiz", CreateQuiz, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/quiz/CreateQuiz", "client:component-export": "default" })} </div> ` })}`;
}, "/home/user/kuis/src/pages/createKuis.astro", void 0);

const $$file = "/home/user/kuis/src/pages/createKuis.astro";
const $$url = "/createKuis";

export { $$CreateKuis as default, $$file as file, $$url as url };
