import { Fragment, lazy } from "react";
// import Input from "../Input";
// import PropTypes from "prop-types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
const EditorInput = lazy(()=>import("../EditorInput"));

export default function Form({
  soalArray,
  opsiJawabanArray,
  handleInputChange,
}) {
  return (
    <>
      {soalArray.map((e) => (
        <Fragment key={e}>
          <Label htmlFor={`Soal-Ke-${e + 1}`}>{`Soal Ke ${e + 1}`}</Label>
          <EditorInput id={`Soal-Ke-${e + 1}`} name={`soal-${e}`}  onChange={handleInputChange}/>
          {/* <Textarea id={`Soal-Ke-${e + 1}`}
            placeholder={`Soal Ke ${e + 1}`}
            key={e}
            
            name={`soal-${e}`}
            onChange={handleInputChange}
            required={true} /> */}
          
          {opsiJawabanArray.map((jawabanI) => (
            <div
              className="grid grid-cols-6 w-full border-l-2 border-blue-600"
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
              <div className=" col-span-5 w-full">
                <Label htmlFor={`Jawaban Ke ${jawabanI + 1}`}>{`Jawaban Ke ${
                  jawabanI + 1
                }`}</Label>
                <Textarea
                  id={`Jawaban-Ke-${jawabanI + 1}`}
                  name={`jawaban${jawabanI}-${e}`}
                  onChange={handleInputChange}
                  required={true}
                />
              </div>
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
