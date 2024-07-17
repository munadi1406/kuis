import{j as r}from"./jsx-runtime.DkxT02oa.js";import{r as o}from"./index.Sh_9MLoG.js";import{c as pt,a as R,e as U,f as ft,u as mt,h as ht,d as Te,i as vt,j as gt,g as xt,b as St}from"./react-icons.esm.DgAINpKU.js";import{r as Pe}from"./index.Dkg-imUb.js";import{c as wt}from"./index.BS5cWfOu.js";import{u as L,P as M,S as yt,c as K}from"./index.Bsn2zIA8.js";import{u as Ct}from"./index.DUCypt55.js";import{c as Re,A as It,h as bt,a as Tt,R as Nt,F as Pt,C as Rt,u as Ie,b as Et,d as _t}from"./Combination.CR1p2_UD.js";import{u as jt}from"./index.ThfHD4X9.js";import{V as Mt}from"./index.DtHWw_Mn.js";function Ne(t,[n,e]){return Math.min(e,Math.max(n,t))}var At=[" ","Enter","ArrowUp","ArrowDown"],Ot=[" ","Enter"],se="Select",[ie,de,Dt]=wt(se),[te,yo]=pt(se,[Dt,Re]),ue=Re(),[Lt,$]=te(se),[kt,Vt]=te(se),Ee=t=>{const{__scopeSelect:n,children:e,open:a,defaultOpen:s,onOpenChange:d,value:l,defaultValue:c,onValueChange:i,dir:p,name:g,autoComplete:S,disabled:N,required:I}=t,f=ue(n),[h,w]=o.useState(null),[m,v]=o.useState(null),[C,B]=o.useState(!1),A=Ct(p),[oe=!1,E]=Te({prop:a,defaultProp:s,onChange:d}),[j,G]=Te({prop:l,defaultProp:c,onChange:i}),J=o.useRef(null),Y=h?!!h.closest("form"):!0,[O,H]=o.useState(new Set),F=Array.from(O).map(P=>P.props.value).join(";");return r.jsx(_t,{...f,children:r.jsxs(Lt,{required:I,scope:n,trigger:h,onTriggerChange:w,valueNode:m,onValueNodeChange:v,valueNodeHasChildren:C,onValueNodeHasChildrenChange:B,contentId:Ie(),value:j,onValueChange:G,open:oe,onOpenChange:E,dir:A,triggerPointerDownPosRef:J,disabled:N,children:[r.jsx(ie.Provider,{scope:n,children:r.jsx(kt,{scope:t.__scopeSelect,onNativeOptionAdd:o.useCallback(P=>{H(D=>new Set(D).add(P))},[]),onNativeOptionRemove:o.useCallback(P=>{H(D=>{const k=new Set(D);return k.delete(P),k})},[]),children:e})}),Y?r.jsxs(et,{"aria-hidden":!0,required:I,tabIndex:-1,name:g,autoComplete:S,value:j,onChange:P=>G(P.target.value),disabled:N,children:[j===void 0?r.jsx("option",{value:""}):null,Array.from(O)]},F):null]})})};Ee.displayName=se;var _e="SelectTrigger",je=o.forwardRef((t,n)=>{const{__scopeSelect:e,disabled:a=!1,...s}=t,d=ue(e),l=$(_e,e),c=l.disabled||a,i=L(n,l.onTriggerChange),p=de(e),[g,S,N]=tt(f=>{const h=p().filter(v=>!v.disabled),w=h.find(v=>v.value===l.value),m=ot(h,f,w);m!==void 0&&l.onValueChange(m.value)}),I=()=>{c||(l.onOpenChange(!0),N())};return r.jsx(It,{asChild:!0,...d,children:r.jsx(M.button,{type:"button",role:"combobox","aria-controls":l.contentId,"aria-expanded":l.open,"aria-required":l.required,"aria-autocomplete":"none",dir:l.dir,"data-state":l.open?"open":"closed",disabled:c,"data-disabled":c?"":void 0,"data-placeholder":Qe(l.value)?"":void 0,...s,ref:i,onClick:R(s.onClick,f=>{f.currentTarget.focus()}),onPointerDown:R(s.onPointerDown,f=>{const h=f.target;h.hasPointerCapture(f.pointerId)&&h.releasePointerCapture(f.pointerId),f.button===0&&f.ctrlKey===!1&&(I(),l.triggerPointerDownPosRef.current={x:Math.round(f.pageX),y:Math.round(f.pageY)},f.preventDefault())}),onKeyDown:R(s.onKeyDown,f=>{const h=g.current!=="";!(f.ctrlKey||f.altKey||f.metaKey)&&f.key.length===1&&S(f.key),!(h&&f.key===" ")&&At.includes(f.key)&&(I(),f.preventDefault())})})})});je.displayName=_e;var Me="SelectValue",Ae=o.forwardRef((t,n)=>{const{__scopeSelect:e,className:a,style:s,children:d,placeholder:l="",...c}=t,i=$(Me,e),{onValueNodeHasChildrenChange:p}=i,g=d!==void 0,S=L(n,i.onValueNodeChange);return U(()=>{p(g)},[p,g]),r.jsx(M.span,{...c,ref:S,style:{pointerEvents:"none"},children:Qe(i.value)?r.jsx(r.Fragment,{children:l}):d})});Ae.displayName=Me;var Bt="SelectIcon",Oe=o.forwardRef((t,n)=>{const{__scopeSelect:e,children:a,...s}=t;return r.jsx(M.span,{"aria-hidden":!0,...s,ref:n,children:a||"▼"})});Oe.displayName=Bt;var Ht="SelectPortal",De=t=>r.jsx(ht,{asChild:!0,...t});De.displayName=Ht;var Z="SelectContent",Le=o.forwardRef((t,n)=>{const e=$(Z,t.__scopeSelect),[a,s]=o.useState();if(U(()=>{s(new DocumentFragment)},[]),!e.open){const d=a;return d?Pe.createPortal(r.jsx(ke,{scope:t.__scopeSelect,children:r.jsx(ie.Slot,{scope:t.__scopeSelect,children:r.jsx("div",{children:t.children})})}),d):null}return r.jsx(Ve,{...t,ref:n})});Le.displayName=Z;var V=10,[ke,z]=te(Z),Ft="SelectContentImpl",Ve=o.forwardRef((t,n)=>{const{__scopeSelect:e,position:a="item-aligned",onCloseAutoFocus:s,onEscapeKeyDown:d,onPointerDownOutside:l,side:c,sideOffset:i,align:p,alignOffset:g,arrowPadding:S,collisionBoundary:N,collisionPadding:I,sticky:f,hideWhenDetached:h,avoidCollisions:w,...m}=t,v=$(Z,e),[C,B]=o.useState(null),[A,oe]=o.useState(null),E=L(n,u=>B(u)),[j,G]=o.useState(null),[J,Y]=o.useState(null),O=de(e),[H,F]=o.useState(!1),P=o.useRef(!1);o.useEffect(()=>{if(C)return bt(C)},[C]),Tt();const D=o.useCallback(u=>{const[b,..._]=O().map(T=>T.ref.current),[x]=_.slice(-1),y=document.activeElement;for(const T of u)if(T===y||(T?.scrollIntoView({block:"nearest"}),T===b&&A&&(A.scrollTop=0),T===x&&A&&(A.scrollTop=A.scrollHeight),T?.focus(),document.activeElement!==y))return},[O,A]),k=o.useCallback(()=>D([j,C]),[D,j,C]);o.useEffect(()=>{H&&k()},[H,k]);const{onOpenChange:Q,triggerPointerDownPosRef:W}=v;o.useEffect(()=>{if(C){let u={x:0,y:0};const b=x=>{u={x:Math.abs(Math.round(x.pageX)-(W.current?.x??0)),y:Math.abs(Math.round(x.pageY)-(W.current?.y??0))}},_=x=>{u.x<=10&&u.y<=10?x.preventDefault():C.contains(x.target)||Q(!1),document.removeEventListener("pointermove",b),W.current=null};return W.current!==null&&(document.addEventListener("pointermove",b),document.addEventListener("pointerup",_,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",b),document.removeEventListener("pointerup",_,{capture:!0})}}},[C,Q,W]),o.useEffect(()=>{const u=()=>Q(!1);return window.addEventListener("blur",u),window.addEventListener("resize",u),()=>{window.removeEventListener("blur",u),window.removeEventListener("resize",u)}},[Q]);const[pe,ae]=tt(u=>{const b=O().filter(y=>!y.disabled),_=b.find(y=>y.ref.current===document.activeElement),x=ot(b,u,_);x&&setTimeout(()=>x.ref.current.focus())}),fe=o.useCallback((u,b,_)=>{const x=!P.current&&!_;(v.value!==void 0&&v.value===b||x)&&(G(u),x&&(P.current=!0))},[v.value]),me=o.useCallback(()=>C?.focus(),[C]),ee=o.useCallback((u,b,_)=>{const x=!P.current&&!_;(v.value!==void 0&&v.value===b||x)&&Y(u)},[v.value]),le=a==="popper"?xe:Be,ne=le===xe?{side:c,sideOffset:i,align:p,alignOffset:g,arrowPadding:S,collisionBoundary:N,collisionPadding:I,sticky:f,hideWhenDetached:h,avoidCollisions:w}:{};return r.jsx(ke,{scope:e,content:C,viewport:A,onViewportChange:oe,itemRefCallback:fe,selectedItem:j,onItemLeave:me,itemTextRefCallback:ee,focusSelectedItem:k,selectedItemText:J,position:a,isPositioned:H,searchRef:pe,children:r.jsx(Nt,{as:yt,allowPinchZoom:!0,children:r.jsx(Pt,{asChild:!0,trapped:v.open,onMountAutoFocus:u=>{u.preventDefault()},onUnmountAutoFocus:R(s,u=>{v.trigger?.focus({preventScroll:!0}),u.preventDefault()}),children:r.jsx(ft,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:d,onPointerDownOutside:l,onFocusOutside:u=>u.preventDefault(),onDismiss:()=>v.onOpenChange(!1),children:r.jsx(le,{role:"listbox",id:v.contentId,"data-state":v.open?"open":"closed",dir:v.dir,onContextMenu:u=>u.preventDefault(),...m,...ne,onPlaced:()=>F(!0),ref:E,style:{display:"flex",flexDirection:"column",outline:"none",...m.style},onKeyDown:R(m.onKeyDown,u=>{const b=u.ctrlKey||u.altKey||u.metaKey;if(u.key==="Tab"&&u.preventDefault(),!b&&u.key.length===1&&ae(u.key),["ArrowUp","ArrowDown","Home","End"].includes(u.key)){let x=O().filter(y=>!y.disabled).map(y=>y.ref.current);if(["ArrowUp","End"].includes(u.key)&&(x=x.slice().reverse()),["ArrowUp","ArrowDown"].includes(u.key)){const y=u.target,T=x.indexOf(y);x=x.slice(T+1)}setTimeout(()=>D(x)),u.preventDefault()}})})})})})})});Ve.displayName=Ft;var Wt="SelectItemAlignedPosition",Be=o.forwardRef((t,n)=>{const{__scopeSelect:e,onPlaced:a,...s}=t,d=$(Z,e),l=z(Z,e),[c,i]=o.useState(null),[p,g]=o.useState(null),S=L(n,E=>g(E)),N=de(e),I=o.useRef(!1),f=o.useRef(!0),{viewport:h,selectedItem:w,selectedItemText:m,focusSelectedItem:v}=l,C=o.useCallback(()=>{if(d.trigger&&d.valueNode&&c&&p&&h&&w&&m){const E=d.trigger.getBoundingClientRect(),j=p.getBoundingClientRect(),G=d.valueNode.getBoundingClientRect(),J=m.getBoundingClientRect();if(d.dir!=="rtl"){const y=J.left-j.left,T=G.left-y,q=E.left-T,X=E.width+q,he=Math.max(X,j.width),ve=window.innerWidth-V,ge=Ne(T,[V,ve-he]);c.style.minWidth=X+"px",c.style.left=ge+"px"}else{const y=j.right-J.right,T=window.innerWidth-G.right-y,q=window.innerWidth-E.right-T,X=E.width+q,he=Math.max(X,j.width),ve=window.innerWidth-V,ge=Ne(T,[V,ve-he]);c.style.minWidth=X+"px",c.style.right=ge+"px"}const Y=N(),O=window.innerHeight-V*2,H=h.scrollHeight,F=window.getComputedStyle(p),P=parseInt(F.borderTopWidth,10),D=parseInt(F.paddingTop,10),k=parseInt(F.borderBottomWidth,10),Q=parseInt(F.paddingBottom,10),W=P+D+H+Q+k,pe=Math.min(w.offsetHeight*5,W),ae=window.getComputedStyle(h),fe=parseInt(ae.paddingTop,10),me=parseInt(ae.paddingBottom,10),ee=E.top+E.height/2-V,le=O-ee,ne=w.offsetHeight/2,u=w.offsetTop+ne,b=P+D+u,_=W-b;if(b<=ee){const y=w===Y[Y.length-1].ref.current;c.style.bottom="0px";const T=p.clientHeight-h.offsetTop-h.offsetHeight,q=Math.max(le,ne+(y?me:0)+T+k),X=b+q;c.style.height=X+"px"}else{const y=w===Y[0].ref.current;c.style.top="0px";const q=Math.max(ee,P+h.offsetTop+(y?fe:0)+ne)+_;c.style.height=q+"px",h.scrollTop=b-ee+h.offsetTop}c.style.margin=`${V}px 0`,c.style.minHeight=pe+"px",c.style.maxHeight=O+"px",a?.(),requestAnimationFrame(()=>I.current=!0)}},[N,d.trigger,d.valueNode,c,p,h,w,m,d.dir,a]);U(()=>C(),[C]);const[B,A]=o.useState();U(()=>{p&&A(window.getComputedStyle(p).zIndex)},[p]);const oe=o.useCallback(E=>{E&&f.current===!0&&(C(),v?.(),f.current=!1)},[C,v]);return r.jsx(Kt,{scope:e,contentWrapper:c,shouldExpandOnScrollRef:I,onScrollButtonChange:oe,children:r.jsx("div",{ref:i,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:B},children:r.jsx(M.div,{...s,ref:S,style:{boxSizing:"border-box",maxHeight:"100%",...s.style}})})})});Be.displayName=Wt;var Ut="SelectPopperPosition",xe=o.forwardRef((t,n)=>{const{__scopeSelect:e,align:a="start",collisionPadding:s=V,...d}=t,l=ue(e);return r.jsx(Rt,{...l,...d,ref:n,align:a,collisionPadding:s,style:{boxSizing:"border-box",...d.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}})});xe.displayName=Ut;var[Kt,be]=te(Z,{}),Se="SelectViewport",He=o.forwardRef((t,n)=>{const{__scopeSelect:e,nonce:a,...s}=t,d=z(Se,e),l=be(Se,e),c=L(n,d.onViewportChange),i=o.useRef(0);return r.jsxs(r.Fragment,{children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"},nonce:a}),r.jsx(ie.Slot,{scope:e,children:r.jsx(M.div,{"data-radix-select-viewport":"",role:"presentation",...s,ref:c,style:{position:"relative",flex:1,overflow:"auto",...s.style},onScroll:R(s.onScroll,p=>{const g=p.currentTarget,{contentWrapper:S,shouldExpandOnScrollRef:N}=l;if(N?.current&&S){const I=Math.abs(i.current-g.scrollTop);if(I>0){const f=window.innerHeight-V*2,h=parseFloat(S.style.minHeight),w=parseFloat(S.style.height),m=Math.max(h,w);if(m<f){const v=m+I,C=Math.min(f,v),B=v-C;S.style.height=C+"px",S.style.bottom==="0px"&&(g.scrollTop=B>0?B:0,S.style.justifyContent="flex-end")}}}i.current=g.scrollTop})})})]})});He.displayName=Se;var Fe="SelectGroup",[$t,zt]=te(Fe),Gt=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t,s=Ie();return r.jsx($t,{scope:e,id:s,children:r.jsx(M.div,{role:"group","aria-labelledby":s,...a,ref:n})})});Gt.displayName=Fe;var We="SelectLabel",Ue=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t,s=zt(We,e);return r.jsx(M.div,{id:s.id,...a,ref:n})});Ue.displayName=We;var ce="SelectItem",[Yt,Ke]=te(ce),$e=o.forwardRef((t,n)=>{const{__scopeSelect:e,value:a,disabled:s=!1,textValue:d,...l}=t,c=$(ce,e),i=z(ce,e),p=c.value===a,[g,S]=o.useState(d??""),[N,I]=o.useState(!1),f=L(n,m=>i.itemRefCallback?.(m,a,s)),h=Ie(),w=()=>{s||(c.onValueChange(a),c.onOpenChange(!1))};if(a==="")throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return r.jsx(Yt,{scope:e,value:a,disabled:s,textId:h,isSelected:p,onItemTextChange:o.useCallback(m=>{S(v=>v||(m?.textContent??"").trim())},[]),children:r.jsx(ie.ItemSlot,{scope:e,value:a,disabled:s,textValue:g,children:r.jsx(M.div,{role:"option","aria-labelledby":h,"data-highlighted":N?"":void 0,"aria-selected":p&&N,"data-state":p?"checked":"unchecked","aria-disabled":s||void 0,"data-disabled":s?"":void 0,tabIndex:s?void 0:-1,...l,ref:f,onFocus:R(l.onFocus,()=>I(!0)),onBlur:R(l.onBlur,()=>I(!1)),onPointerUp:R(l.onPointerUp,w),onPointerMove:R(l.onPointerMove,m=>{s?i.onItemLeave?.():m.currentTarget.focus({preventScroll:!0})}),onPointerLeave:R(l.onPointerLeave,m=>{m.currentTarget===document.activeElement&&i.onItemLeave?.()}),onKeyDown:R(l.onKeyDown,m=>{i.searchRef?.current!==""&&m.key===" "||(Ot.includes(m.key)&&w(),m.key===" "&&m.preventDefault())})})})})});$e.displayName=ce;var re="SelectItemText",ze=o.forwardRef((t,n)=>{const{__scopeSelect:e,className:a,style:s,...d}=t,l=$(re,e),c=z(re,e),i=Ke(re,e),p=Vt(re,e),[g,S]=o.useState(null),N=L(n,m=>S(m),i.onItemTextChange,m=>c.itemTextRefCallback?.(m,i.value,i.disabled)),I=g?.textContent,f=o.useMemo(()=>r.jsx("option",{value:i.value,disabled:i.disabled,children:I},i.value),[i.disabled,i.value,I]),{onNativeOptionAdd:h,onNativeOptionRemove:w}=p;return U(()=>(h(f),()=>w(f)),[h,w,f]),r.jsxs(r.Fragment,{children:[r.jsx(M.span,{id:i.textId,...d,ref:N}),i.isSelected&&l.valueNode&&!l.valueNodeHasChildren?Pe.createPortal(d.children,l.valueNode):null]})});ze.displayName=re;var Ge="SelectItemIndicator",Ye=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t;return Ke(Ge,e).isSelected?r.jsx(M.span,{"aria-hidden":!0,...a,ref:n}):null});Ye.displayName=Ge;var we="SelectScrollUpButton",qe=o.forwardRef((t,n)=>{const e=z(we,t.__scopeSelect),a=be(we,t.__scopeSelect),[s,d]=o.useState(!1),l=L(n,a.onScrollButtonChange);return U(()=>{if(e.viewport&&e.isPositioned){let c=function(){const p=i.scrollTop>0;d(p)};const i=e.viewport;return c(),i.addEventListener("scroll",c),()=>i.removeEventListener("scroll",c)}},[e.viewport,e.isPositioned]),s?r.jsx(Ze,{...t,ref:l,onAutoScroll:()=>{const{viewport:c,selectedItem:i}=e;c&&i&&(c.scrollTop=c.scrollTop-i.offsetHeight)}}):null});qe.displayName=we;var ye="SelectScrollDownButton",Xe=o.forwardRef((t,n)=>{const e=z(ye,t.__scopeSelect),a=be(ye,t.__scopeSelect),[s,d]=o.useState(!1),l=L(n,a.onScrollButtonChange);return U(()=>{if(e.viewport&&e.isPositioned){let c=function(){const p=i.scrollHeight-i.clientHeight,g=Math.ceil(i.scrollTop)<p;d(g)};const i=e.viewport;return c(),i.addEventListener("scroll",c),()=>i.removeEventListener("scroll",c)}},[e.viewport,e.isPositioned]),s?r.jsx(Ze,{...t,ref:l,onAutoScroll:()=>{const{viewport:c,selectedItem:i}=e;c&&i&&(c.scrollTop=c.scrollTop+i.offsetHeight)}}):null});Xe.displayName=ye;var Ze=o.forwardRef((t,n)=>{const{__scopeSelect:e,onAutoScroll:a,...s}=t,d=z("SelectScrollButton",e),l=o.useRef(null),c=de(e),i=o.useCallback(()=>{l.current!==null&&(window.clearInterval(l.current),l.current=null)},[]);return o.useEffect(()=>()=>i(),[i]),U(()=>{c().find(g=>g.ref.current===document.activeElement)?.ref.current?.scrollIntoView({block:"nearest"})},[c]),r.jsx(M.div,{"aria-hidden":!0,...s,ref:n,style:{flexShrink:0,...s.style},onPointerDown:R(s.onPointerDown,()=>{l.current===null&&(l.current=window.setInterval(a,50))}),onPointerMove:R(s.onPointerMove,()=>{d.onItemLeave?.(),l.current===null&&(l.current=window.setInterval(a,50))}),onPointerLeave:R(s.onPointerLeave,()=>{i()})})}),qt="SelectSeparator",Je=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t;return r.jsx(M.div,{"aria-hidden":!0,...a,ref:n})});Je.displayName=qt;var Ce="SelectArrow",Xt=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t,s=ue(e),d=$(Ce,e),l=z(Ce,e);return d.open&&l.position==="popper"?r.jsx(Et,{...s,...a,ref:n}):null});Xt.displayName=Ce;function Qe(t){return t===""||t===void 0}var et=o.forwardRef((t,n)=>{const{value:e,...a}=t,s=o.useRef(null),d=L(n,s),l=jt(e);return o.useEffect(()=>{const c=s.current,i=window.HTMLSelectElement.prototype,g=Object.getOwnPropertyDescriptor(i,"value").set;if(l!==e&&g){const S=new Event("change",{bubbles:!0});g.call(c,e),c.dispatchEvent(S)}},[l,e]),r.jsx(Mt,{asChild:!0,children:r.jsx("select",{...a,ref:d,defaultValue:e})})});et.displayName="BubbleSelect";function tt(t){const n=mt(t),e=o.useRef(""),a=o.useRef(0),s=o.useCallback(l=>{const c=e.current+l;n(c),function i(p){e.current=p,window.clearTimeout(a.current),p!==""&&(a.current=window.setTimeout(()=>i(""),1e3))}(c)},[n]),d=o.useCallback(()=>{e.current="",window.clearTimeout(a.current)},[]);return o.useEffect(()=>()=>window.clearTimeout(a.current),[]),[e,s,d]}function ot(t,n,e){const s=n.length>1&&Array.from(n).every(p=>p===n[0])?n[0]:n,d=e?t.indexOf(e):-1;let l=Zt(t,Math.max(d,0));s.length===1&&(l=l.filter(p=>p!==e));const i=l.find(p=>p.textValue.toLowerCase().startsWith(s.toLowerCase()));return i!==e?i:void 0}function Zt(t,n){return t.map((e,a)=>t[(n+a)%t.length])}var Jt=Ee,nt=je,Qt=Ae,eo=Oe,to=De,rt=Le,oo=He,st=Ue,at=$e,no=ze,ro=Ye,lt=qe,ct=Xe,it=Je;const Co=Jt,Io=Qt,so=o.forwardRef(({className:t,children:n,...e},a)=>r.jsxs(nt,{ref:a,className:K("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",t),...e,children:[n,r.jsx(eo,{asChild:!0,children:r.jsx(vt,{className:"h-4 w-4 opacity-50"})})]}));so.displayName=nt.displayName;const dt=o.forwardRef(({className:t,...n},e)=>r.jsx(lt,{ref:e,className:K("flex cursor-default items-center justify-center py-1",t),...n,children:r.jsx(gt,{})}));dt.displayName=lt.displayName;const ut=o.forwardRef(({className:t,...n},e)=>r.jsx(ct,{ref:e,className:K("flex cursor-default items-center justify-center py-1",t),...n,children:r.jsx(xt,{})}));ut.displayName=ct.displayName;const ao=o.forwardRef(({className:t,children:n,position:e="popper",...a},s)=>r.jsx(to,{children:r.jsxs(rt,{ref:s,className:K("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",t),position:e,...a,children:[r.jsx(dt,{}),r.jsx(oo,{className:K("p-1",e==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:n}),r.jsx(ut,{})]})}));ao.displayName=rt.displayName;const lo=o.forwardRef(({className:t,...n},e)=>r.jsx(st,{ref:e,className:K("px-2 py-1.5 text-sm font-semibold",t),...n}));lo.displayName=st.displayName;const co=o.forwardRef(({className:t,children:n,...e},a)=>r.jsxs(at,{ref:a,className:K("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t),...e,children:[r.jsx("span",{className:"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",children:r.jsx(ro,{children:r.jsx(St,{className:"h-4 w-4"})})}),r.jsx(no,{children:n})]}));co.displayName=at.displayName;const io=o.forwardRef(({className:t,...n},e)=>r.jsx(it,{ref:e,className:K("-mx-1 my-1 h-px bg-muted",t),...n}));io.displayName=it.displayName;export{Co as S,so as a,Io as b,ao as c,co as d};
