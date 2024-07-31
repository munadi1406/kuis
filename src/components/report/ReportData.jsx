import WithQuery from "@/utils/WithQuery"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button"
import { reportQuiz } from "./print"

const ReportData = ({ idUser }) => {
    const [reportChecked, setReportChecked] = useState([])
    const [scoreData, setScoreData] = useState([])
    const { data, isLoading } = useQuery({
        queryKey: ['laporan'], queryFn: async () => {
            const { data } = await axios.get(`/api/report?id=${idUser}`)
            return data.data
        }
    })
    const handleCheckboxChange = (id) => {
        setReportChecked(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const data = await axios.post('/api/report', {
                idQuiz: reportChecked
            })
            return data.data
        },
        onSuccess: (data) => {
            console.log(data)
            setScoreData(data.data);
        }
    })

    useEffect(() => {
        if (reportChecked.length > 0) {
            mutate()
        }
    }, [reportChecked])
    const usersMap = scoreData.reduce((acc, quiz) => {
        quiz.users.forEach(user => {
            if (!acc[user.userId]) {
                acc[user.userId] = {
                    userId: user.userId,
                    namaLengkap: user.namaLengkap
                };
            }
        });
        return acc;
    }, {});

    // useEffect(() => {
    //     console.log({ isPending })
    // }, [isPending])
    if (isLoading) {
        return <div>Loading...</div>
    }
    const quizzesMap = scoreData.reduce((acc, quiz) => {
        if (!acc[quiz.quizId]) {
            acc[quiz.quizId] = {
                totalQuestion: quiz.totalQuestions,
                quizId: quiz.quizId,
                title: quiz.title,
                users: quiz.users
            };
        }
        return acc;
    }, {});

    // Convert to array if needed
    const quizzesArray = Object.values(quizzesMap);
    // console.log({ quizzesArray })
    const usersArray = Object.values(usersMap);
    // console.log({ usersArray })
    const sortedUsers = [...usersArray].sort((a, b) => a.namaLengkap.localeCompare(b.namaLengkap));
    return (
        <div>
            {console.log({ data })}
            <h3 className="text-2xl font-semibold">Daftar Kuis Anda</h3>
            <div className="my-5 grid md:grid-cols-6 grid-cols-3">
                {data.map(({ id, title,kelas:{kelas},mapel:{mapel} }) => (
                    <div className="items-top flex space-x-2" key={id}>
                        <Checkbox
                            id={id}
                            checked={reportChecked.includes(id)}
                            onCheckedChange={() => handleCheckboxChange(id)}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor={id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {title}
                            </label>
                            <p className="text-sm text-muted-foreground">
                                Kelas : {kelas} Mapel : {mapel}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={() => reportQuiz(quizzesArray, sortedUsers)} disabled={reportChecked.length <= 0}>Cetak</Button>
            {scoreData.length > 0 && (
                <Table>
                    <TableCaption>Rekap Nilai</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Nama</TableHead>
                            {quizzesArray.map(({ quizId, title }) => (
                                <TableHead key={quizId}>{title}</TableHead>
                            ))}
                            <TableHead>Total</TableHead>
                            <TableHead>Rata Rata</TableHead>
                            <TableHead>Keterangan</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Hitung total nilai dan peringkat */}
                        {sortedUsers.map((user, index) => {
                            let totalScore = 0;
                            let totalQuizzes = 0;

                            quizzesArray.forEach(({ quizId, totalQuestion, users }) => {
                                const score = users.find(e => e.userId === user.userId);
                                if (score) {
                                    totalScore += (score.score / totalQuestion) * 100;
                                }
                                totalQuizzes += 1;
                            });

                            const averageScore = totalQuizzes > 0
                                ? (totalScore / totalQuizzes).toFixed(1)
                                : '0.0';

                            return {
                                ...user,
                                totalScore,
                                averageScore
                            };
                        }).map((user, index, allUsers) => {
                            // Menghitung peringkat berdasarkan totalScore
                            const rank = allUsers
                                .map(u => ({ userId: u.userId, totalScore: u.totalScore }))
                                .sort((a, b) => b.totalScore - a.totalScore)
                                .findIndex(u => u.userId === user.userId) + 1; // Menentukan peringkat

                            return (
                                <TableRow key={user.userId}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.namaLengkap}</TableCell>
                                    {quizzesArray.map(({ quizId, totalQuestion, users }) => {
                                        const score = users.find(e => e.userId === user.userId);
                                        const percentage = score
                                            ? ((score.score / totalQuestion) * 100).toFixed(1)
                                            : '0.0';
                                        return (
                                            <TableCell key={quizId}>{percentage}</TableCell>
                                        );
                                    })}
                                    <TableCell>{user.totalScore.toFixed(1)}</TableCell>
                                    <TableCell>{user.averageScore}</TableCell>
                                    <TableCell>{rank}</TableCell> {/* Menampilkan peringkat */}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            )}




        </div>
    )
}

export default WithQuery(ReportData)