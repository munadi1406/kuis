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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button"
import { reportQuiz } from "./print"
import { Label } from "../ui/label"

const ReportData = ({ idUser }) => {
    const [reportChecked, setReportChecked] = useState([])
    const [scoreData, setScoreData] = useState([])
    const [quizzesMap, setQuizzesMap] = useState({});
    const [usersArray, setUsersArray] = useState([]);
    const [option, setOption] = useState({
        mapel: '',
        kelas: '',
    });
    const { data, isLoading } = useQuery({
        queryKey: [`laporan-${option.mapel}-${option.kelas}`], queryFn: async () => {
            const { data } = await axios.get(`/api/report?id=${idUser}&idKelas=${option.kelas && option.kelas}&idMapel=${option.mapel && option.mapel}`)
            return data
        },
        enabled: !!option.kelas
    })
    const handleCheckboxChange = (id) => {
        setReportChecked(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const { mutate, isPending, reset } = useMutation({
        mutationFn: async () => {

            const data = await axios.post('/api/report', {
                idQuiz: reportChecked,


            })
            return data.data
        },
        onSuccess: (data) => {

            setScoreData(data.data);
        }
    })

    useEffect(() => {
        if (reportChecked.length > 0) {
            reset()

            mutate()
        } else {
            setScoreData([])
        }
    }, [reportChecked])
    useEffect(() => {
        // Update usersMap
        const newUsersMap = scoreData.reduce((acc, quiz) => {
            quiz.users.forEach(user => {
                if (!acc[user.nisn]) {
                    acc[user.nisn] = {
                        nisn: user.nisn,
                        namaLengkap: user.namaLengkap
                    };
                }
            });
            return acc;
        }, {});


        // Update quizzesMap
        const newQuizzesMap = scoreData.reduce((acc, quiz) => {
            if (!acc[quiz.quizId]) {
                acc[quiz.quizId] = {
                    totalQuestions: quiz.totalQuestions,
                    quizId: quiz.quizId,
                    kkm: quiz.kkm,
                    title: quiz.title,
                    users: quiz.users
                };
            }
            return acc;
        }, {});
        const newQuizMap = Object.values(newQuizzesMap);
        setQuizzesMap(newQuizMap);

        // Update usersArray
        const newUsersArray = Object.values(newUsersMap);
        setUsersArray(newUsersArray);

    }, [scoreData, reportChecked]);
    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setOption((prevState) => ({
            ...prevState,
            [name]: Number(value),
        }));
        setReportChecked([])
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
    const getKelasName = (idKelas) => {
        if (dataKelas.isSuccess) {
            return `${dataKelas.data.data.find(datas => datas.id === idKelas)?.kelas}`
        }
    }
    if (isLoading) {
        return <div>Loading...</div>
    }



    const sortedUsers = [...usersArray].sort((a, b) => a.namaLengkap.localeCompare(b.namaLengkap));
    return (
        <div>

            <h3 className="text-2xl font-semibold">Daftar Kuis Anda</h3>
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
            <div className="w-full gap-1.5">
                <Label htmlFor="mapel">Pilih Mata Pelajaran</Label>
                <Select id="mapel" name="mapel" disabled={dataMapel.isLoading || !option.kelas} value={option.mapel === 0 ? "" : option.mapel} onValueChange={(e) => handleSelectChange({ target: { name: "mapel", value: e } })}>
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

            <div className="my-5 grid md:grid-cols-6 grid-cols-3">
                {data?.data && data.data.map(({ id, title, kelas: { kelas }, mapel: { mapel }, tahun_ajaran: { nama } }) => (
                    <div className="items-top flex space-x-2" key={id}>
                        <Checkbox
                            id={id}
                            checked={reportChecked.includes(id)}
                            onCheckedChange={() => handleCheckboxChange(id)}
                        />
                        <div className="flex flex-col gap-2 leading-none">
                            <label
                                htmlFor={id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {title}
                            </label>
                            <p className="text-sm text-muted-foreground">
                                Kelas : {kelas}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Mapel : {mapel}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Tahun Ajaran : {nama}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={() => reportQuiz(quizzesMap, sortedUsers, getKelasName(option.kelas), data)} disabled={reportChecked.length <= 0}>Cetak</Button>
            {scoreData.length > 0 && (
                <Table>
                    <TableCaption>Rekap Nilai</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Nama</TableHead>
                            {quizzesMap.map(({ quizId, title }) => (
                                <TableHead key={quizId}>{title}</TableHead>
                            ))}
                            <TableHead>Total</TableHead>
                            <TableHead>Rata Rata</TableHead>
                            <TableHead>Peringkat</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Hitung total nilai dan peringkat */}
                        {sortedUsers.map((user, index) => {
                            let totalScore = 0;
                            let totalQuizzes = 0;

                            quizzesMap.forEach(({ quizId, totalQuestions, kkm, users }) => {
                                const score = users.find(e => e.nisn === user.nisn);

                                if (score) {
                                    totalScore += totalQuestions > 0
                                        ? (score.hasRemedial && ((score.score / totalQuestions) * 100) >= kkm
                                            ? Number(kkm)
                                            : (score.score / totalQuestions) * 100)
                                        : 0;
                                    // console.log({ totalScore })
                                    // console.log(((score.score / totalQuestions) * 100) > kkm)
                                    // console.log({ kkm })
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
                                .map(u => ({ nisn: u.nisn, totalScore: u.totalScore }))
                                .sort((a, b) => b.totalScore - a.totalScore)
                                .findIndex(u => u.nisn === user.nisn) + 1; // Menentukan peringkat

                            return (
                                <TableRow key={user.nisn}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.namaLengkap}</TableCell>
                                    {quizzesMap.map(({ quizId, totalQuestions,kkm, users }) => {
                                        const score = users.find(e => e.nisn === user.nisn);
                                        const percentage = score
                                            ? score.hasRemedial && ((score.score / totalQuestions) * 100) > kkm
                                                ? Number(kkm).toFixed(1)
                                                : ((score.score / totalQuestions) * 100).toFixed(1)
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