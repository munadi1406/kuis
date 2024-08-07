import { getStatus } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { localTime } from "@/utils/localTime";
import { timeElapsed } from "@/utils/timeLife";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useInView } from 'react-intersection-observer';


const CardProgress = ({ data }) => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Ensure the API is called only once
        threshold: 0.5, // Trigger when 10% of the card is visible
    });
    const status = getStatus(data.start_quiz, data.end_quiz);
    const { data: analisis, isLoading, error } = useQuery({
        queryKey: [`data-${data.id}`],
        queryFn: async () => {
            const datas = await axios.get(`/api/progress?id=${data.id}`);
            return datas.data;
        },
        enabled: inView, // API is called only when the card is in view
    });

    // Log the error if any
    useEffect(() => {
        if (error) {
            console.error('Error fetching data:', error);
        }
    }, [error]);

    return (
        <Card ref={ref}>
            <CardHeader>
                <CardTitle>{data.title}</CardTitle>
                <div className="flex flex-wrap gap-2 ">
                    <Badge variant={`${status === "Buka" ? 'primary' : 'destructive'}`}>{status}</Badge>
                    <Badge className={"bg-blue-600"}>{data.mapel.mapel}</Badge>
                    <Badge className={"bg-green-600"}>Kelas : {data.kelas.kelas}</Badge>
                </div>
                <CardDescription>{timeElapsed(data.created_at)} lalu</CardDescription>
                <CardDescription>{`${localTime(data.start_quiz)} - ${localTime(data.end_quiz)}`}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2 flex-col">
                <div className="flex gap-2">
                    <p>Tingkat Kesulitan Kuis:</p>
                    {isLoading ? <Skeleton className={"w-[50px] h-[20px] rounded-md"} /> : <Badge className={"bg-blue-600"}>{analisis?.overallDifficulty}</Badge>}
                </div>

                <div className="flex gap-2">
                    <p>Rata Rata Sukses</p>
                    {isLoading ? <Skeleton className={"w-[50px] h-[20px] rounded-md"} /> : <Badge className={"bg-blue-600"}>{analisis?.overallSuccessRate}</Badge>}
                </div>
                <div>Total Jawaban: <Badge className={"bg-blue-600"}>{data.answer_status[0].count}</Badge></div>
                <div>Total Siswa Kelas {data.kelas.kelas}: <Badge className={"bg-blue-600"}>{data.kelas.siswa[0].count}</Badge></div>
            </CardContent>
            <CardFooter>
                <Button>Lihat Ringkasan Kuis</Button>
            </CardFooter>
        </Card>
    );
};

export default CardProgress