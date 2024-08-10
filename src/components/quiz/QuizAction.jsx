
import { useState } from 'react';
import { Button } from '../ui/button'
import ShareQuiz from './ShareQuiz'
import DeleteQuiz from './DeleteQuiz';
import WithQuery from '@/utils/WithQuery';

const QuizAction = ({ data }) => {
    const [isDelete, setIsDelete] = useState(false);

    return (
        <>
            <DeleteQuiz isOpen={isDelete} data={{ id: data.id, title: data.title }} setIsOpen={setIsDelete} />
            <ShareQuiz id={data.id} idKelas={data.idKelas} token={data.token} title={data.title}/>
            <Button>Edit Kuis</Button>
            <Button variant="destructive" onClick={() => setIsDelete(!isDelete)}>Hapus Kuis</Button>
        </>
    )
}

export default WithQuery(QuizAction)