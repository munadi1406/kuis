import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import ButtonLoader from '../ButtonLoader'
import { Badge } from '../ui/badge'
import { localTime } from '@/utils/localTime'
import { buttonVariants } from '../ui/button'

const TakeQuiz = ({ isPending, mutate, setToken, data, msg, status }) => {
    console.log(data)
    console.log(msg)
    return (
        <>
            {!status ? (
                <form method='post' onSubmit={mutate}>
                    <div className="grid gap-4 py-4">
                        {msg && (
                            <p className='text-red-500 text-xs'>{msg}</p>
                        )}
                        <div className="">
                            <Label htmlFor="name" className="text-right">
                                Masukkan Token Kuis
                            </Label>
                            <Input id="token" required name="token" className="col-span-3" onChange={(e) => setToken(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <ButtonLoader text={"Kerjakan"} onClick={() => console.log("oke")} loading={isPending} />
                    </div>
                </form>
            ) : (
                <div className='flex flex-col gap-2'>
                    <h3 className='font-bold'>{data.title}</h3>
                    <p className='text-xs'>{data.desc}</p>
                    <div>
                        <Badge>Mata Pelajaran : {data.mapel.mapel}</Badge>
                        <Badge>Kelas : {data.kelas.kelas}</Badge>
                    </div>
                    <p>{`${localTime(data.start_quiz)} - ${localTime(data.end_quiz)}`}</p>
                    <p>Jumlah Soal : {data.questions}</p>
                    <p>Waktu Pengerjaan : {data.waktu} Menit</p>
                    <a href={`/take/${data.id}`} className={buttonVariants()}>Kerjakan Sekarang</a>
                </div>
            )}
        </>
    )
}

export default TakeQuiz