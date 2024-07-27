
import { Button } from '../ui/button'
import DeleteQuiz from './DeleteQuiz'
import { printQuestions } from './print'


const QuizMenu = ({ title, id }) => {
    return (
        <>
        
            <Button className="w-max h-[40px]" onClick={() => printQuestions(title, id)}>
                Cetak Soal
            </Button>
            <Button>Pertanyaan Paling Sering Salah</Button>
            <Button>Analisis Kesulitan Soal</Button>
        </>
    )
}

export default QuizMenu