import WithQuery from "@/utils/WithQuery";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button, buttonVariants } from "../ui/button";
import { useEffect, useState } from "react";
import edjsHTML from "editorjs-html";
import AlertDialog from "./AlertDialog";


const HtmlRender = ({ data }) => {
  const edjsParser = edjsHTML();
  const HTML = edjsParser.parse(data);
  return <div dangerouslySetInnerHTML={{ __html: HTML }} />;
};
const Asnwer = ({ id, time, id_user }) => {
  const [quizData, setQuizData] = useState({});
  const [answers, setAnswers] = useState({});

  const [timeLeft, setTimeLeft] = useState(time * 60); // Waktu dalam detik
  const [isEnd, setIsEnd] = useState(false);
  useEffect(() => {
    const quizStartTime = localStorage.getItem(`quiz_start_time_${id}`);

    if (quizStartTime) {
      const startTime = new Date(quizStartTime);
      const currentTime = new Date();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);
      const remainingTime = time * 60 - elapsedTime;

      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
      } else {
        setTimeLeft(0);
        setIsEnd(true);
        return;
      }
    } 

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [id, time,localStorage.getItem(`quiz_start_time_${id}`)]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsEnd(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

 
  const { data, isLoading, isSuccess,isLoadingError,fetchStatus,error } = useQuery({
    queryKey: [`quiz${id}`],
    queryFn: async () => {
      const datas = await axios.get(`/api/quiz/take?id=${id}`);
      return datas.data;
    },
   
    refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchOnMount: false, // Disable refetch on component mount
    refetchOnReconnect: false, // Disable refetch on network reconnect
  });
  const [currentOption, setCurrentOption] = useState();
  const checkAnswer = async (idUser, questionId) => {
    const isAnswer = await axios.get(
      `/api/answer?id_u=${idUser}&id_q=${questionId}`
    );

    if (isAnswer.data.data.id_option) {
      setCurrentOption(isAnswer.data.data.id_option);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setQuizData(data.data[0]);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (quizData.id) {
      checkAnswer(id_user, quizData.id);
    }
  }, [quizData]);
  const handleAnswerChange = async (questionId, optionId) => {
    setCurrentOption(optionId);

    const data = await axios.post("/api/answer", {
      idQuiz: id,
      idQuestion: questionId,
      idOption: optionId,
      idUser: id_user,
    });
    const newAnswers = {
      ...answers,
      [questionId]: optionId,
    };
    setAnswers(newAnswers);
    setCurrentOption(optionId);
    localStorage.setItem(`answers${id}`, JSON.stringify(newAnswers));

  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [markedQuestions, setMarkedQuestions] = useState({});
  useEffect(() => {
    const storedAnswers = localStorage.getItem(`answers${id}`);
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
    const storedMarkedQuestions = localStorage.getItem(`markedQuestions${id}`);
    if (storedMarkedQuestions) {
      setMarkedQuestions(JSON.parse(storedMarkedQuestions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `markedQuestions${id}`,
      JSON.stringify(markedQuestions)
    );
  }, [markedQuestions]);
  const handleMarkQuestion = (questionId) => {
    setMarkedQuestions((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };
  const goToNext = () => {
    if (currentIndex < data.data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setQuizData(data.data[currentIndex + 1]);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setQuizData(data.data[currentIndex - 1]);
    }
  };

  const postStatusAnswer = async (status)=>{
    console.log(status)
    const submitQuiz = await axios.post('/api/answer/status', {
      idQuiz: id,
      idUser: id_user,
      status,
    })
    
    const localTime = new Date(submitQuiz.data.data.created_at).toLocaleString()
 
      const startTime = new Date(localTime);
    
      localStorage.setItem(`quiz_start_time_${id}`, startTime);
    return submitQuiz.data
  }

  useEffect(() => {
    if (!isLoading && !error) {
      if (data.data.length > 0) {
        setQuizData(data.data[currentIndex]);
        const currentQuestionId = data.data[currentIndex].id;
        postStatusAnswer(false)
        if (answers[currentQuestionId]) {
          setCurrentOption(answers[currentQuestionId]);
        } else {
          setCurrentOption(null);
        }
      }
    }
  }, [isLoading, currentIndex, data, answers]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 
  if (isLoading) {
    return <div>Memuat Soal...</div>;
  }
  if(error){
    
    return <AlertDialog id={id} msg={error.response.data.message} userId={id_user}/>
  }

    
  

  let allQuestionsAnswered =
    data.data.length > 0 && Object.keys(answers).length === data.data.length;
  const noSoal = currentIndex + 1;



  const handleSubmit = () => {
    postStatusAnswer(true);
    localStorage.removeItem(`markedQuestions${id}`)
    localStorage.removeItem(`quiz_start_time_${id}`)
    localStorage.removeItem(`answers${id}`)
    window.location.href = `/result/${id}/${id_user}`; 

  }
  const hurufAbjad = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  return (
    <div className="col-span-9 w-full rounded-md p-2 h-max">
      {isEnd && (
       <AlertDialog id={id} msg={"Waktu Pengerjaan Sudah Habis !!!"} userId={id_user}/>
      )}
      <div className="sticky top-0 bg-white pt-2 border-b-2 border-blue-400">
        <div className="bg-blue-600/80 text-center w-full text-white rounded-full">
          Waktu Tersisa: {formatTime(timeLeft)}
        </div>
        <div className="grid-cols-12 gap-2 p-2 hidden md:grid ">
          {data.data.map((e, i) => (
            <div
              key={i}
              className={`${!!markedQuestions[e.id] && "bg-yellow-500 text-white"
                } ${!!answers[e.id] && "!bg-green-600 text-white"} ${quizData.id === e.id
                  ? "bg-blue-600 text-white border-2 border-blue-900"
                  : "border border-blue-600 text-blue-600"
                }  cursor-pointer px-3 py-2 text-xs rounded-md  px-2 text-center font-semibold`}
              onClick={() => {
                setQuizData(e);
                setCurrentIndex(i);
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 z-20 bg-white w-full p-4">
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <div className="flex justify-center items-center">
              <Button onClick={() => setIsDrawerOpen(true)}>Daftar Soal</Button>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Daftar Soal</DrawerTitle>
              <div className="flex gap-2 flex-wrap py-3">
                {data.data.map((e, i) => (
                  <div
                    key={i}
                    className={`${!!markedQuestions[e.id] && "bg-yellow-500 text-white"
                      } ${!!answers[e.id] && "!bg-green-600 text-white"} ${quizData.id === e.id
                        ? "bg-blue-600 text-white"
                        : "border border-blue-600 text-blue-600"
                      }  cursor-pointer px-3 py-2 text-xs rounded-md text-center font-semibold`}
                    onClick={() => {
                      setQuizData(e);
                      setCurrentIndex(i);
                      setIsDrawerOpen(false);
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Tutup</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="border p-2 rounded-md md:mb-0 mb-20 mt-3">
        <p>Soal No {noSoal}</p>
        {quizData.question && (
          <>
            <div className="p-3 mb-2 bg-slate-300/30 rounded-md ">
              <HtmlRender data={quizData.question} />
            </div>
            {quizData.options.map((e, i) => (
              <div
                key={i}
                className="flex hover:bg-blue-500/30 active:scale-x-95 gap-2 items-start justify-start p-2 border-l-2 mb-2 bg-slate-300/30 rounded-md backdrop-blur-md border-blue-600"
                onClick={() => handleAnswerChange(quizData.id, e.id)}
              >
                <div>
                  <input
                    key={e.id}
                    type="radio"
                    id={e.id}
                    value={e.id}
                    name={`question_${quizData.id}`}
                    checked={e.id === currentOption}
                    onChange={() => handleAnswerChange(quizData.id, e.id)}
                  />
                </div>
                <label className="capitalize" htmlFor={e.id}>
                  {`${hurufAbjad[i]}. ${e.option}`}
                </label>
              </div>
            ))}
          </>
        )}
        <div className="flex justify-center gap-10 w-full items-center mt-4">
          <Button onClick={goToPrev} disabled={currentIndex === 0}>
            Prev
          </Button>
          <div className="flex justify-center mt-4">
            <label>
              <input
                type="checkbox"
                checked={!!markedQuestions[quizData.id]}
                onChange={() => handleMarkQuestion(quizData.id)}
              />
              Tandai (Ragu-ragu)
            </label>
          </div>
          <Button
            onClick={goToNext}
            disabled={currentIndex === data.data.length - 1}
          >
            Next
          </Button>

        </div>
        {allQuestionsAnswered && (
          <div className="flex justify-center mt-4">
            <Button
              color="green-600"
              onClick={handleSubmit}
            >
              Selesai
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithQuery(Asnwer);
