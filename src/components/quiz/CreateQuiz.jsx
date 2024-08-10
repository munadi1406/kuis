import { useState, Suspense, lazy, useEffect } from "react";
// import ButtonPure from "../ButtonPure";
// import DateTimeRange from "../DateTimeRange";

// import PropTypes from "prop-types";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import Form from "./FormAnswer";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import WithQuery from "@/utils/WithQuery";
import EditorInput from "../EditorInput";
import { toast } from "../ui/use-toast";
import ButtonLoader from "../ButtonLoader";

const CreateQuiz = () => {
  const [jumlahSoal, setJumlahSoal] = useState(1);
  const [jumlahOpsiJawaban, setJumlahOpsiJawaban] = useState(4);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [duration, setDuration] = useState(0);
  const [startQuiz, setStartQuiz] = useState("");
  const [endQuiz, setEndQuiz] = useState("");
  const [option, setOption] = useState({
    mapel: 0,
    kelas: 0,
  });
  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setOption((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };


  const [token, setToken] = useState("");
  //   const { courseId } = useParams();
  //   const { setStatus, setStatusType, setMsgNotification } = useNotification();
  const [isFromFile, setIsFromFile] = useState(false);

  const soalArray = Array.from({ length: jumlahSoal }, (_, index) => index);
  const opsiJawabanArray = Array.from(
    { length: jumlahOpsiJawaban },
    (_, index) => index
  );
  const [soalData, setSoalData] = useState([]);

  // useEffect(() => {
  //   console.log(soalData)
  // }, [soalData])


  const handleInputChange = (event) => {
    const { name, value, id } = event.target;
    // console.log("run")
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
      // console.log("radio run");
      const idSoal = parseInt(name.split("isTrue")[1]);
      const idJawaban = parseInt(id.split("jawabanId")[1]);
      // console.log({ idJawaban });

      setSoalData((prevData) => {
        const newData = [...prevData];

        // Buat objek soal jika belum ada
        if (!newData[idSoal]) {
          newData[idSoal] = { question: "", answerOption: [] };
        }

        // Buat objek jawaban jika belum ada
        if (!newData[idSoal].answerOption[idJawaban]) {
          newData[idSoal].answerOption[idJawaban] = {
            answerOption: "",
            answerIsTrue: false,
          };
        }

        // Set answerIsTrue pada jawaban yang sesuai
        newData[idSoal].answerOption.forEach((option, index) => {
          option.answerIsTrue = index === idJawaban;
        });

        return newData;
      });

      // console.log("done");
    }
  };

  const dataMapel = useQuery({
    queryKey: ["mapelForm"],
    queryFn: async () => {
      const datas = await axios.get("/api/mapel/all");
      return datas.data;
    },
  });
  const dataKelas = useQuery({
    queryKey: ["kelasForm"],
    queryFn: async () => {
      const datas = await axios.get("/api/kelas/all");
      return datas.data;
    },
  });

  const { mutate, isPending, } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      const dataPayload = {
        id_user: 1,
        title: judul,
        desc: deskripsi,
        duration,
        startDate: startQuiz,
        endDate: endQuiz,
        token,
        soalData,
        ...option
      };
      // console.log(dataPayload)
      const insert = await axios.post('api/quiz', { data: dataPayload })
      return insert
    },
    onSuccess: (data) => {
      toast({
        title: "berhasil",
        description: "Kuis Berhasil Dibuat"
      })
      window.location.href = '/dashboard'
    },
    onError: (error) => {
      toast({
        title: "Gagal",
        variant: "destructive",
        description: error.response.data.message,
      });
    },
  });

  const handleDateChange = (e) => {
    const { id, value } = e.target;
    const newDate = new Date(value).toISOString();
    let newStartQuiz = startQuiz;
    let newEndQuiz = endQuiz;

    // Update the date based on the input id
    if (id === "date1") {
      newStartQuiz = newDate;
    } else if (id === "date2") {
      newEndQuiz = newDate;
    }

    // Validate dates
    const startDate = new Date(newStartQuiz);
    const endDate = new Date(newEndQuiz);

    if (newStartQuiz && newEndQuiz && endDate < startDate) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Tanggal selesai tidak boleh kurang dari tanggal mulai.",
        // You may also want to clear the end date if validation fails
        // For example, setEndQuiz("");
      });
    } else {
      // Only update state if validation passes
      if (id === "date1") {
        setStartQuiz(newStartQuiz);
      } else if (id === "date2") {
        setEndQuiz(newEndQuiz);
      }
    }
  };
  // const mutate = (e)=>{
  //   e.preventDefault()
  //   const dataPayload = {
  //           id_user: 1,
  //           judul,
  //           deskripsi,
  //           duration,
  //           startQuiz,
  //           endQuiz,
  //           token,
  //           dataQuiz: soalData,
  //           ...option,
  //         };
  //         console.log(dataPayload)
  // }
  const [text, setText] = useState();
  const handleChangePdf = async (e) => {
    const file = e.target.files[0];
    const textt = await readFileContents(file);
    if (textt) {
      setText(textt);
    }
    setIsFromFile(true);
  };

  // useEffect(() => {
  //   console.log(deskripsi)
  // }, [deskripsi])
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
    <form className="grid md:grid-cols-6 grid-cols-1 gap-2" autoComplete="none" onSubmit={mutate}>
      <div
        className="grid grid-cols-1 order-1   gap-2 p-2 rounded-md border col-span-4"
        autoComplete="none"
      >
        <div className="flex  justify-center items-center gap-2 w-full flex-col">
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
            <Textarea id="Deskripsi" onChange={(e) => setDeskripsi(e.target.value)} />
          </div>



          <div className="w-full gap-1.5">
            <Label htmlFor="mapel">Pilih Mata Pelajaran</Label>
            <Select id="mapel" name="mapel" disabled={dataMapel.isLoading} value={option.mapel === 0 ? "" : option.mapel} onValueChange={(e) => handleSelectChange({ target: { name: "mapel", value: e } })}>
              <SelectTrigger className="w-full" >
                <SelectValue placeholder="Mata Pelajaran" />
              </SelectTrigger>
              <SelectContent>
                {dataMapel.isSuccess > 0 &&
                  dataMapel.data.data.map(({ id, mapel }, i) => (
                    <SelectItem value={id} key={id} id={id}>{mapel}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full gap-1.5">
            <Label htmlFor="Deskripsi">Kelas</Label>
            <Select disabled={dataKelas.isLoading} value={option.kelas === 0 ? "" : option.kelas} onValueChange={(e) => handleSelectChange({ target: { name: "kelas", value: e } })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent>
                {dataKelas.isSuccess > 0 &&
                  dataKelas.data.data.map(({ id, kelas }, i) => (
                    <SelectItem value={id} key={i} id={i}>{kelas}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            {!isFromFile ? (
              <>
                <div className="w-full gap-1.5">
                  <Label htmlFor="jumlahSoal">Jumlah Soal</Label>
                  <Input
                    id="jumlahSoal"
                    placeholder={"Masukkan Jumlah Soal "}
                    value={jumlahSoal}
                    onChange={(e) => setJumlahSoal(e.target.value)}
                    required={true}
                    type="number"
                    max="50"
                  />
                </div>
                <div className="w-full gap-1.5">
                  <Label htmlFor="jumlahSoal">Opsi Jawaban</Label>
                  <Input
                    type="number"
                    id="opsiJawaban"
                    placeholder={"Masukkan Jumlah Opsi Jawaban Di Setiap Soal"}
                    value={jumlahOpsiJawaban}
                    onChange={(e) => setJumlahOpsiJawaban(e.target.value)}
                    required={true}
                  />
                </div>
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

        {/* <div>{handleCreate()}</div> */}
        <div className="flex w-full">
          {/* <ButtonPure
          text={isLoading ? "Loading..." : "Post Quiz"}
          style={`${isLoading && "cursor-not-allowed opacity-70"}`}
          disabled={isLoading}
        /> */}
        </div>
      </div>
      <div className="col-span-2 md:order-2 order-3 border p-2 rounded-md flex flex-col gap-2 md:sticky top-0">
        <div className="w-full gap-1.5">
          <Label htmlFor="date1">Tanggal Mulai</Label>
          <Input
            type="datetime-local"
            required={true}
            id="date1"
            onChange={handleDateChange}
            value={startQuiz ? new Date(startQuiz).toISOString().slice(0, 16) : ""}
          />
        </div>
        <div className="w-full gap-1.5">
          <Label htmlFor="date2">Tanggal Selesai</Label>
          <Input
            type="datetime-local"
            required={true}
            id="date2"
            onChange={handleDateChange}
            value={endQuiz ? new Date(endQuiz).toISOString().slice(0, 16) : ""}
          />
        </div>
        <div className="w-full gap-1.5">
          <Label htmlFor="lamaPengerjaan">Lama Pengerjaan</Label>
          <Input
            type={"number"}
            label={"Lama Pengerjaan Quiz"}
            placeholder={"Masukkan Lama Pengerjaan Kuis Dalam Menit..."}
            required={true}
            onChange={(e) => setDuration(e.target.value)}
            id="lamaPengerjaan"
          />
        </div>
        <div className="w-full gap-1.5">
          <Label htmlFor="lamaPengerjaan">Token Kuis</Label>
          <p className="text-red-600 text-xs">Jika Anda Tidak Memasukkan Token Kami Akan Membuatkan Token Anda Secara Otomatis</p>
          <Input
            type={"text"}
            label={"Lama Pengerjaan Quiz"}
            placeholder={"Masukkan Token Kuis..."}

            onChange={(e) => setToken(e.target.value)}
            id="tokenKuis"
          />
        </div>

        <ButtonLoader loading={isPending} text={"Simpan"} type="submit" />
        {/* {console.log(isLoading)} */}
      </div>
      <div className="w-full md:order-3 order-2 col-span-4 flex flex-col gap-2 border p-2 rounded-md">
        <Form
          opsiJawabanArray={opsiJawabanArray}
          handleInputChange={handleInputChange}
          soalArray={soalArray}
        />
      </div>
    </form>
  );
};

export default WithQuery(CreateQuiz);
