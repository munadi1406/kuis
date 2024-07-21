import { jsxs, jsx } from 'react/jsx-runtime';
import ClipLoader from 'react-spinners/ClipLoader.js';
import { B as Button } from './Dashboard_BZnJtW5m.mjs';

const localTime = (isoDateString) => {
  return new Date(isoDateString).toLocaleString();
};

const ButtonLoader = ({ text, loading, className, ...props }) => {
  return /* @__PURE__ */ jsxs(Button, { ...props, className: `space-x-2 gap-2 flex ${className}`, children: [
    text,
    /* @__PURE__ */ jsx(
      ClipLoader,
      {
        color: "white",
        loading,
        size: 20,
        "aria-label": "Loading Spinner",
        "data-testid": "loader"
      }
    )
  ] });
};

export { ButtonLoader as B, localTime as l };
