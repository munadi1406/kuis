
import { useState } from 'react';
import { Button, buttonVariants } from '../ui/button'
import ShareQuiz from './ShareQuiz'
import DeleteQuiz from './DeleteQuiz';
import WithQuery from '@/utils/WithQuery';

const QuizAction = ({ data }) => {
    const [isDelete, setIsDelete] = useState(false);

    return (
        <>
            <DeleteQuiz isOpen={isDelete} data={{ id: data.id, title: data.title }} setIsOpen={setIsDelete} />
            <ShareQuiz quizData={data}/>
            <a className={buttonVariants()} href={`/edit/${data.id}`}>Edit Kuis</a>
            <Button variant="destructive" onClick={() => setIsDelete(!isDelete)}>Hapus Kuis</Button>
        </>
    )
}

export default WithQuery(QuizAction)