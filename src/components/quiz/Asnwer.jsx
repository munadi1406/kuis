import WithQuery from '@/utils/WithQuery'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import edjsHTML from "editorjs-html";

const HtmlRender = ({ data }) => {
  const edjsParser = edjsHTML();
  const HTML = edjsParser.parse(data);
  return (
    <div dangerouslySetInnerHTML={{ __html: HTML }} />
  )
}
const Asnwer = ({ id, time, id_user }) => {
  const [quizData, setQuizData] = useState({})

  const [timeLeft, setTimeLeft] = useState(time * 60); // Waktu dalam detik

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
        alert('Waktu telah habis!');
        // Tambahkan logika di sini untuk menangani ketika waktu habis
        return;
      }
    } else {
      const startTime = new Date();
      localStorage.setItem(`quiz_start_time_${id}`, startTime);
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [id, time]);

  useEffect(() => {
    if (timeLeft <= 0) {
      alert('Waktu telah habis!');
      // Tambahkan logika di sini untuk menangani ketika waktu habis
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['id'], queryFn: async () => {
      const datas = await axios.get(`/api/quiz/take?id=${id}`)
      return datas.data
    }, refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchOnMount: false, // Disable refetch on component mount
    refetchOnReconnect: false, // Disable refetch on network reconnect
  })
  const [currentOption,setCurrentOption] = useState();
  const checkAnswer = async  (idUser,questionId)=>{
    const isAnswer = await axios.get(`/api/answer?id_u=${idUser}&id_q=${questionId}`)
      console.log(isAnswer.data.data)
      if(isAnswer.data.data.id_option){
        setCurrentOption(isAnswer.data.data.id_option);
      }
  }
  useEffect(() => {
    if (isSuccess) {
      setQuizData(data.data[0])
    }
  }, [isSuccess])

  useEffect(() => {
    if(quizData.id){
      checkAnswer(id_user,quizData.id)
    }
  }, [quizData])
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerChange = async (questionId, optionId) => {
    setCurrentOption(optionId)
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,   
    }));
    console.log({ id, questionId, optionId, id_user })
    const data = await axios.post('/api/answer', { idQuiz: id, idQuestion: questionId, idOption: optionId, idUser: id_user })
    console.log(data.data)
  };
  if (isLoading) {
    return <div>Memuat Soal...</div>
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
      {/* {console.log(data)} */}
      <div className='border grid grid-cols-12 gap-2'>
        {data.data.map((e, i) => (
          <div key={i} className='bg-blue-600 rounded-md text-white px-2 text-center font-semibold' onClick={() => setQuizData(e)}>{i + 1}</div>
        ))}
      </div>
      <div className="timer">Waktu Tersisa: {formatTime(timeLeft)}</div>
      <div className='md:block hidden'>
        <Drawer>
          <DrawerTrigger>Soal</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div>
        {quizData.question && (
          <>
            <div><HtmlRender data={quizData.question} /></div>
            {quizData.options.map((e, i) => (
              <div
                key={i}
                className="flex gap-2 items-start justify-start "
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
        <>
          {/* 
                <div className="flex justify-center gap-10 w-full items-center mt-4">
                  <ButtonPure
                    onClick={goToPrev}
                    disabled={currentIndex === 0}
                    style={`${currentIndex === 0 && "hidden"} `}
                    text={"Prev"}
                  />
                  <label>
                    <input
                      type="checkbox"
                      onChange={isAnswerLeter}
                      checked={currentIndexNavIsInLocalStorage(questionId)}
                    />
                    Tandai (Jawab Nanti)
                  </label>
                  <ButtonPure
                    text={"Next"}
                    onClick={goToNext}
                    disabled={currentIndex === soalArray.length - 1}
                    color={"green-600"}
                    style={`${
                      currentIndex === soalArray.length - 1 && "hidden"
                    } `}
                  />
                  <ButtonPure
                    text={"Selesai"}
                    onClick={handleFinish}
                    color={"green-600"}
                    style={`${
                      currentIndex === soalArray.length - 1 ? "" : "hidden"
                    } `}
                  />
                </div> */}
        </>

      </div>
    </div>
  )
}

export default WithQuery(Asnwer)