import { useState, Suspense, lazy, useEffect } from "react";
// import ButtonPure from "../ButtonPure";
// import DateTimeRange from "../DateTimeRange";

// import PropTypes from "prop-types";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import Form from "./FormAnswer";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import { toast } from "../ui/use-toast";
import ButtonLoader from "../ButtonLoader";

const UpdateQuiz = ({ quizData,idUser }) => {
  // console.log(quizData)
  const [jumlahSoal, setJumlahSoal] = useState(1);
  const [jumlahOpsiJawaban, setJumlahOpsiJawaban] = useState(4);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [duration, setDuration] = useState(0);
  const [startQuiz, setStartQuiz] = useState("");
  const [kkm,setKkm] = useState(80)
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
  
    if (name.startsWith("soal")) {
      const soalIndex = parseInt(name.split("soal-")[1]);
      setSoalData((prevData) => {
        // Include `id` in the `question` object
        prevData[soalIndex] = {
          id: prevData[soalIndex] ? prevData[soalIndex].id : null,
          question: value,
          answerOption: prevData[soalIndex] ? prevData[soalIndex].answerOption : [],
        };
        return [...prevData];
      });
    } else if (name.startsWith("jawaban")) {
      const soalIndex = parseInt(name.split("jawaban")[1].split("-")[1]);
      const jawabanIndex = parseInt(name.split("jawaban")[1].split("-")[0]);
  
      if (!soalData[soalIndex]) return;
  
      setSoalData((prevData) => {
        if (!prevData[soalIndex].answerOption[jawabanIndex]) {
          prevData[soalIndex].answerOption[jawabanIndex] = {
            id:prevData[soalIndex].answerOption[jawabanIndex]?.id ? prevData[soalIndex].answerOption[jawabanIndex].id : null,
            answerOption: value,
            answerIsTrue: false,
          };
        } else {
          prevData[soalIndex].answerOption[jawabanIndex].answerOption = value;
        }
        return [...prevData];
      });
    } else if (name.startsWith("isTrue")) {
      const idSoal = parseInt(name.split("isTrue")[1]);
      const idJawaban = parseInt(id.split("jawabanId")[1]);
  
      setSoalData((prevData) => {
        const newData = [...prevData];
  
        if (!newData[idSoal]) {
          newData[idSoal] = {
            id: null, // Initialize with null or update if ID is known
            question: "",
            answerOption: [],
          };
        }
  
        if (!newData[idSoal].answerOption[idJawaban]) {
          newData[idSoal].answerOption[idJawaban] = {
            answerOption: "",
            answerIsTrue: false,
            id:newData[idSoal].answerOption[idJawaban]?.id ? newData[idSoal].answerOption[idJawaban].id : null,
          };
        }
  
        newData[idSoal].answerOption.forEach((option, index) => {
          option.answerIsTrue = index === idJawaban;
        });
  
        return newData;
      });
    }
  };
  
  useEffect(() => {
    if (quizData) {
      setJudul(quizData.title || "");
      setDeskripsi(quizData.desc || "");
      setDuration(quizData.waktu || 0);
      setStartQuiz(quizData.start_quiz || "");
      setEndQuiz(quizData.end_quiz || "");
      setOption({
        mapel: quizData.id_mapel || 0,
        kelas: quizData.id_kelas || 0,
      });
      setToken(quizData.token || "");
      setKkm(quizData.kkm || 80)

      // Mengatur jumlah soal dan opsi jawaban
      const jumlahSoal = quizData.questions.length;
      const jumlahOpsiJawaban = quizData.questions[0]?.options.length || 4;

      setJumlahSoal(jumlahSoal);
      setJumlahOpsiJawaban(jumlahOpsiJawaban);

      // Mengatur data soal
      const soalArr = quizData.questions.map((question) => {
        return {
          id:question.id,
          question: question.question || "",
          answerOption: question.options.map((option) => ({
            id:option.id,
            answerOption: option.option || "",
            answerIsTrue: option.option_is_true || false,
          })),
        };
      });

      setSoalData(soalArr);
    }
  }, [quizData]);

  

 
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
        id_user: idUser,
        id:quizData.id,
        title: judul,
        desc: deskripsi,
        duration,
        startDate: startQuiz,
        endDate: endQuiz,
        token,
        soalData,
        kkm,
        ...option
      };
     
      // return dataPayload
      const insert = await axios.put('/api/quiz', { data: dataPayload })
      return insert
    },
    onSuccess: (data) => {
      toast({
        title: "berhasil",
        description:data.data.message
      })
      // window.location.href = '/dashboard'
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
  if(soalData.length < 0){
    return <div>Loadin....</div>
  }

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
              defaultValue={judul}
            />
          </div>
          <div className="w-full gap-1.5">
            <Label htmlFor="Deskripsi">Deskripsi Quiz</Label>
            <Textarea id="Deskripsi" onChange={(e) => setDeskripsi(e.target.value)} defaultValue={deskripsi} />
          </div>



          <div className="w-full gap-1.5">
            <Label htmlFor="mapel">Pilih Mata Pelajaran</Label>
            {dataMapel.isSuccess && (
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
            )}
          </div>
          <div className="w-full gap-1.5">
            <Label htmlFor="Deskripsi">Kelas</Label>
            {dataKelas.isSuccess && (
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
            )}
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
                    onChange={(e) => {
                      setJumlahSoal(e.target.value)
                    }}
                    required={true}
                    type="number"
                    max="50"
                    min={soalData.length}
                    onInvalid={(e) => {
                      e.target.setCustomValidity(
                        `Jumlah soal harus antara ${soalData.length} dan 50.`
                      );
                    }}
                    disabled
                    onInput={(e) => e.target.setCustomValidity('')} 
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
                    disabled
                    min={quizData.questions[0]?.options.length}
                  />
                </div>
              
                <Button type="button" onClick={()=>{
                 
                  setJumlahSoal(soalData.length + 1)
                   const newSoalData = [...soalData];
                  
                     newSoalData.push({
                       id: null,
                       question: "",
                       answerOption: [
                         { id: null, answerOption: "", answerIsTrue: false },
                         { id: null, answerOption: "", answerIsTrue: false },
                         { id: null, answerOption: "", answerIsTrue: false },
                         { id: null, answerOption: "", answerIsTrue: false },
                       ],
                     });
                    
             
                   setSoalData(newSoalData);
                 
                }}>Tambah Soal 1</Button>
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
            value={startQuiz ? new Date(new Date(startQuiz).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""}
          />
        </div>
        <div className="w-full gap-1.5">
          <Label htmlFor="date2">Tanggal Selesai</Label>
          <Input
            type="datetime-local"
            required={true}
            id="date2"
            onChange={handleDateChange}
            value={endQuiz ? new Date(new Date(endQuiz).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""}
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
            value={duration}
            id="lamaPengerjaan"
          />
        </div>
        <div className="w-full gap-1.5">
          <Label htmlFor="kkm">KKM</Label>
          <Input
            type={"number"}
            label={"Lama Pengerjaan Quiz"}
            placeholder={"Masukkan KKM"}
            required={true}
            onChange={(e) => setKkm(e.target.value)}
            value={kkm}
            id="kkm"
          />
        </div>
        <div className="w-full gap-1.5">
          <Label htmlFor="lamaPengerjaan">Token Kuis</Label>
          <p className="text-red-600 text-xs">Jika Anda Tidak Memasukkan Token Kami Akan Membuatkan Token Anda Secara Otomatis</p>
          <Input
            type={"text"}
            label={"Lama Pengerjaan Quiz"}
            placeholder={"Masukkan Token Kuis..."}
            defaultValue={token}
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
          soalData={soalData}
          setSoalData={setSoalData}
          setJumlahSoal={setJumlahSoal}
        />
      </div>
    </form>
  );
};

export default WithQuery(UpdateQuiz);
