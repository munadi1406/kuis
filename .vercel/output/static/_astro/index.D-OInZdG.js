import{r}from"./index.caxmlYbZ.js";import{a as Re,e as j,f as et,u as le,P as T,b as h,h as tt,i as nt,S as ot,j as rt,l as st}from"./react-icons.esm.Bl5TofSn.js";import{c as _e}from"./index.bGmHf_Qs.js";import{u as Ie}from"./index.C7eCcQ7I.js";import{u as ct,h as at,a as ut,F as it,R as lt}from"./Combination.bo6dpEKa.js";import{c as Ee,A as dt,C as ft,a as mt,R as pt}from"./index.D2UOOlok.js";import{P as ee}from"./index.UvFsUNS0.js";import{j as c}from"./jsx-runtime.B6Q2Q8rY.js";var ae="rovingFocusGroup.onEntryFocus",vt={bubbles:!1,cancelable:!0},te="RovingFocusGroup",[ue,we,ht]=_e(te),[Ct,Se]=Re(te,[ht]),[gt,Mt]=Ct(te),be=r.forwardRef((e,n)=>c.jsx(ue.Provider,{scope:e.__scopeRovingFocusGroup,children:c.jsx(ue.Slot,{scope:e.__scopeRovingFocusGroup,children:c.jsx(xt,{...e,ref:n})})}));be.displayName=te;var xt=r.forwardRef((e,n)=>{const{__scopeRovingFocusGroup:t,orientation:o,loop:u=!1,dir:s,currentTabStopId:d,defaultCurrentTabStopId:C,onCurrentTabStopIdChange:p,onEntryFocus:m,preventScrollOnEntryFocus:f=!1,...a}=e,v=r.useRef(null),M=j(n,v),l=Ie(s),[x=null,w]=et({prop:d,defaultProp:C,onChange:p}),[g,E]=r.useState(!1),k=le(m),W=we(t),L=r.useRef(!1),[z,b]=r.useState(0);return r.useEffect(()=>{const R=v.current;if(R)return R.addEventListener(ae,k),()=>R.removeEventListener(ae,k)},[k]),c.jsx(gt,{scope:t,orientation:o,dir:l,loop:u,currentTabStopId:x,onItemFocus:r.useCallback(R=>w(R),[w]),onItemShiftTab:r.useCallback(()=>E(!0),[]),onFocusableItemAdd:r.useCallback(()=>b(R=>R+1),[]),onFocusableItemRemove:r.useCallback(()=>b(R=>R-1),[]),children:c.jsx(T.div,{tabIndex:g||z===0?-1:0,"data-orientation":o,...a,ref:M,style:{outline:"none",...e.style},onMouseDown:h(e.onMouseDown,()=>{L.current=!0}),onFocus:h(e.onFocus,R=>{const D=!L.current;if(R.target===R.currentTarget&&D&&!g){const P=new CustomEvent(ae,vt);if(R.currentTarget.dispatchEvent(P),!P.defaultPrevented){const G=W().filter(S=>S.focusable),K=G.find(S=>S.active),Z=G.find(S=>S.id===x),re=[K,Z,...G].filter(Boolean).map(S=>S.ref.current);Te(re,f)}}L.current=!1}),onBlur:h(e.onBlur,()=>E(!1))})})}),Pe="RovingFocusGroupItem",ye=r.forwardRef((e,n)=>{const{__scopeRovingFocusGroup:t,focusable:o=!0,active:u=!1,tabStopId:s,...d}=e,C=ct(),p=s||C,m=Mt(Pe,t),f=m.currentTabStopId===p,a=we(t),{onFocusableItemAdd:v,onFocusableItemRemove:M}=m;return r.useEffect(()=>{if(o)return v(),()=>M()},[o,v,M]),c.jsx(ue.ItemSlot,{scope:t,id:p,focusable:o,active:u,children:c.jsx(T.span,{tabIndex:f?0:-1,"data-orientation":m.orientation,...d,ref:n,onMouseDown:h(e.onMouseDown,l=>{o?m.onItemFocus(p):l.preventDefault()}),onFocus:h(e.onFocus,()=>m.onItemFocus(p)),onKeyDown:h(e.onKeyDown,l=>{if(l.key==="Tab"&&l.shiftKey){m.onItemShiftTab();return}if(l.target!==l.currentTarget)return;const x=It(l,m.orientation,m.dir);if(x!==void 0){if(l.metaKey||l.ctrlKey||l.altKey||l.shiftKey)return;l.preventDefault();let g=a().filter(E=>E.focusable).map(E=>E.ref.current);if(x==="last")g.reverse();else if(x==="prev"||x==="next"){x==="prev"&&g.reverse();const E=g.indexOf(l.currentTarget);g=m.loop?Et(g,E+1):g.slice(E+1)}setTimeout(()=>Te(g))}})})})});ye.displayName=Pe;var Rt={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function _t(e,n){return n!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function It(e,n,t){const o=_t(e.key,t);if(!(n==="vertical"&&["ArrowLeft","ArrowRight"].includes(o))&&!(n==="horizontal"&&["ArrowUp","ArrowDown"].includes(o)))return Rt[o]}function Te(e,n=!1){const t=document.activeElement;for(const o of e)if(o===t||(o.focus({preventScroll:n}),document.activeElement!==t))return}function Et(e,n){return e.map((t,o)=>e[(n+o)%e.length])}var wt=be,St=ye,ie=["Enter"," "],bt=["ArrowDown","PageUp","Home"],Fe=["ArrowUp","PageDown","End"],Pt=[...bt,...Fe],yt={ltr:[...ie,"ArrowRight"],rtl:[...ie,"ArrowLeft"]},Tt={ltr:["ArrowLeft"],rtl:["ArrowRight"]},$="Menu",[Y,Ft,At]=_e($),[F,un]=Re($,[At,Ee,Se]),ne=Ee(),Ae=Se(),[Dt,A]=F($),[Ot,H]=F($),De=e=>{const{__scopeMenu:n,open:t=!1,children:o,dir:u,onOpenChange:s,modal:d=!0}=e,C=ne(n),[p,m]=r.useState(null),f=r.useRef(!1),a=le(s),v=Ie(u);return r.useEffect(()=>{const M=()=>{f.current=!0,document.addEventListener("pointerdown",l,{capture:!0,once:!0}),document.addEventListener("pointermove",l,{capture:!0,once:!0})},l=()=>f.current=!1;return document.addEventListener("keydown",M,{capture:!0}),()=>{document.removeEventListener("keydown",M,{capture:!0}),document.removeEventListener("pointerdown",l,{capture:!0}),document.removeEventListener("pointermove",l,{capture:!0})}},[]),c.jsx(pt,{...C,children:c.jsx(Dt,{scope:n,open:t,onOpenChange:a,content:p,onContentChange:m,children:c.jsx(Ot,{scope:n,onClose:r.useCallback(()=>a(!1),[a]),isUsingKeyboardRef:f,dir:v,modal:d,children:o})})})};De.displayName=$;var Nt="MenuAnchor",de=r.forwardRef((e,n)=>{const{__scopeMenu:t,...o}=e,u=ne(t);return c.jsx(dt,{...u,...o,ref:n})});de.displayName=Nt;var fe="MenuPortal",[jt,Oe]=F(fe,{forceMount:void 0}),Ne=e=>{const{__scopeMenu:n,forceMount:t,children:o,container:u}=e,s=A(fe,n);return c.jsx(jt,{scope:n,forceMount:t,children:c.jsx(ee,{present:t||s.open,children:c.jsx(st,{asChild:!0,container:u,children:o})})})};Ne.displayName=fe;var I="MenuContent",[kt,me]=F(I),je=r.forwardRef((e,n)=>{const t=Oe(I,e.__scopeMenu),{forceMount:o=t.forceMount,...u}=e,s=A(I,e.__scopeMenu),d=H(I,e.__scopeMenu);return c.jsx(Y.Provider,{scope:e.__scopeMenu,children:c.jsx(ee,{present:o||s.open,children:c.jsx(Y.Slot,{scope:e.__scopeMenu,children:d.modal?c.jsx(Lt,{...u,ref:n}):c.jsx(Gt,{...u,ref:n})})})})}),Lt=r.forwardRef((e,n)=>{const t=A(I,e.__scopeMenu),o=r.useRef(null),u=j(n,o);return r.useEffect(()=>{const s=o.current;if(s)return at(s)},[]),c.jsx(pe,{...e,ref:u,trapFocus:t.open,disableOutsidePointerEvents:t.open,disableOutsideScroll:!0,onFocusOutside:h(e.onFocusOutside,s=>s.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>t.onOpenChange(!1)})}),Gt=r.forwardRef((e,n)=>{const t=A(I,e.__scopeMenu);return c.jsx(pe,{...e,ref:n,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>t.onOpenChange(!1)})}),pe=r.forwardRef((e,n)=>{const{__scopeMenu:t,loop:o=!1,trapFocus:u,onOpenAutoFocus:s,onCloseAutoFocus:d,disableOutsidePointerEvents:C,onEntryFocus:p,onEscapeKeyDown:m,onPointerDownOutside:f,onFocusOutside:a,onInteractOutside:v,onDismiss:M,disableOutsideScroll:l,...x}=e,w=A(I,t),g=H(I,t),E=ne(t),k=Ae(t),W=Ft(t),[L,z]=r.useState(null),b=r.useRef(null),R=j(n,b,w.onContentChange),D=r.useRef(0),P=r.useRef(""),G=r.useRef(0),K=r.useRef(null),Z=r.useRef("right"),q=r.useRef(0),re=l?lt:r.Fragment,S=l?{as:ot,allowPinchZoom:!0}:void 0,Qe=i=>{const N=P.current+i,y=W().filter(_=>!_.disabled),U=document.activeElement,se=y.find(_=>_.ref.current===U)?.textValue,ce=y.map(_=>_.textValue),ge=qt(ce,N,se),B=y.find(_=>_.textValue===ge)?.ref.current;(function _(Me){P.current=Me,window.clearTimeout(D.current),Me!==""&&(D.current=window.setTimeout(()=>_(""),1e3))})(N),B&&setTimeout(()=>B.focus())};r.useEffect(()=>()=>window.clearTimeout(D.current),[]),ut();const O=r.useCallback(i=>Z.current===K.current?.side&&Qt(i,K.current?.area),[]);return c.jsx(kt,{scope:t,searchRef:P,onItemEnter:r.useCallback(i=>{O(i)&&i.preventDefault()},[O]),onItemLeave:r.useCallback(i=>{O(i)||(b.current?.focus(),z(null))},[O]),onTriggerLeave:r.useCallback(i=>{O(i)&&i.preventDefault()},[O]),pointerGraceTimerRef:G,onPointerGraceIntentChange:r.useCallback(i=>{K.current=i},[]),children:c.jsx(re,{...S,children:c.jsx(it,{asChild:!0,trapped:u,onMountAutoFocus:h(s,i=>{i.preventDefault(),b.current?.focus({preventScroll:!0})}),onUnmountAutoFocus:d,children:c.jsx(tt,{asChild:!0,disableOutsidePointerEvents:C,onEscapeKeyDown:m,onPointerDownOutside:f,onFocusOutside:a,onInteractOutside:v,onDismiss:M,children:c.jsx(wt,{asChild:!0,...k,dir:g.dir,orientation:"vertical",loop:o,currentTabStopId:L,onCurrentTabStopIdChange:z,onEntryFocus:h(p,i=>{g.isUsingKeyboardRef.current||i.preventDefault()}),preventScrollOnEntryFocus:!0,children:c.jsx(ft,{role:"menu","aria-orientation":"vertical","data-state":Je(w.open),"data-radix-menu-content":"",dir:g.dir,...E,...x,ref:R,style:{outline:"none",...x.style},onKeyDown:h(x.onKeyDown,i=>{const y=i.target.closest("[data-radix-menu-content]")===i.currentTarget,U=i.ctrlKey||i.altKey||i.metaKey,se=i.key.length===1;y&&(i.key==="Tab"&&i.preventDefault(),!U&&se&&Qe(i.key));const ce=b.current;if(i.target!==ce||!Pt.includes(i.key))return;i.preventDefault();const B=W().filter(_=>!_.disabled).map(_=>_.ref.current);Fe.includes(i.key)&&B.reverse(),zt(B)}),onBlur:h(e.onBlur,i=>{i.currentTarget.contains(i.target)||(window.clearTimeout(D.current),P.current="")}),onPointerMove:h(e.onPointerMove,X(i=>{const N=i.target,y=q.current!==i.clientX;if(i.currentTarget.contains(N)&&y){const U=i.clientX>q.current?"right":"left";Z.current=U,q.current=i.clientX}}))})})})})})})});je.displayName=I;var Kt="MenuGroup",ve=r.forwardRef((e,n)=>{const{__scopeMenu:t,...o}=e;return c.jsx(T.div,{role:"group",...o,ref:n})});ve.displayName=Kt;var Ut="MenuLabel",ke=r.forwardRef((e,n)=>{const{__scopeMenu:t,...o}=e;return c.jsx(T.div,{...o,ref:n})});ke.displayName=Ut;var J="MenuItem",xe="menu.itemSelect",oe=r.forwardRef((e,n)=>{const{disabled:t=!1,onSelect:o,...u}=e,s=r.useRef(null),d=H(J,e.__scopeMenu),C=me(J,e.__scopeMenu),p=j(n,s),m=r.useRef(!1),f=()=>{const a=s.current;if(!t&&a){const v=new CustomEvent(xe,{bubbles:!0,cancelable:!0});a.addEventListener(xe,M=>o?.(M),{once:!0}),rt(a,v),v.defaultPrevented?m.current=!1:d.onClose()}};return c.jsx(Le,{...u,ref:p,disabled:t,onClick:h(e.onClick,f),onPointerDown:a=>{e.onPointerDown?.(a),m.current=!0},onPointerUp:h(e.onPointerUp,a=>{m.current||a.currentTarget?.click()}),onKeyDown:h(e.onKeyDown,a=>{const v=C.searchRef.current!=="";t||v&&a.key===" "||ie.includes(a.key)&&(a.currentTarget.click(),a.preventDefault())})})});oe.displayName=J;var Le=r.forwardRef((e,n)=>{const{__scopeMenu:t,disabled:o=!1,textValue:u,...s}=e,d=me(J,t),C=Ae(t),p=r.useRef(null),m=j(n,p),[f,a]=r.useState(!1),[v,M]=r.useState("");return r.useEffect(()=>{const l=p.current;l&&M((l.textContent??"").trim())},[s.children]),c.jsx(Y.ItemSlot,{scope:t,disabled:o,textValue:u??v,children:c.jsx(St,{asChild:!0,...C,focusable:!o,children:c.jsx(T.div,{role:"menuitem","data-highlighted":f?"":void 0,"aria-disabled":o||void 0,"data-disabled":o?"":void 0,...s,ref:m,onPointerMove:h(e.onPointerMove,X(l=>{o?d.onItemLeave(l):(d.onItemEnter(l),l.defaultPrevented||l.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:h(e.onPointerLeave,X(l=>d.onItemLeave(l))),onFocus:h(e.onFocus,()=>a(!0)),onBlur:h(e.onBlur,()=>a(!1))})})})}),Bt="MenuCheckboxItem",Ge=r.forwardRef((e,n)=>{const{checked:t=!1,onCheckedChange:o,...u}=e;return c.jsx(Ye,{scope:e.__scopeMenu,checked:t,children:c.jsx(oe,{role:"menuitemcheckbox","aria-checked":Q(t)?"mixed":t,...u,ref:n,"data-state":Ce(t),onSelect:h(u.onSelect,()=>o?.(Q(t)?!0:!t),{checkForDefaultPrevented:!1})})})});Ge.displayName=Bt;var Ke="MenuRadioGroup",[Vt,Yt]=F(Ke,{value:void 0,onValueChange:()=>{}}),Ue=r.forwardRef((e,n)=>{const{value:t,onValueChange:o,...u}=e,s=le(o);return c.jsx(Vt,{scope:e.__scopeMenu,value:t,onValueChange:s,children:c.jsx(ve,{...u,ref:n})})});Ue.displayName=Ke;var Be="MenuRadioItem",Ve=r.forwardRef((e,n)=>{const{value:t,...o}=e,u=Yt(Be,e.__scopeMenu),s=t===u.value;return c.jsx(Ye,{scope:e.__scopeMenu,checked:s,children:c.jsx(oe,{role:"menuitemradio","aria-checked":s,...o,ref:n,"data-state":Ce(s),onSelect:h(o.onSelect,()=>u.onValueChange?.(t),{checkForDefaultPrevented:!1})})})});Ve.displayName=Be;var he="MenuItemIndicator",[Ye,Xt]=F(he,{checked:!1}),Xe=r.forwardRef((e,n)=>{const{__scopeMenu:t,forceMount:o,...u}=e,s=Xt(he,t);return c.jsx(ee,{present:o||Q(s.checked)||s.checked===!0,children:c.jsx(T.span,{...u,ref:n,"data-state":Ce(s.checked)})})});Xe.displayName=he;var $t="MenuSeparator",$e=r.forwardRef((e,n)=>{const{__scopeMenu:t,...o}=e;return c.jsx(T.div,{role:"separator","aria-orientation":"horizontal",...o,ref:n})});$e.displayName=$t;var Ht="MenuArrow",He=r.forwardRef((e,n)=>{const{__scopeMenu:t,...o}=e,u=ne(t);return c.jsx(mt,{...u,...o,ref:n})});He.displayName=Ht;var Wt="MenuSub",[ln,We]=F(Wt),V="MenuSubTrigger",ze=r.forwardRef((e,n)=>{const t=A(V,e.__scopeMenu),o=H(V,e.__scopeMenu),u=We(V,e.__scopeMenu),s=me(V,e.__scopeMenu),d=r.useRef(null),{pointerGraceTimerRef:C,onPointerGraceIntentChange:p}=s,m={__scopeMenu:e.__scopeMenu},f=r.useCallback(()=>{d.current&&window.clearTimeout(d.current),d.current=null},[]);return r.useEffect(()=>f,[f]),r.useEffect(()=>{const a=C.current;return()=>{window.clearTimeout(a),p(null)}},[C,p]),c.jsx(de,{asChild:!0,...m,children:c.jsx(Le,{id:u.triggerId,"aria-haspopup":"menu","aria-expanded":t.open,"aria-controls":u.contentId,"data-state":Je(t.open),...e,ref:nt(n,u.onTriggerChange),onClick:a=>{e.onClick?.(a),!(e.disabled||a.defaultPrevented)&&(a.currentTarget.focus(),t.open||t.onOpenChange(!0))},onPointerMove:h(e.onPointerMove,X(a=>{s.onItemEnter(a),!a.defaultPrevented&&!e.disabled&&!t.open&&!d.current&&(s.onPointerGraceIntentChange(null),d.current=window.setTimeout(()=>{t.onOpenChange(!0),f()},100))})),onPointerLeave:h(e.onPointerLeave,X(a=>{f();const v=t.content?.getBoundingClientRect();if(v){const M=t.content?.dataset.side,l=M==="right",x=l?-5:5,w=v[l?"left":"right"],g=v[l?"right":"left"];s.onPointerGraceIntentChange({area:[{x:a.clientX+x,y:a.clientY},{x:w,y:v.top},{x:g,y:v.top},{x:g,y:v.bottom},{x:w,y:v.bottom}],side:M}),window.clearTimeout(C.current),C.current=window.setTimeout(()=>s.onPointerGraceIntentChange(null),300)}else{if(s.onTriggerLeave(a),a.defaultPrevented)return;s.onPointerGraceIntentChange(null)}})),onKeyDown:h(e.onKeyDown,a=>{const v=s.searchRef.current!=="";e.disabled||v&&a.key===" "||yt[o.dir].includes(a.key)&&(t.onOpenChange(!0),t.content?.focus(),a.preventDefault())})})})});ze.displayName=V;var Ze="MenuSubContent",qe=r.forwardRef((e,n)=>{const t=Oe(I,e.__scopeMenu),{forceMount:o=t.forceMount,...u}=e,s=A(I,e.__scopeMenu),d=H(I,e.__scopeMenu),C=We(Ze,e.__scopeMenu),p=r.useRef(null),m=j(n,p);return c.jsx(Y.Provider,{scope:e.__scopeMenu,children:c.jsx(ee,{present:o||s.open,children:c.jsx(Y.Slot,{scope:e.__scopeMenu,children:c.jsx(pe,{id:C.contentId,"aria-labelledby":C.triggerId,...u,ref:m,align:"start",side:d.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:f=>{d.isUsingKeyboardRef.current&&p.current?.focus(),f.preventDefault()},onCloseAutoFocus:f=>f.preventDefault(),onFocusOutside:h(e.onFocusOutside,f=>{f.target!==C.trigger&&s.onOpenChange(!1)}),onEscapeKeyDown:h(e.onEscapeKeyDown,f=>{d.onClose(),f.preventDefault()}),onKeyDown:h(e.onKeyDown,f=>{const a=f.currentTarget.contains(f.target),v=Tt[d.dir].includes(f.key);a&&v&&(s.onOpenChange(!1),C.trigger?.focus(),f.preventDefault())})})})})})});qe.displayName=Ze;function Je(e){return e?"open":"closed"}function Q(e){return e==="indeterminate"}function Ce(e){return Q(e)?"indeterminate":e?"checked":"unchecked"}function zt(e){const n=document.activeElement;for(const t of e)if(t===n||(t.focus(),document.activeElement!==n))return}function Zt(e,n){return e.map((t,o)=>e[(n+o)%e.length])}function qt(e,n,t){const u=n.length>1&&Array.from(n).every(m=>m===n[0])?n[0]:n,s=t?e.indexOf(t):-1;let d=Zt(e,Math.max(s,0));u.length===1&&(d=d.filter(m=>m!==t));const p=d.find(m=>m.toLowerCase().startsWith(u.toLowerCase()));return p!==t?p:void 0}function Jt(e,n){const{x:t,y:o}=e;let u=!1;for(let s=0,d=n.length-1;s<n.length;d=s++){const C=n[s].x,p=n[s].y,m=n[d].x,f=n[d].y;p>o!=f>o&&t<(m-C)*(o-p)/(f-p)+C&&(u=!u)}return u}function Qt(e,n){if(!n)return!1;const t={x:e.clientX,y:e.clientY};return Jt(t,n)}function X(e){return n=>n.pointerType==="mouse"?e(n):void 0}var dn=De,fn=de,mn=Ne,pn=je,vn=ve,hn=ke,Cn=oe,gn=Ge,Mn=Ue,xn=Ve,Rn=Xe,_n=$e,In=He,En=ze,wn=qe;export{fn as A,pn as C,vn as G,Cn as I,hn as L,mn as P,Mn as R,_n as S,gn as a,xn as b,un as c,Rn as d,In as e,En as f,wn as g,dn as h};
