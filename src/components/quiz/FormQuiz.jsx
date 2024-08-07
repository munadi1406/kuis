import { useState, Suspense, lazy } from "react";
// import ButtonPure from "../ButtonPure";
// import DateTimeRange from "../DateTimeRange";
// import { useMutation } from "react-query";
// import PropTypes from "prop-types";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea"
import Form from "./FormAnswer";
import { Label } from "../ui/label";

export default function FormQuiz() {
  const [jumlahSoal, setJumlahSoal] = useState(0);
  const [jumlahOpsiJawaban, setJumlahOpsiJawaban] = useState(0);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [duration, setDuration] = useState(0);
  const [startQuiz, setStartQuiz] = useState("");
  const [endQuiz, setEndQuiz] = useState("");
  //   const { courseId } = useParams();
  //   const { setStatus, setStatusType, setMsgNotification } = useNotification();
  const [isFromFile, setIsFromFile] = useState(false);

  const soalArray = Array.from({ length: jumlahSoal }, (_, index) => index);
  const opsiJawabanArray = Array.from(
    { length: jumlahOpsiJawaban },
    (_, index) => index
  );
  const [soalData, setSoalData] = useState([]);
  const handleInputChange = (event) => {
    const { name, value, id } = event.target;
    // Memeriksa apakah input merupakan input soal atau jawaban

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
            answerIsTrue: false,
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

  //   const { mutate, isLoading } = useMutation({
  //     mutationFn: async (e) => {
  //       e.preventDefault();
  //       const dataPayload = {
  //         idCourse: courseId,
  //         judul,
  //         deskripsi,
  //         duration,
  //         startQuiz,
  //         endQuiz,
  //         dataQuiz: soalData,
  //       };
  //       const data = await createQuiz(dataPayload);
  //       return data;
  //     },
  //     onSuccess: (data) => {
  //       setStatus(true);
  //       setStatusType(true);
  //       setMsgNotification(data.data.message);
  //       handleClose();
  //     },
  //     onError: (error) => {
  //       setStatus(true);
  //       setStatusType(true);
  //       setMsgNotification(error.response.data.message);
  //     },
  //   });

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

  return (
    <form className="grid grid-cols-1 gap-2 p-2 rounded-md border" autoComplete="none">
      <div className="flex justify-center items-center gap-2 w-full flex-col">
        <div className="w-full gap-1.5">
          <Label htmlFor="namaKuis">Nama Kuis</Label>
          <Input
            label={"Nama Quiz"}
            placeholder={"Masukkan Nama Quiz"}
            required={true}
            onChange={(e) => setJudul(e.target.value)}
            id="namaKuis"
          />
        </div>
        <div className="w-full gap-1.5">
          <Label htmlFor="Deskripsi">Deskripsi Quiz</Label>
          <Textarea id="Deskripsi"/>
        </div>
        <Input
          type={"number"}
          label={"Lama Pengerjaan Quiz"}
          placeholder={"Masukkan Lama Pengerjaan Kuis Dalam Menit..."}
          required={true}
          onChange={(e) => setDuration(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2 w-full">
          <div className="col-span-2 w-full">
            {/* <DateTimeRange dateFrom={setStartQuiz} dateTo={setEndQuiz} /> */}
          </div>
          {!isFromFile ? (
            <>
              <Input
                placeholder={"Masukkan Jumlah Soal "}
                label={"Jumlah Soal"}
                value={jumlahSoal}
                onChange={(e) => setJumlahSoal(e.target.value)}
                required={true}
              />
              <Input
                placeholder={"Masukkan Jumlah Opsi Jawaban Di Setiap Soal"}
                label={"Jumlah Opsi Jawaban"}
                value={jumlahOpsiJawaban}
                onChange={(e) => setJumlahOpsiJawaban(e.target.value)}
                required={true}
              />
            </>
          ) : (
            <div className="col-span-2">
              <Input
                label={"File Pdf"}
                accept=".txt"
                type={"file"}
                onChange={handleChangePdf}
                style={"col-span-2"}
              />
            </div>
          )}
        </div>
      </div>
      
        <Form
          opsiJawabanArray={opsiJawabanArray}
          handleInputChange={handleInputChange}
          soalArray={soalArray}
        />
    
      {/* <div>{handleCreate()}</div> */}
      <div className="flex w-full">
        {/* <ButtonPure
          text={isLoading ? "Loading..." : "Post Quiz"}
          style={`${isLoading && "cursor-not-allowed opacity-70"}`}
          disabled={isLoading}
        /> */}
      </div>
    </form>
  );
}
