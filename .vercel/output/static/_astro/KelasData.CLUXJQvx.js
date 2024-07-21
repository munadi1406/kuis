import{j as e}from"./jsx-runtime.B6Q2Q8rY.js";import{p as K,a as W,T as z,b as V,c as J,d as M,e as j,f as X,g as f}from"./generatePdf.Bzozffwp.js";import{D as P,a as S,b as w,c as B,d as E,e as F,f as Y}from"./dialog.C3FXW3zP.js";import{B as d}from"./button.4wA_-35M.js";import{r as i}from"./index.caxmlYbZ.js";import{L as b,I as v}from"./input.C4_IcoYx.js";import{u as k}from"./useMutation.CWFg6o0r.js";import{l as O,u as Z,B as _}from"./ButtonLoader.B4LbEwmK.js";import{a as m,W as ee}from"./WithQuery.DnMMxJSk.js";import{t as o}from"./use-toast.FdKHRWm9.js";import"./react-icons.esm.Bl5TofSn.js";import"./index.BT_cHE16.js";import"./Combination.bo6dpEKa.js";import"./index.UvFsUNS0.js";import"./index.CxOCE76-.js";import"./useBaseQuery.Dlinqwim.js";const ae=({isDialogOpen:h,setIsDialogOpen:r,data:t,mutate:l})=>{const[u,c]=i.useState();return e.jsx(P,{open:h,onOpenChange:r,children:e.jsxs(S,{className:"sm:max-w-[425px]",children:[e.jsxs(w,{children:[e.jsxs(B,{children:["Edit Kelas ",t.kelas]}),e.jsx(E,{className:"text-red-600 text-xs"})]}),e.jsxs("form",{autoComplete:"false",onSubmit:n=>l.mutate({e:n,id:t.id,kelas:u}),method:"post",children:[e.jsx("div",{className:"grid gap-4 py-4",children:e.jsxs("div",{children:[e.jsx(b,{htmlFor:"email",className:"text-right",children:"Kelas"}),e.jsx(v,{id:"email",name:"email",type:"text",className:"col-span-3",onChange:n=>c(n.target.value),defaultValue:t.kelas})]})}),e.jsx(F,{children:e.jsx(d,{type:"submit",children:"Update kelas"})})]})]})})};K.fonts=W;const se=async h=>{const r=await m.get("/api/kelas/all");try{const t={content:[{text:"Daftar Kelas",style:"header",alignment:"center",margin:[0,0,0,10]},{table:{headerRows:1,widths:["auto","*","*"],body:[["No","Kelas","Created At"],...r.data.data.map(({created_at:l,id:u,kelas:c},n)=>[n+1,c,String(O(l))])]}}],styles:{header:{fontSize:18,bold:!0}}};K.createPdf(t).download("mapel.pdf")}catch(t){console.error("Error generating PDF:",t)}},te=()=>{const[h,r]=i.useState(!1),[t,l]=i.useState(!1),[u,c]=i.useState(""),[n,I]=i.useState(""),[L,G]=i.useState({id:0,kelas:0}),[N,C]=i.useState(""),{isLoading:H,fetchNextPage:U,hasNextPage:$,isFetchingNextPage:D,data:p,refetch:x}=Z({queryKey:["kelas"],queryFn:async({pageParam:a})=>(await m.get(`/api/kelas?id=${a||0}&search=${N}`)).data,getNextPageParam:a=>a.data.lastId,staleTime:5e3,initialPageParam:0}),{mutate:q}=k({mutationFn:async a=>(a.preventDefault(),await m.post("api/kelas",{dataKelas:u})),onSuccess:a=>{x(),r(!1),o({title:"Berhasil",description:"Mata Pelajaran Berhasil Di Tambahkan"})},onError:a=>{I(a.response.data.message),o({title:"Gagal",variant:"destructive",description:"Mata Pelajaran Gagal Di Tambahkan"})}}),A=k({mutationFn:async a=>await m.delete(`api/kelas?id=${a}`),onSuccess:a=>{x(),o({title:"Berhasil",description:"Mata Pelajaran Berhasil Di Hapus"})},onError:a=>{o({title:"Gagal",variant:"destructive",description:"Mata Pelajaran Gagal Di Hapus"})}}),Q=k({mutationFn:async({e:a,id:s,kelas:g})=>(a.preventDefault(),await m.put("api/kelas",{id:s,dataKelas:g})),onSuccess:a=>{x(),l(!1),o({title:"Berhasil",description:"Mata Pelajaran Berhasil Di Update"})},onError:a=>{o({title:"Gagal",variant:"destructive",description:"Mata Pelajaran Gagal Di Update"})}});let y;const R=a=>{const s=a.target.value;s.length>=1?(y&&clearTimeout(y),y=setTimeout(async()=>{C(s)},2e3)):C("")};return i.useEffect(()=>{x()},[N]),H?e.jsx(e.Fragment,{children:"Loading..."}):e.jsxs("div",{children:[e.jsxs("div",{className:"w-full flex justify-between items-end  border-b  p-2",children:[e.jsxs("div",{children:[e.jsx(b,{htmlFor:"search",children:"Search"}),e.jsx(v,{type:"search",id:"search",placeholder:"Search",onChange:R})]}),e.jsxs("div",{className:"flex items-end justify-end gap-2",children:[e.jsxs(P,{open:h,onOpenChange:r,children:[e.jsx(Y,{asChild:!0,children:e.jsx(d,{variant:"outline",onClick:()=>r(!0),children:"Buat Kelas"})}),e.jsxs(S,{className:"sm:max-w-[425px]",children:[e.jsxs(w,{children:[e.jsx(B,{children:"Buat kelas"}),e.jsx(E,{className:"text-red-600 text-xs",children:n})]}),e.jsxs("form",{autoComplete:"false",onSubmit:q,method:"post",children:[e.jsx("div",{className:"grid gap-4 py-4",children:e.jsxs("div",{children:[e.jsx(b,{htmlFor:"email",className:"text-right",children:"Kelas"}),e.jsx(v,{id:"email",name:"kelas",type:"text",className:"col-span-3",onChange:a=>c(a.target.value)})]})}),e.jsx(F,{children:e.jsx(d,{type:"submit",children:"Tambah Kelas"})})]})]})]}),e.jsx(d,{onClick:()=>se(p.pages),disabled:!p||p.length<=0,children:"Cetak"})]})]}),e.jsxs(z,{children:[e.jsx(V,{children:"Daftar Kelas"}),e.jsx(J,{children:e.jsxs(M,{children:[e.jsx(j,{className:"w-[100px]",children:"No"}),e.jsx(j,{children:"Kelas"}),e.jsx(j,{children:"Created At"}),e.jsx(j,{children:"Aksi"})]})}),e.jsx(X,{children:p.pages&&p.pages.flatMap(a=>a.data.data).map(({created_at:a,id:s,kelas:g},T)=>e.jsxs(M,{children:[e.jsx(f,{className:"font-medium",children:T+1}),e.jsx(f,{children:g}),e.jsx(f,{children:O(a)}),e.jsxs(f,{className:"flex items-center gap-2 flex-wrap",children:[e.jsx(d,{onClick:()=>{l(!0),G({id:s,kelas:g})},children:"Edit"}),e.jsx(d,{onClick:()=>A.mutate(s),variant:"destructive",children:"Hapus"})]})]},s))})]}),$&&e.jsx(_,{text:`${D?"Loading...":"Load More"}`,loading:D,onClick:U,disabled:D}),e.jsx(ae,{isDialogOpen:t,setIsDialogOpen:l,data:L,mutate:Q})]})},ye=ee(te);export{ye as default};
