import { Fragment, lazy, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const EditorInput = lazy(() => import("./EditorInput"));

export default function Form({
  soalArray,
  opsiJawabanArray,
  handleInputChange,
  soalData,
  setSoalData,
  setJumlahSoal
}) {
  const [data, setData] = useState([])


  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      const deleteQuestion = await axios.delete(`/api/question?id=${id}`)
      return deleteQuestion.data.data
    },
    onSuccess: (data) => {
      // console.log(data)
      toast({
        title: "berhasil",
        description: "Pertanyaan Berhasil Dihapus"
      })
    },
    onError: (error) => {
      toast({
        title: "Gagal",
        variant: "destructive",
        description: error.response.data.message,
      });
    }
  })
  const handleDelete = (i) => {
    // console.log({ soalData })
    if (soalData[i]) {
      if (soalData[i].id) {
        // console.log('id', soalData[i].id)
        mutate(soalData[i].id)
      }
      setSoalData((prevData) => {
        const newData = [...prevData];
        newData.splice(i, 1);
        // console.log({newData})
        setJumlahSoal(newData.length)
        return newData;
      });
    }
  }

  
  

  return (
    <>
      {/* {console.log(soalArray)} */}
      {soalArray.map((e, i) => (
        <Fragment key={i}>
          {/* {console.log('index',e)}
          {console.log('editor',soalData[e])} */}
          <Label htmlFor={`Soal-Ke-${e + 1}`}>{`Soal Ke ${e + 1}`}</Label>
          <div className="px-4">
            {soalData.length >= 0 &&
              <EditorInput id={`Soal-Ke-${e + 1}`} name={`soal-${e}`} onChange={handleInputChange} data={soalData[i] && soalData[i]?.question} dataLength={soalData.length}/>
            }
          </div>
          
          <Button className="bg-red-600" onClick={() => handleDelete(i)} type="button">Hapus Soal No {i + 1}</Button>
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
                  checked={soalData[i] ? soalData[i]?.answerOption[jawabanI]?.answerIsTrue : ''}
                />

              </div>
              <div className=" col-span-5 w-full">
                <Label htmlFor={`Jawaban Ke ${jawabanI + 1}`}>{`Jawaban Ke ${jawabanI + 1
                  }`}</Label>
                <Textarea
                  id={`Jawaban-Ke-${jawabanI + 1}`}
                  name={`jawaban${jawabanI}-${e}`}
                  onChange={handleInputChange}
                  required={true}
                  value={soalData[i]?.answerOption[jawabanI]?.answerOption}
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
