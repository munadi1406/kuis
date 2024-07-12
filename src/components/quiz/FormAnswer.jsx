import { Fragment } from "react";
// import Input from "../Input";
// import PropTypes from "prop-types";
import { Input } from "../ui/input";

export default function Form({
  soalArray,
  opsiJawabanArray,
  handleInputChange,
}) {
  return (
    <>
      {soalArray.map((e) => (
        <Fragment key={e}>
          <Input
            label={`Soal Ke ${e + 1}`}
            key={e}
            row={3}
            name={`soal-${e}`}
            onChange={handleInputChange}
            required={true}
          />
          {opsiJawabanArray.map((jawabanI) => (
            <div
              className="grid grid-cols-6 w-full border-l-2 border-blue1"
              key={jawabanI}
            >
              <div className="col-span-1 flex flex-col justify-center items-center">
                <label
                  htmlFor={`jawaban${e}`}
                  className="text-xs text-blue1 text-center p-1"
                >
                  Click Jika Ini Jawaban Yang Benar
                </label>
                <input
                  type="radio"
                  name={`isTrue${e}`}
                  id={`jawabanId${jawabanI}`}
                  value={true}
                  onChange={handleInputChange}
                  required={true}
                />
              </div>
              <Input
               
                label={`Jawaban Ke ${jawabanI + 1}`}
                name={`jawaban${jawabanI}-${e}`}
                onChange={handleInputChange}
                required={true}
              />
            </div>
          ))}
        </Fragment>
      ))}
    </>
  );
}
// Form.propTypes = {
//   soalArray: PropTypes.array.isRequired,
//   opsiJawabanArray: PropTypes.array.isRequired,
//   handleInputChange: PropTypes.func.isRequired,
// };
