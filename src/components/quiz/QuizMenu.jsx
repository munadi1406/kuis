
import { Button, buttonVariants } from '../ui/button'
import DeleteQuiz from './DeleteQuiz'
import { printQuestions } from './print'


const QuizMenu = ({ title, id }) => {
    return (
        <>
        
            <Button className="w-max h-[40px]" onClick={() => printQuestions(title, id)}>
                Cetak Soal
            </Button>
            <a className={buttonVariants()} href={`/analize/kuis/${id}`}>Pertanyaan Paling Sering Salah</a>
            <a className={buttonVariants()} href={`/analize/difficulty/${id}`}>Analisi Kesulitan Soal</a>
           
        </>
    )
}

export default QuizMenu